import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useState} from "react";
import DatePicker from "react-datepicker";
import AutocompleteInput from "../../components/AutocompleteInput";
import Loader from "../../components/Loader";

export default function CreateSale({user}) {
    const [loader, setLoader] = useState(false);
    const [subTotal, setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [paid, setPaid] = useState(0);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [products, setProducts] = useState();
    const [timer, setTimer] = useState(null);
    const [date, setDate] = useState(new Date());
    const [purchaseProducts, setPurchaseProducts] = useState([]);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        setLoader(true);
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
        const cash = $('.cash').val();
        const bcash = $('.bcash').val();
        const nagad = $('.nagad').val();
        const card = $('.card').val();
        const customer = $('.customer-id').val();
        if (productIds.length <= 0) {
            setLoader(false);
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
            const res = await axios.post(`${process.env.API_URL}/invoice/store`, {
                customer_id : customer,
                productIds,
                productQuantities,
                productPrices,
                date,
                comment,
                cash,
                bcash,
                nagad,
                card,
                discountAmount
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
                setPaid(0);
                setGrandTotal(0);
                setSubTotal(0);
                setDiscountAmount(0);
                setPurchaseProducts([]);
                setTotal(0);
                setLoader(false);
            } else {
                toast.dismiss();
                toast.success(res.data.error, {
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

    const removeProduct = (productId) => {
        const newProducts = purchaseProducts.filter(product => {
            return product.id !== productId;
        });
        setPurchaseProducts(newProducts);
        setTotal(0);
        setGrandTotal(0);
        setSubTotal(0);
        newProducts.map(el => {
            setTotal(oldTotal => oldTotal + parseFloat($(`.subtotal_${el.id}`).text()));
            setGrandTotal(oldTotal => oldTotal + parseFloat($(`.subtotal_${el.id}`).text()));
        });
    }
    const calculateSubtotal = (productId) => {
        const price = parseFloat($(`.productPrice_${productId}`).val());
        const quantity = parseFloat($(`.productQuantity_${productId}`).val());
        $(`.subtotal_${productId}`).text(price * quantity);
        calculateSum();
    }
    const calculateSum = () => {
        setSubTotal(0);
        setTotal(0);
        setGrandTotal(0);
        $(`.subtotal`).each(function () {
            setSubTotal(oldTotal => oldTotal + parseFloat($(this).text()));
            setTotal(oldTotal => oldTotal + parseFloat($(this).text()));
            setGrandTotal(oldTotal => oldTotal + parseFloat($(this).text()));
        });
    }
    const calculateDue = () => {
        setPaid(0);
        $(`.paid`).each(function () {
            setPaid(oldTotal => oldTotal + parseFloat($(this).val() ? $(this).val() : 0));
        });
    }
    const searchProduct = async () => {
        $('.autocompleteItemContainer.product').show();
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        const name = $(`.search-product`).val();
        setTimer(
            setTimeout(() => {
                axios.get(
                    `${process.env.API_URL}/product?name=${name}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        setProducts(res.data.products.data);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 500)
        );
    }
    const searchProductByBarcode = async (e) => {
        e.preventDefault();
        const id = $(`.scan-barcode`).val();
        if (id !== '') {
            axios.get(
                `${process.env.API_URL}/product-by-barcode?id=${id}`,
                headers
            ).then(res => {
                if (res.data.status === true) {
                    addProduct(res.data.product);
                    $(`.scan-barcode`).val('');
                    calculateSubtotal(res.data.product.id);
                } else {
                    alert('No product found');
                }
            }).catch(err => {
                console.log(err);
            });
        }
    }
    const addProduct = (data) => {
        const alreadyAdded = purchaseProducts.filter(product => {
            return product.id === data.id;
        });
        if (alreadyAdded.length > 0) {
            const oldQty = $(`.productQuantity_${data.id}`).val();
            const newQty = parseFloat(oldQty) + 1;
            $(`.productQuantity_${data.id}`).val(newQty);
        } else {
            setPurchaseProducts(currentProduct => [...currentProduct, data]);
            setSubTotal(oldTotal => oldTotal + parseFloat(data.price));
            setTotal(oldTotal => oldTotal + parseFloat(data.price));
            setGrandTotal(oldTotal => oldTotal + parseFloat(data.price));
        }
        $('.autocompleteItemContainer.product').hide();
        $(`.search-product`).val('');
    }
    const showPayment = () => {
        $('.payment-modal').fadeIn();
    }
    const hidePayment = () => {
        $('.payment-modal').fadeOut();
    }
    const addMoney = (amount) => {
        $('.cash').val(amount);
        calculateDue();
    }
    const calculateDiscount = () => {
        const discount = $('.discount').val();
        const discountType = $('.discount-type').val();
        setTotal(0);
        setGrandTotal(0);
        $(`.subtotal`).each(function () {
            setTotal(oldTotal => oldTotal + parseFloat($(this).text()));
            setGrandTotal(oldTotal => oldTotal + parseFloat($(this).text()));
        });
        if (discountType === '%') {
            const discountedAmount = (total * parseFloat(discount)) / 100;
            setDiscountAmount(discountedAmount);
        } else {
            setDiscountAmount(parseFloat(discount));
        }
    }
    return (
        <>
            <Head>
                <title>
                    POS
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`POS`} sidebar='pos' topbar='pos'>
                <div className="content-pos">
                    <form onSubmit={handleForm} id='invoice'></form>
                    <div className="custom-card mb-3">
                        <div className="row">
                            <div className="col-md-3">
                                <AutocompleteInput type='customer' token={user.token} placeholder='Search customer'/>
                            </div>
                            <div className="col-md-3">
                                <DatePicker
                                    selected={date}
                                    onChange={(date) => setDate(date)}
                                    dateFormat='yyyy-MM-dd'
                                    className={`form-control date`}
                                />
                            </div>
                            <div className="col-md-3">
                                <form onSubmit={searchProductByBarcode}>
                                    <input type="text" className={`form-control scan-barcode`}
                                           placeholder={`Scan Barcode Here`}
                                           id='barcode'
                                           autoFocus/>
                                </form>
                            </div>
                            <div className="col-md-3">
                                <div className={`autocompleteWrapper product`}>
                                    <input type="text"
                                           className={`form-control autocompleteInput search-product`}
                                           autoComplete={`off`} onKeyUp={searchProduct}
                                           onKeyDown={searchProduct}
                                           onChange={searchProduct} placeholder={`Search product`}/>
                                    <div className={`autocompleteItemContainer product`}>
                                        {
                                            products && (
                                                products.map(el => (
                                                    <div className={`autocompleteItem`}
                                                         key={`search-product-item-${el.id}`}
                                                         onClick={() => addProduct(el)}>{el.name}</div>
                                                ))
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="custom-card">
                        <table className={`table table-bordered table-hover`}>
                            <thead>
                            <tr>
                                <th width={`5%`}>
                                    SL
                                </th>
                                <th width={`35%`}>
                                    Product Name
                                </th>
                                <th width={`15%`}>
                                    Price
                                </th>
                                <th width={`15%`}>
                                    Quantity
                                </th>
                                <th className={`text-end`} width={`20%`}>
                                    Subtotal
                                </th>
                                <th className={`text-center`} width={`10%`}>
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className={`border-bottom border-1 border-white`}>
                            {
                                purchaseProducts && purchaseProducts.length <= 0 && (
                                    <tr>
                                        <td colSpan={6} className={`text-center`}>
                                            No product added
                                        </td>
                                    </tr>
                                )
                            }
                            {
                                purchaseProducts.map((el, index) => (
                                    <tr key={`purchase-product-item-${el.id}`}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {el.name}
                                            <input type="hidden" className={`productId`}
                                                   defaultValue={el.id}/>
                                        </td>
                                        <td>
                                            <input type="text"
                                                   className={`form-control productPrice productPrice_${el.id}`}
                                                   defaultValue={el.price}
                                                   onChange={() => calculateSubtotal(el.id)}
                                                   onKeyUp={() => calculateSubtotal(el.id)}
                                                   onKeyDown={() => calculateSubtotal(el.id)}/>
                                        </td>
                                        <td>
                                            <input type="text"
                                                   className={`form-control productQuantity productQuantity_${el.id}`}
                                                   defaultValue={1}
                                                   onChange={() => calculateSubtotal(el.id)}
                                                   onKeyUp={() => calculateSubtotal(el.id)}
                                                   onKeyDown={() => calculateSubtotal(el.id)}/>
                                        </td>
                                        <td className={`text-end`}>
                                                        <span
                                                            className={`subtotal subtotal_${el.id}`}>{el.price}</span> Tk.
                                        </td>
                                        <td className={`text-center`}>
                                            <button
                                                className={`btn btn-danger btn-sm`}
                                                onClick={() => removeProduct(el.id)}>
                                                <i className="fa-solid fa-trash-can"/>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <td className={`text-end`} colSpan={4}><strong>Subtotal</strong></td>
                                <td className={`text-end d-block`}>
                                    <span>{subTotal} Tk.</span>
                                </td>
                                <td/>
                            </tr>
                            <tr>
                                <td className={`text-end`} colSpan={4}>
                                    <strong>Sale Discount</strong>
                                </td>
                                <td className={`text-end d-block`}>
                                    <input type="text" className={`form-control discount`}
                                           onKeyUp={calculateDiscount}
                                           onKeyDown={calculateDiscount} onChange={calculateDiscount}/>
                                </td>
                                <td>
                                    <select className={`form-select form-control discount-type`}
                                            onChange={calculateDiscount}>
                                        <option value="%">Percent</option>
                                        <option value="fixed">Fixed</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td className={`text-end`} colSpan={4}><strong>Discount Amount</strong></td>
                                <td className={`text-end d-block`}>
                                    <span>{discountAmount}</span> Tk.
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className={`text-end`} colSpan={4}><strong>Total</strong></td>
                                <td className={`text-end d-block`}>
                                    <span className='total'>{total - discountAmount}</span> Tk.
                                </td>
                                <td></td>
                            </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="mb-3 mt-3">
                        <textarea id="note" rows="3" className={`note form-control`} placeholder='Note'/>
                    </div>
                    <button className={`btn btn-success mb-5`} onClick={showPayment}>Payment</button>
                </div>
            </Layout>
            <div className="payment-modal">
                <div className="payment-modal-container">
                    <div className="close">
                        <span className='fa-solid fa-close' onClick={hidePayment}></span>
                    </div>
                    <div className="title">
                        Payment
                    </div>
                    <hr/>
                    <div className="row gx-5">
                        <div className="col-md-8">
                            <div className="form-group mb-3">
                                <label className={`form-label`}>
                                    Cash
                                </label>
                                <input type="text" className={`form-control paid cash`}
                                       onKeyUp={calculateDue}
                                       onKeyDown={calculateDue} onChange={calculateDue}/>
                            </div>
                            <div className="form-group mb-3">
                                <label className={`form-label`}>
                                    Bkash
                                </label>
                                <input type="text" className={`form-control paid bkash`}
                                       onKeyUp={calculateDue}
                                       onKeyDown={calculateDue} onChange={calculateDue}/>
                            </div>
                            <div className="form-group mb-3">
                                <label className={`form-label`}>
                                    Nagad
                                </label>
                                <input type="text" className={`form-control paid nagad`}
                                       onKeyUp={calculateDue}
                                       onKeyDown={calculateDue} onChange={calculateDue}/>
                            </div>
                            <div className="form-group mb-3">
                                <label className={`form-label`}>
                                    Card
                                </label>
                                <input type="text" className={`form-control paid card`}
                                       onKeyUp={calculateDue}
                                       onKeyDown={calculateDue} onChange={calculateDue}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="notes">
                                Notes
                            </div>
                            <ul className='note-list'>
                                <li onClick={() => addMoney(50)}>
                                    50
                                </li>
                                <li onClick={() => addMoney(100)}>
                                    100
                                </li>
                                <li onClick={() => addMoney(200)}>
                                    200
                                </li>
                                <li onClick={() => addMoney(500)}>
                                    500
                                </li>
                                <li onClick={() => addMoney(1000)}>
                                    1000
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            Total : {grandTotal - discountAmount} Tk.
                        </div>
                        <div className="col-md-6">
                            Change/Due : {grandTotal - paid} Tk.
                        </div>
                    </div>
                    <button className={`btn btn-success mt-3 float-end`} onClick={handleForm}>Save</button>
                </div>
            </div>
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