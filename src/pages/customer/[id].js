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

export default function EditCustomer({user, id}) {
    const [customer, setCustomer] = useState();
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/customer/${id}`,
            headers
        ).then(res => {
            console.log(res.data);
            if (res.data.status === true) {
                setCustomer(res.data.customer);
                setLoading(false);
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
        const name = $('.name').val();
        const mobile = $('.mobile').val();
        const address = $('.address').val();
        const additionalInfo = $('.additionalInfo').val();
        if (name === '') {
            toast.dismiss();
            toast.error('Name is required', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            setLoader(false);
            return;
        }
        try {
            const res = await axios.post(`${process.env.API_URL}/customer/update`, {
                name, mobile, additionalInfo, address, id: id
            }, headers);
            if (res.data.status === true) {
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
    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Edit Customer
                </title>
            </Head>
            <ToastContainer/>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <Layout user={user} title={`Edit Customer`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="mb-3">
                            <label htmlFor="name" className={`form-label`}>Customer Name</label>
                            {
                                customer && loading === false && (
                                    <input type="text" className={`form-control name`} id={`name`} required
                                           defaultValue={customer.name}/>
                                ) || (
                                    <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                        <Skeleton width={`100%`} height={40}/>
                                    </SkeletonTheme>
                                )
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className={`form-label`}>Customer Mobile</label>

                            {
                                customer && loading === false && (
                                    <input type="text" className={`form-control mobile`} id={`mobile`}
                                           defaultValue={customer.mobile}/>
                                ) || (
                                    <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                        <Skeleton width={`100%`} height={40}/>
                                    </SkeletonTheme>
                                )
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className={`form-label`}>Customer Address</label>

                            {
                                customer && loading === false && (
                                    <input type="text" className={`form-control address`} id={`address`}
                                           defaultValue={customer.address}/>
                                ) || (
                                    <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                        <Skeleton width={`100%`} height={40}/>
                                    </SkeletonTheme>
                                )
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="additionalInfo" className={`form-label`}>Customer Additional Data</label>

                            {
                                customer && loading === false && (
                                    <textarea className={`form-control additionalInfo`} rows={8}
                                              defaultValue={customer.additionalInfo}/>
                                ) || (
                                    <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                        <Skeleton width={`100%`} height={40}/>
                                    </SkeletonTheme>
                                )
                            }
                        </div>
                        <button className={`btn btn-success`} onClick={handleForm}>Update</button>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req, params}) {
        const session = req.session;
        const id = params.id;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
        return {
            props: {
                user: session.user,
                id,
            },
        };
    },
    session
);
