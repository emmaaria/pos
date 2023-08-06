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
import useMode from "../../lib/mode";

export default function CreatePurchase({user}) {
    const [loader, setLoader] = useState(false);
    const [banks, setBanks] = useState([]);
    const [bank, setBank] = useState();
    const [total, setTotal] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [due, setDue] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [products, setProducts] = useState();
    const [timer, setTimer] = useState(null);
    const [date, setDate] = useState(new Date());
    const [purchaseProducts, setPurchaseProducts] = useState([]);
    const [keyword, setKeyword] = useState();
    const [searching, setSearching] = useState(false);
    const {mode} = useMode()
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const handleBankPaid = (event) => {
        $(`.bank`).val(event.target.value.replace(/[^0-9.]/g, ''));
        setBank(event.target.value.replace(/[^0-9.]/g, ''))
        calculateDue()
    }
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
        const bkash = $('.bkash').val();
        const nagad = $('.nagad').val();
        const bankId = $('.bankId').val();
        const openingStock = $('.opening').val();
        const supplier = $('.supplier-id').val();
        if (supplier === '') {
            setLoader(false);
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
            const res = await axios.post(`${process.env.API_URL}/purchase/store`, {
                supplier_id: supplier,
                productIds,
                productQuantities,
                productPrices,
                date,
                comment,
                cash,
                bkash,
                nagad,
                bankId,
                bank,
                paymentMethod,
                total,
                openingStock
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
                setDue(0);
                setPurchaseProducts([]);
                setTotal(0);
                setTotalQty(0);
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
            return product.product_id !== productId;
        });
        setPurchaseProducts(newProducts);
        setTotal(0);
        setTotalQty(0);
        newProducts.map(el => {
            setTotal(oldTotal => oldTotal + parseFloat($(`.subtotal_${el.product_id}`).text()));
            setTotalQty(oldTotal => oldTotal + parseFloat($(`.productQuantity_${el.product_id}`).val()));
        });
    }
    const calculateSubtotal = (event, type, productId) => {
        const price = parseFloat($(`.productPrice_${productId}`).val());
        const quantity = parseFloat($(`.productQuantity_${productId}`).val());
        const subTotal = isNaN(price * quantity) ? 0 : price * quantity;
        $(`.subtotal_${productId}`).text(`${parseFloat(subTotal).toFixed(2)}`);
        if (type === 'quantity') {
            $(`.productQuantity_${productId}`).val(event.target.value.replace(/[^0-9.]/g, ''));
        } else {
            $(`.productPrice_${productId}`).val(event.target.value.replace(/[^0-9.]/g, ''));
        }
        calculateSum();
    }
    const calculateSum = () => {
        setTotal(0);
        $(`.subtotal`).each(function () {
            setTotal(oldTotal => oldTotal + parseFloat($(this).text()));
        });
        setTotalQty(0)
        $(`.productQuantity`).each(function () {
            setTotalQty(oldTotal => oldTotal + parseFloat($(this).val()));
        });
    }
    const calculateDue = (event, type) => {
        let paid = 0;
        if (event && type) {
            $(`.${type}`).val(event.target.value.replace(/[^0-9.]/g, ''));
        }
        $('.paid').each(function () {
            paid += Number($(this).val());
        });
        setDue(parseFloat(paid));
    }
    const searchProduct = async (value) => {
        setKeyword(value);
        setSearching(true)
        setProducts(null)
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
                    setSearching(false)
                    if (res.data.status === true) {
                        setProducts(res.data.products.data);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 500)
        );
    }
    const addProduct = (data) => {
        const alreadyAdded = purchaseProducts.filter(product => {
            return product.product_id === data.product_id;
        });
        if (alreadyAdded.length > 0) {
            alert('Product already added');
        } else {
            setPurchaseProducts(currentProduct => [...currentProduct, data]);
            setTotal(oldTotal => oldTotal + parseFloat(data.purchase_price));
        }
        $(`.search-product`).val('');
        setKeyword(null)
        setTotalQty(totalQty + 1);
    }
    const handlePaymentMethod = (event) => {
        if (event.target.value === 'bank' || event.target.value === 'multiple') {
            setLoader(true);
            axios.get(
                `${process.env.API_URL}/bank?allData=true`,
                headers
            ).then(res => {
                if (res.data.status === true) {
                    setBanks(res.data.banks);
                    calculateDue();
                    calculateSum();
                    setLoader(false);
                } else {
                    setLoader(false);
                    toast.error('No bank account fround. Please add bank first.', {
                        position: "bottom-right",
                        autoClose: false,
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
        }
        setPaymentMethod(event.target.value)
    }
    return (
        <>
            <Head>
                <title>
                    Add New Purchase
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Add New Purchase`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body dark' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="supplier" className={`form-label`}>Supplier</label>
                                    <AutocompleteInput type='supplier' token={user.token}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="date" className={`form-label d-block`}>Date</label>
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
                            <div className={`autocompleteWrapper product`}>
                                <input type="text" className={`form-control autocompleteInput search-product`}
                                       autoComplete={`off`} onKeyUp={(e) => searchProduct(e.target.value)}
                                       onKeyDown={(e) => searchProduct(e.target.value)}
                                       onChange={(e) => searchProduct(e.target.value)}
                                       placeholder={`Search product`}/>
                                {
                                    keyword && (
                                        <div className={`autocompleteItemContainer product`}>
                                            {
                                                products && (
                                                    products.length > 0 && (
                                                        products.map(el => (
                                                            <div className={`autocompleteItem`}
                                                                 key={`search-product-item-${el.product_id}`}
                                                                 onClick={() => addProduct(el)}>
                                                                {el.name} ({el.product_id})
                                                            </div>
                                                        ))
                                                    ) || (
                                                        <div className={`autocompleteItem`}>
                                                            No result found
                                                        </div>
                                                    )
                                                )
                                            }
                                            {
                                                searching && (
                                                    <div className={`autocompleteItem`}>
                                                        Searching...
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
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
                                purchaseProducts.length > 0 && (
                                    purchaseProducts.map((el, index) => (
                                        <tr key={`purchase-product-item-${el.product_id}`}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {el.name}
                                                <input type="hidden" className={`productId`}
                                                       defaultValue={el.product_id}/>
                                            </td>
                                            <td>
                                                <input type="text"
                                                       className={`form-control productPrice productPrice_${el.product_id}`}
                                                       defaultValue={el.purchase_price}
                                                       onChange={(event) => calculateSubtotal(event, 'price', el.product_id)}
                                                       onKeyUp={(event) => calculateSubtotal(event, 'price', el.product_id)}
                                                       onKeyDown={(event) => calculateSubtotal(event, 'price', el.product_id)}/>
                                            </td>
                                            <td>
                                                <input type="text"
                                                       className={`form-control productQuantity productQuantity_${el.product_id}`}
                                                       defaultValue={1}
                                                       onChange={(event) => calculateSubtotal(event, 'quantity', el.product_id)}
                                                       onKeyUp={(event) => calculateSubtotal(event, 'quantity', el.product_id)}
                                                       onKeyDown={(event) => calculateSubtotal(event, 'quantity', el.product_id)}/>
                                            </td>
                                            <td className={`text-end`}>
                                                <span
                                                    className={`subtotal subtotal_${el.product_id}`}>{el.purchase_price}</span> Tk.
                                            </td>
                                            <td className={`text-center`}>
                                                <button
                                                    className={`btn btn-danger btn-sm`}
                                                    onClick={() => removeProduct(el.product_id)}>
                                                    <i className="fa-solid fa-trash-can"/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) || (
                                    <tr>
                                        <td colSpan={6} className={`border-white text-center border-right-1`}>
                                            No product added
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <td className={`text-end`} colSpan={3}><strong>Total</strong></td>
                                <td>
                                    {totalQty}
                                </td>
                                <td className={`text-end border-white d-block border-left-none border-right-none`}>
                                    <span className={`total`}>{parseFloat(total).toFixed(2)} Tk.</span>
                                </td>
                                <td/>
                            </tr>
                            <tr>
                                <td className={`text-end`} colSpan={4}><strong>Payment Method</strong></td>
                                <td>
                                    <select className={`paymentMethod form-control form-select`}
                                            value={paymentMethod} onChange={handlePaymentMethod}>
                                        <option value="cash">Cash</option>
                                        <option value="bank">Bank</option>
                                        <option value="bkash">Bkash</option>
                                        <option value="nagad">Nagad</option>
                                        <option value="multiple">Multiple</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {
                                (paymentMethod === 'cash' || paymentMethod === 'multiple') && (
                                    <tr>
                                        <td className={`text-end`} colSpan={4}>
                                            <strong>Cash Paid Amount</strong>
                                        </td>
                                        <td>
                                            <input type="text" className={`form-control paid cash`}
                                                   onKeyUp={(event) => calculateDue(event, 'cash')}
                                                   onKeyDown={(event) => calculateDue(event, 'cash')}
                                                   onChange={(event) => calculateDue(event, 'cash')}/>
                                        </td>
                                        <td></td>
                                    </tr>
                                )
                            }

                            {
                                (paymentMethod === 'bkash' || paymentMethod === 'multiple') && (
                                    <tr>
                                        <td className={`text-end`} colSpan={4}><strong>Bkash Paid Amount</strong></td>
                                        <td>
                                            <input type="text" className={`form-control paid bkash`}
                                                   onKeyUp={(event) => calculateDue(event, 'bkash')}
                                                   onKeyDown={(event) => calculateDue(event, 'bkash')}
                                                   onChange={(event) => calculateDue(event, 'bkash')}/>
                                        </td>
                                        <td></td>
                                    </tr>
                                )
                            }

                            {
                                (paymentMethod === 'nagad' || paymentMethod === 'multiple') && (
                                    <tr>
                                        <td className={`text-end`} colSpan={4}><strong>Nagad Paid Amount</strong></td>
                                        <td>
                                            <input type="text" className={`form-control paid nagad`}
                                                   onKeyUp={(event) => calculateDue(event, 'nagad')}
                                                   onKeyDown={(event) => calculateDue(event, 'nagad')}
                                                   onChange={(event) => calculateDue(event, 'nagad')}/>
                                        </td>
                                        <td></td>
                                    </tr>
                                )
                            }

                            {
                                (paymentMethod === 'bank' || banks && banks.length > 0 && paymentMethod === 'multiple') && (
                                    <>
                                        <tr>
                                            <td className={`text-end`} colSpan={4}><strong>Bank</strong>
                                            </td>
                                            <td>
                                                <select className={`form-control form-select bankId`} required>
                                                    <option value="">Select Bank</option>
                                                    {
                                                        banks.map(bank => (
                                                            <option key={bank.id} value={bank.id}>
                                                                {bank.name} ({bank.account_no})
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                            </td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td className={`text-end`} colSpan={4}>
                                                <strong>Bank Paid Amount</strong>
                                            </td>
                                            <td>
                                                <input type="text" className={`form-control paid bank`}
                                                       onKeyUp={(event) => handleBankPaid(event)}
                                                       onKeyDown={(event) => handleBankPaid(event)}
                                                       onChange={(event) => handleBankPaid(event)}/>
                                            </td>
                                            <td></td>
                                        </tr>
                                    </>
                                )
                            }

                            <tr>
                                <td className={`text-end`} colSpan={4}><strong>Due</strong></td>
                                <td className={`text-end border-left-none border-right-none border-white d-block`}>
                                    <span className={`due`}>{parseFloat(total - due).toFixed(2)}</span> Tk.
                                </td>
                                <td></td>
                            </tr>
                            </tfoot>
                        </table>
                        {
                            user.role === 'super-admin' && (
                                <div className="mb-3 mt-3">
                                    <label htmlFor="opening" className={`form-label`}>Opening Purchase</label>
                                    <select className="form-control form-select opening" id="opening">
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                            )
                        }
                        <div className="mb-3 mt-3">
                            <label htmlFor="note" className={`form-label`}>Note</label>
                            <textarea id="note" rows="3" className={`note form-control`}/>
                        </div>
                        <button className={`btn btn-success`} onClick={handleForm}>Save</button>
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
