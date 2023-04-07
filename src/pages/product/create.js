import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useEffect, useState, useRef} from "react";
import Loader from "../../components/Loader";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Multiselect from 'multiselect-react-dropdown';
import useMode from "../../lib/mode";
import Select from "react-select";

export default function CreateProduct({user}) {
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState(null);
    const [sellingPrice, setSellingPrice] = useState('');
    const [purchasePrice, setPurchasePrice] = useState('');
    const [units, setUnits] = useState(null);
    const [suppliers, setSuppliers] = useState(null);
    const [customers, setCustomers] = useState(null);
    const [customerPrices, setCustomerPrices] = useState([{customerId: '', price: ''}]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const supplierRef = useRef();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const handlePurchasePrice = (e) => {
        const re = /^[0-9]*[.]?[0-9]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setPurchasePrice(e.target.value)
        }
    }
    const handleSellingPrice = (e) => {
        const re = /^[0-9]*[.]?[0-9]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setSellingPrice(e.target.value)
        }
    }
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/product-bulk-data`, headers
                );
                if (res.data.status === true) {
                    setCategories(res.data.categories);
                    setUnits(res.data.units);
                    setSuppliers(res.data.suppliers);
                    setCustomers(res.data.customers);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getData();
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
            const res = await axios.post(`${process.env.API_URL}/product/store`, {
                name,
                suppliers: selectedSupplier,
                customerPrices,
                category,
                unit,
                price,
                weight,
                purchase_price: purchasePrice
            }, headers);
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
                setSelectedSupplier([]);
                setSellingPrice('')
                setPurchasePrice('')
                supplierRef.current.resetSelectedValues()
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
    const handleCustomerChange = (index, customerId) => {
        setCustomerPrices((prevState) => {
            const newPrices = [...prevState]
            newPrices.splice(index, 1, {customerId: customerId, price: customerPrices[index].price});
            return newPrices;
        })
    }
    const handlePriceChange = (index, price) => {
        const re = /^[0-9]*[.]?[0-9]*$/;
        if (price === '' || re.test(price)) {
            setCustomerPrices((prevState) => {
                const newPrices = [...prevState]
                newPrices.splice(index, 1, {customerId: customerPrices[index].customerId, price: price});
                return newPrices;
            })
        }
    }
    const handleAddCustomer = () => {
        setCustomerPrices((oldData) => [...oldData, {customerId: '', price: ''}])
    }

    const handleRemoveCustomerPrice = (index) => {
        setCustomerPrices((oldData) => [...oldData.slice(0, index), ...oldData.slice(index + 1)])
    }
    const {mode} = useMode()
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
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
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
                                    <input type="text" className={`form-control price`} id={`price`}
                                           value={sellingPrice} onChange={handleSellingPrice} required/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="purchasePrice" className={`form-label`}>Purchase Price</label>
                                    <input value={purchasePrice} onChange={handlePurchasePrice} type="text"
                                           className={`form-control purchasePrice`} id={`purchasePrice`} required/>
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
                                                ref={supplierRef}
                                            />
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                            </div>
                            {
                                user.customerBasedPrice == 'yes' && (
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <table className={`table table-bordered`}>
                                                <thead>
                                                <tr>
                                                    <th width="50%">
                                                        Customer
                                                    </th>
                                                    <th width="30%">
                                                        Price
                                                    </th>
                                                    <th width="20%">
                                                        Action
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    customers?.length > 0 && (
                                                        customerPrices.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <Select
                                                                        options={customers}
                                                                        isClearable={true}
                                                                        isSearchable={true}
                                                                        classNamePrefix="react-select"
                                                                        onChange={(value) => handleCustomerChange(index, value?.id)}
                                                                        placeholder="Select Customer"
                                                                        getOptionLabel={(item) => item.name}
                                                                        getOptionValue={(item) => item.id}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <input type="text" className="form-control"
                                                                           value={item.price}
                                                                           onChange={(event) => handlePriceChange(index, event.target.value)}/>
                                                                </td>
                                                                <td>
                                                                    <button className="btn btn-sm btn-danger"
                                                                            onClick={() => handleRemoveCustomerPrice(index)}>
                                                                        <i className="fa fa-trash"/>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )
                                                }
                                                <tr>
                                                    <td colSpan={3} className="text-end">
                                                        <button className="btn btn-sm btn-success"
                                                                onClick={handleAddCustomer} type="button">
                                                            Add New
                                                        </button>
                                                    </td>
                                                </tr>
                                                <tr>

                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )
                            }
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