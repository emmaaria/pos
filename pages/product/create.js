import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useEffect, useState} from "react";
import Loader from "../../components/Loader";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Multiselect from 'multiselect-react-dropdown';

export default function CreateProduct({user}) {
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState(null);
    const [units, setUnits] = useState(null);
    const [suppliers, setSuppliers] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/category?allData=true`, headers
                );
                if (res.data.status === true) {
                    setCategories(res.data.categories);
                }
            } catch (err) {
                console.log(err);
            }
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/unit?allData=true`, headers
                );
                if (res.data.status === true) {
                    setUnits(res.data.units);
                }
            } catch (err) {
                console.log(err);
            }
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/supplier?allData=true`, headers
                );
                if (res.data.status === true) {
                    setSuppliers(res.data.suppliers);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [setCategories, setUnits]);
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        setLoader(true);
        const name = $('.name').val();
        const category = $('.category').val();
        const unit = $('.unit').val();
        const price = $('.price').val();
        const purchasePrice = $('.purchasePrice').val();
        const weight = $('.weight').val();
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
            const res = await axios.post(`${process.env.API_URL}/product/store`, {
                name,
                suppliers : selectedSupplier,
                category,
                unit,
                price,
                weight,
                purchase_price: purchasePrice
            }, headers);
            console.log(res.data)
            if (res.data.status === true) {
                toast.dismiss();
                toast.success('Successfully Saved', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                $('form').trigger('reset');
                setLoader(false);
                setSelectedSupplier(null);
            } else {
                toast.dismiss();
                if (typeof res.data.errors === 'object') {
                    Object.values(res.data.errors).map(err => {
                        toast.error(err[0], {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: 'dark',
                        });
                    })
                    setLoader(false);
                } else {
                    toast.error('Something went wrong', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark',
                    });
                    setLoader(false);
                }
            }
        } catch (e) {
            toast.dismiss();
            toast.error(e.response.statusText, {
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
    const handleSupplierSelect = (selectedList) => {
      setSelectedSupplier(selectedList);
    }
    const handleSupplierRemove = (selectedList) => {
        setSelectedSupplier(selectedList);
    }
    return (
        <>
            <Head>
                <title>
                    Add New Product
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Add New Product`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="name" className={`form-label`}>Product Name</label>
                                    <input type="text" className={`form-control name`} id={`name`} required/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="category" className={`form-label`}>Category</label>
                                    {
                                        categories && (
                                            <select className="form-control category">
                                                <option value="">Choose Category</option>
                                                {
                                                    categories.map(el => (
                                                        <option value={el.id} key={el.id}>{el.name}</option>
                                                    ))
                                                }
                                            </select>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="unit" className={`form-label`}>Unit</label>
                                    {
                                        units && (
                                            <select className="form-control unit">
                                                <option value="">Choose Unit</option>
                                                {
                                                    units.map(el => (
                                                        <option value={el.id} key={el.id}>{el.name}</option>
                                                    ))
                                                }
                                            </select>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="weight" className={`form-label`}>Weight</label>
                                    <input type="text" className={`form-control weight`} id={`weight`}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="price" className={`form-label`}>Selling Price</label>
                                    <input type="text" className={`form-control price`} id={`price`} required/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="purchasePrice" className={`form-label`}>Purchase Price</label>
                                    <input type="text" className={`form-control purchasePrice`} id={`purchasePrice`}
                                           required/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <label htmlFor="suppliers" className={`form-label`}>Suppliers</label>
                                    {
                                        suppliers && (
                                            <Multiselect
                                                options={suppliers}
                                                onSelect={handleSupplierSelect}
                                                onRemove={handleSupplierRemove}
                                                displayValue="name"
                                                placeholder={``}
                                                selectedValues={null}
                                            />
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                            </div>
                            <button className={`btn btn-success`} type={`submit`}>Save</button>
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