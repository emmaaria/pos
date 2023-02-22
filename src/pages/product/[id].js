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
import Multiselect from "multiselect-react-dropdown";

export default function EditProduct({user, id}) {
    const [product, setProduct] = useState();
    const [categories, setCategories] = useState();
    const [units, setUnits] = useState();
    const [loading, setLoading] = useState(true);
    const [loader, setLoader] = useState(false);
    const [unit, setUnit] = useState(null);
    const [category, setCategory] = useState(null);
    const [suppliers, setSuppliers] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [previousSuppliers, setPreviousSuppliers] = useState(null);
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
                    `${process.env.API_URL}/supplier?allData=true`, headers
                );
                if (res.data.status === true) {
                    setSuppliers(res.data.suppliers);
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
        }

        getData();
    }, [setCategories, setUnits, setSuppliers]);
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/product/${id}`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setProduct(res.data.product);
                setUnit(res.data.product.unit);
                setCategory(res.data.product.category);
                setPreviousSuppliers(res.data.suppliers);
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
            const res = await axios.post(`${process.env.API_URL}/product/update`, {
                id: id,
                name,
                category,
                unit,
                price,
                weight,
                purchase_price: purchasePrice,
                suppliers : selectedSupplier,
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
                console.log(res.data)
                toast.dismiss();
                toast.error(res.data.errors, {
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
    const handleUnitChange = (event) => {
        setUnit(event.target.value)
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
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
                    Edit Product
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Edit Product`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="name" className={`form-label`}>Product Name</label>
                                    {
                                        product && loading === false && (
                                            <input type="text" className={`form-control name`} id={`name`} required
                                                   defaultValue={product.name}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <label className={`form-label`}>Category</label>
                                    {
                                        product && loading === false && (
                                            <select className="form-control category" value={category} onChange={handleCategoryChange}>
                                                <option value="">Choose Category</option>
                                                {
                                                    categories && (
                                                        categories.map(el => (
                                                            <option value={el.id} key={`cat-${el.id}`}>{el.name}</option>
                                                        ))
                                                    )
                                                }
                                            </select>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-md-6">
                                    <label className={`form-label`}>Unit</label>
                                    {
                                        product && loading === false && (
                                            <select className="form-control unit" value={unit} onChange={handleUnitChange}>
                                                <option value="">Choose Unit</option>
                                                {
                                                    units && (
                                                        units.map(el => (
                                                            <option value={el.id} key={`unit-${el.id}`}>{el.name}</option>
                                                        ))
                                                    )
                                                }
                                            </select>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="weight" className={`form-label`}>Weight</label>

                                    {
                                        product && loading === false && (
                                            <input type="text" className={`form-control weight`} id={`weight`}
                                                   defaultValue={product.weight}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="price" className={`form-label`}>Selling Price</label>

                                    {
                                        product && loading === false && (
                                            <input type="text" className={`form-control price`}
                                                   id={`price`} required defaultValue={product.price}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="purchasePrice" className={`form-label`}>Purchase Price</label>

                                    {
                                        product && loading === false && (
                                            <input type="text" className={`form-control purchasePrice`} id={`purchasePrice`}
                                                   required defaultValue={product.purchase_price}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
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
                                                selectedValues={previousSuppliers}
                                            />
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
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
                id
            },
        };
    },
    session
);