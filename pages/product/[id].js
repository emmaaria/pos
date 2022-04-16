import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import db from "../../lib/db";
import ProductModel from "../../models/Product";
import CategoryModel from "../../models/Category";
import UnitModel from "../../models/Unit";

export default function EditProduct({user, product, categories, units}) {
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
            const res = await axios.post('/api/product/update', {
                id: product._id,
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
                    Edit Product
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Edit Product`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="name" className={`form-label`}>Product Name</label>
                                    <input type="text" className={`form-control name`} id={`name`} required
                                           defaultValue={product.name}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="category" className={`form-label`}>Category</label>
                                    <select className="form-control category" defaultValue={product.category}>
                                        <option value="">Choose Category</option>
                                        {
                                            categories && (
                                                categories.map(el => (
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
                                    <select className="form-control unit" required defaultValue={product.defaultUnit}>
                                        <option value="">Choose Unit</option>
                                        {
                                            units && (
                                                units.map(el => (
                                                    <option value={el._id} key={el._id}>{el.name}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="secondaryUnit" className={`form-label`}>Secondary Unit</label>
                                    <select className="form-control secondaryUnit" defaultValue={product.secondaryUnit}>
                                        <option value="">Choose Unit</option>
                                        {
                                            units && (
                                                units.map(el => (
                                                    <option value={el._id} key={el._id}>{el.name}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="defaultUnitValue" className={`form-label`}>Default Unit
                                        Value</label>
                                    <input type="text" className={`form-control defaultUnitValue`}
                                           id={`defaultUnitValue`} required defaultValue={product.defaultUnitValue}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="secondaryUnitValue" className={`form-label`}>Secondary Unit
                                        Value</label>
                                    <input type="text" className={`form-control secondaryUnitValue`}
                                           id={`secondaryUnitValue`} defaultValue={product.secondaryUnitValue}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="defaultUnitPrice" className={`form-label`}>Default Unit
                                        Price</label>
                                    <input type="text" className={`form-control defaultUnitPrice`}
                                           id={`defaultUnitPrice`} required defaultValue={product.defaultUnitPrice}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="secondaryUnitPrice" className={`form-label`}>Secondary Unit
                                        Price</label>
                                    <input type="text" className={`form-control secondaryUnitPrice`}
                                           id={`secondaryUnitPrice`} defaultValue={product.secondaryUnitPrice}/>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="purchasePrice" className={`form-label`}>Purchase Price</label>
                                    <input type="text" className={`form-control purchasePrice`} id={`purchasePrice`}
                                           required defaultValue={product.purchasePrice}/>
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
    async function getServerSideProps({req, params}) {
        const session = req.session;
        const productId = params.id;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
        await db.connect();
        const productObject = await ProductModel.findById({_id: productId}).lean();
        const product = JSON.stringify(productObject);
        const categoryObject = await CategoryModel.find({}).lean();
        const categories = JSON.stringify(categoryObject);
        const unitObject = await UnitModel.find({}).lean();
        const units = JSON.stringify(unitObject);
        return {
            props: {
                user: session.user,
                product: JSON.parse(product),
                categories: JSON.parse(categories),
                units: JSON.parse(units),
            },
        };
    },
    session
);