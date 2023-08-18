import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useEffect, useState} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Loader from "../../components/Loader";
import useMode from "../../lib/mode";

export default function EditSetting({user}) {
    const [discount, setDiscount] = useState(null);
    const [customerBasedPrice, setCustomerBasedPrice] = useState(null);
    const [stockOverSelling, setStockOverSelling] = useState(null);
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };

    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/company`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setDiscount(res.data.company.discount_type)
                setCustomerBasedPrice(res.data.company.customer_based_price)
                setStockOverSelling(res.data.company.stock_over_selling)
                setLoading(false);
            } else {
                toast.error(res.data.errors, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        setLoader(true);
        const discount_type = discount;
        const customer_based_price = $('.customer_based_price').val();
        try {
            const res = await axios.post(`${process.env.API_URL}/software/update`, {discount_type, customer_based_price, stock_over_selling: stockOverSelling}, headers);
            if (res.data.status === true) {
                axios
                    .post('/api/auth/login', {
                        id: user.id,
                        name: user.name,
                        token: user.token,
                        discountType: discount_type,
                        role: user.role,
                        companyName: user.companyName,
                        companyAddress: user.companyAddress,
                        companyMobile: user.companyMobile,
                        companyVatNumber: user.companyVatNumber,
                        companyMushokNumber: user.companyMushokNumber,
                        customerBasedPrice: customerBasedPrice,
                        stockOverSelling: stockOverSelling,
                    })
                    .then(() => {
                        toast.dismiss();
                        toast.success('Successfully Updated', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: 'dark',
                        });
                        setLoader(false);
                    })
                    .catch((err) => {
                        toast.dismiss();
                        toast.error(err.response.data, {
                            position: "bottom-left",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: 'dark',
                        });
                        setLoader(false);
                    });
            } else {
                toast.dismiss();
                toast.error(e.response.data.errors, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                setLoader(false);
            }
        } catch (e) {
            toast.dismiss();
            toast.error(e.response.data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            setLoader(false);
        }
    }
    const handleDiscountChange = (event) => {
        setDiscount(event.target.value)
    }
    const handlePriceChange = (event) => {
        setCustomerBasedPrice(event.target.value)
    }
    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Software Settings
                </title>
            </Head>
            <ToastContainer/>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <Layout user={user} title={`Software Settings`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label className={`form-label`}>Discount Type</label>
                                {
                                    loading === false && (
                                        <select className="form-control discount_type" value={discount}
                                                onChange={handleDiscountChange}>
                                            <option value="invoice">Invoice Wise</option>
                                            <option value="product">Product Wise</option>
                                        </select>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className={`form-label`}>Stock Over Selling</label>
                                {
                                    loading === false && (
                                        <select className="form-control stock_over_selling" value={stockOverSelling}
                                                onChange={(e) => setStockOverSelling(e.target.value)}>
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className={`form-label`}>
                                    Customer Based Price
                                </label>
                                {
                                    loading === false && (
                                        <select className="form-control customer_based_price" value={customerBasedPrice}
                                                onChange={handlePriceChange}>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>
                            <button className={`btn btn-success`} type={`submit`}>Update</button>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req}) {
        const session = req.session;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
        return {
            props: {
                user: session.user
            },
        };
    },
    session
);
