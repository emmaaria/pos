import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useEffect, useState} from "react";

export default function CreateProduct({user}) {
    const [categories, setCategories] = useState();
    const [units, setUnits] = useState();
    useEffect(()=> {
        async function getData(){
            try {
                const res = await axios.post(
                    '/api/category', {all:true}
                );
                if (res.status === 200) {
                    setCategories(res.data.categories);
                }
            } catch (err) {
                console.log(err);
            }
            try {
                const res = await axios.post(
                    '/api/unit', {all:true}
                );
                if (res.status === 200) {
                    setUnits(res.data.units);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getData();
    },[setCategories,setUnits]);
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        const name = $('.name').val();
        const category = $('.category').val();
        const defaultUnit = $('.unit').val();
        const secondaryUnit = $('.secondaryUnit').val();
        const defaultUnitPrice = $('.defaultUnitPrice').val();
        const secondaryUnitPrice = $('.secondaryUnitPrice').val();
        const purchasePrice = $('.purchasePrice').val();
        const defaultUnitValue = $('.defaultUnitValue').val();
        const secondaryUnitValue = $('.secondaryUnitValue').val();
        try {
            const res = await axios.post('/api/product/create', {
                name,
                category,
                defaultUnit,
                secondaryUnit,
                defaultUnitPrice,
                purchasePrice,
                secondaryUnitPrice,
                defaultUnitValue,
                secondaryUnitValue
            });
            if (res.status === 201) {
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
        }
    }
    return (
        <>
            <Head>
                <title>
                    Add New Product
                </title>
            </Head>
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
                                    <select className="form-control category">
                                        <option value="">Choose Category</option>
                                        {
                                            categories && (
                                                categories.map(el=> (
                                                    <option value={el._id} key={el._id}>{el.name}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="unit" className={`form-label`}>Default Unit</label>
                                    <select className="form-control unit" required>
                                        <option value="">Choose Unit</option>
                                        {
                                            units && (
                                                units.map(el=> (
                                                    <option value={el._id} key={el._id}>{el.name}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="secondaryUnit" className={`form-label`}>Secondary Unit</label>
                                    <select className="form-control secondaryUnit">
                                        <option value="">Choose Unit</option>
                                        {
                                            units && (
                                                units.map(el=> (
                                                    <option value={el._id} key={el._id}>{el.name}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="defaultUnitValue" className={`form-label`}>Default Unit Value</label>
                                    <input type="text" className={`form-control defaultUnitValue`} id={`defaultUnitValue`} required defaultValue={1}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="secondaryUnitValue" className={`form-label`}>Secondary Unit Value</label>
                                    <input type="text" className={`form-control secondaryUnitValue`} id={`secondaryUnitValue`}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="defaultUnitPrice" className={`form-label`}>Default Unit Price</label>
                                    <input type="text" className={`form-control defaultUnitPrice`} id={`defaultUnitPrice`} required/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="secondaryUnitPrice" className={`form-label`}>Secondary Unit Price</label>
                                    <input type="text" className={`form-control secondaryUnitPrice`} id={`secondaryUnitPrice`}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="purchasePrice" className={`form-label`}>Purchase Price</label>
                                    <input type="text" className={`form-control purchasePrice`} id={`purchasePrice`} required/>
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