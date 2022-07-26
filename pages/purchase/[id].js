import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useEffect, useState} from "react";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import PurchaseModel from "../../models/Purchase";
import db from "../../lib/db";
import mongoose from "mongoose";

export default function EditPurchase({user, purchase, oldPurchaseProducts}) {
    const [total, setTotal] = useState(parseFloat(purchase[0].amount));
    const [due, setDue] = useState(0);
    const [supplier, setSupplier] = useState(purchase[0].supplier);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [date, setDate] = useState(new Date(purchase[0].date));
    const [purchaseProducts, setPurchaseProducts] = useState(oldPurchaseProducts);

    async function getSuppliers() {
        try {
            const res = await axios.post(
                '/api/supplier', {all: true}
            );
            if (res.status === 200) {
                setSuppliers(res.data.suppliers);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSuppliers();
    }, [setSuppliers]);
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        const productIds = $('.productId').map(function (index, el) {
            return $(el).val();
        }).get();
        const productQuantities = $('.productQuantity').map(function (index, el) {
            return $(el).val();
        }).get();
        const productPrices = $('.productPrice').map(function (index, el) {
            return $(el).val();
        }).get();
        const comment = $('.note').val();
        const date = $('.date').val();
        const paid = $('.paid').val();
        if (supplier == null) {
            toast.dismiss();
            toast.error('Please select supplier', {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            return;
        }
        if (productIds.length <= 0) {
            toast.dismiss();
            toast.error('No product added', {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            return;
        }
        try {
            const res = await axios.post('/api/purchase/update', {
                id: purchase[0]._id,
                transactionID: purchase[0].purchaseId,
                supplier: supplier,
                productIds,
                productQuantities,
                productPrices,
                date,
                comment,
                paid
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
    useEffect(() => {
        async function getProducts() {
            try {
                const res = await axios.post(
                    '/api/product', {all: true}
                );
                if (res.status === 200) {
                    setProducts(res.data.products)
                }
            } catch (err) {
                console.log(err);
            }
        }

        getProducts();
    }, [setProducts]);
    const addProduct = (data) => {
        const alreadyAdded = purchaseProducts.filter(product => {
            return product.value === data.value;
        });
        if (alreadyAdded.length > 0) {
            alert('Product already added');
        } else {
            setPurchaseProducts(currentProduct => [...currentProduct, data]);
            setTotal(oldTotal => oldTotal + parseFloat(data.price));
            calculateDue();
        }
    }
    const removeProduct = (productId) => {
        const newProducts = purchaseProducts.filter(product => {
            return product.value !== productId;
        })
        setPurchaseProducts(newProducts);
        calculateSum();
    }
    const calculateSubtotal = (productId) => {
        const price = parseFloat($(`.productPrice_${productId}`).val());
        const quantity = parseFloat($(`.productQuantity_${productId}`).val());
        const subTotal = price * quantity;
        $(`.subtotal_${productId}`).text(`${subTotal}`);
        calculateSum();
        calculateDue();
    }
    const calculateSum = () => {
        setTotal(0);
        $(`.subtotal`).each(function () {
            setTotal(oldTotal => oldTotal + parseFloat($(this).text()));
        });
    }
    const calculateDue = () => {
        const paid = $(`.paid`).val();
        setDue(parseFloat(paid));
    }
    console.log(due);
    return (
        <>
            <Head>
                <title>
                    Edit Purchase
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Edit Purchase`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="supplier" className={`form-label`}>Supplier</label>
                                        <Select
                                            options={suppliers.map(el => {
                                                return {value: el._id, label: el.name}
                                            })}
                                            onChange={(val) => setSupplier(val.value)}
                                            defaultValue={{
                                                value: purchase[0].supplier,
                                                label: purchase[0].supplierData[0].name
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="date" className={`form-label`}>Date</label>
                                        <DatePicker
                                            selected={date}
                                            onChange={(date) => setDate(date)}
                                            dateFormat='yyyy-MM-dd'
                                            className={`form-control date`}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product" className={`form-label`}>Choose Product</label>
                                <Select
                                    options={products.map(el => {
                                        return {value: el._id, label: el.name, price: el.purchasePrice, quantity: 1}
                                    })}
                                    onChange={(data) => addProduct(data)}
                                />
                            </div>
                            <table className={`table table-bordered table-hover`}>
                                <thead>
                                <tr>
                                    <th width={`5%`}>
                                        SL
                                    </th>
                                    <th width={`40%`}>
                                        Product Name
                                    </th>
                                    <th width={`15%`}>
                                        Purchase Price
                                    </th>
                                    <th width={`15%`}>
                                        Quantity
                                    </th>
                                    <th className={`text-end`} width={`20%`}>
                                        Subtotal
                                    </th>
                                    <th className={`text-center`} width={`5%`}>
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    purchaseProducts.map((el, index) => (
                                        <tr key={el.value}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {el.label}
                                                <input type="hidden" className={`productId`} defaultValue={el.value}/>
                                            </td>
                                            <td>
                                                <input type="text"
                                                       className={`form-control productPrice productPrice_${el.value}`}
                                                       defaultValue={el.price}
                                                       onChange={() => calculateSubtotal(el.value)}
                                                       onKeyUp={() => calculateSubtotal(el.value)}
                                                       onKeyDown={() => calculateSubtotal(el.value)}/>
                                            </td>
                                            <td>
                                                <input type="text"
                                                       className={`form-control productQuantity productQuantity_${el.value}`}
                                                       defaultValue={el.quantity}
                                                       onChange={() => calculateSubtotal(el.value)}
                                                       onKeyUp={() => calculateSubtotal(el.value)}
                                                       onKeyDown={() => calculateSubtotal(el.value)}/>
                                            </td>
                                            <td className={`text-end`}>
                                                <span
                                                    className={`subtotal subtotal_${el.value}`}>{el.price * el.quantity}</span> Tk.
                                            </td>
                                            <td className={`text-center`}>
                                                <button
                                                    className={`btn btn-danger btn-sm`}
                                                    onClick={() => removeProduct(el.value)}>
                                                    <i className="fa-solid fa-trash-can"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td className={`text-end`} colSpan={4}><strong>Total</strong></td>
                                    <td className={`text-end`}>
                                        <span className={`total`}>{total} Tk.</span>
                                    </td>
                                    <td/>
                                </tr>
                                <tr>
                                    <td className={`text-end`} colSpan={4}><strong>Paid</strong></td>
                                    <td>
                                        <input type="text" className={`form-control paid`} onKeyUp={calculateDue}
                                               onKeyDown={calculateDue} onChange={calculateDue}
                                               defaultValue={purchase[0].paid}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`text-end`} colSpan={4}><strong>Due</strong></td>
                                    <td className={`text-end`}>
                                        <span className={`due`}>{total - purchase[0].paid}</span> Tk.
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
                            <div className="mb-3 mt-3">
                                <label htmlFor="note" className={`form-label`}>Note</label>
                                <textarea id="note" rows="3" className={`note form-control`}
                                          defaultValue={purchase[0].comment}/>
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
    async function getServerSideProps({req, params}) {
        const purchaseID = params.id;
        const session = req.session;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
        await db.connect();
        const purchaseObject = await PurchaseModel.aggregate(
            [
                {
                    $match: {_id: mongoose.Types.ObjectId(purchaseID)}
                },
                {
                    $lookup: {
                        from: 'suppliers',
                        localField: 'supplier',
                        foreignField: '_id',
                        as: 'supplierData',
                        pipeline: [
                            {
                                $project: {
                                    name: 1
                                }
                            }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: 'productledgers',
                        localField: 'purchaseId',
                        foreignField: 'transactionId',
                        as: 'products',
                        pipeline: [
                            {
                                $lookup: {
                                    from: 'products',
                                    localField: 'product',
                                    foreignField: '_id',
                                    as: 'productData',
                                    pipeline: [
                                        {
                                            $project: {
                                                name: 1
                                            }
                                        }
                                    ]
                                }
                            },
                            {
                                $project: {
                                    product: 1,
                                    quantity: 1,
                                    unitPrice: 1,
                                    total: 1,
                                    productData: 1,
                                }
                            }
                        ]
                    }
                },
                {
                    $project: {
                        purchaseId: 1,
                        supplier: 1,
                        amount: 1,
                        paid: 1,
                        comment: 1,
                        date: 1,
                        supplierData: 1,
                        products: 1,
                    }
                }
            ]
        );
        let oldPurchaseProductsObject = [];
        purchaseObject[0].products.map(el => {
            oldPurchaseProductsObject.push(
                {
                    value: el.product,
                    price: el.unitPrice,
                    quantity: el.quantity,
                    amount: el.total,
                    label: el.productData[0].name,
                }
            )
        })
        const purchase = JSON.stringify(purchaseObject);
        const oldPurchaseProducts = JSON.stringify(oldPurchaseProductsObject);
        return {
            props: {
                user: session.user,
                purchase: JSON.parse(purchase),
                oldPurchaseProducts: JSON.parse(oldPurchaseProducts),
            },
        };
    },
    session
);