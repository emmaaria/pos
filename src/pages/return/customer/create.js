import Layout from "../../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useState} from "react";
import DatePicker from "react-datepicker";
import Loader from "../../../components/Loader";
import AutocompleteInput from "../../../components/AutocompleteInput";
import useMode from "../../../lib/mode";

export default function CreateCustomerReturn({user}) {
    const [loader, setLoader] = useState(false);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState();
    const [timer, setTimer] = useState(null);
    const [date, setDate] = useState(new Date());
    const [returnProducts, setReturnProducts] = useState([]);
    const [banks, setBanks] = useState();
    const [keyword, setKeyword] = useState();
    const [searching, setSearching] = useState(false);
    const [account, setAccount] = useState();
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
        const account = $('.account').val();
        const bankId = $('.bankId').val();
        const customerId = $('.customer-id').val();
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
        if (account == '') {
            setLoader(false);
            toast.dismiss();
            toast.error('No adjust account selected', {
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
        if (customerId == '') {
            setLoader(false);
            toast.dismiss();
            toast.error('Please select a customer', {
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
        if (account !== '' && account == 'bank' && bankId == '') {
            setLoader(false);
            toast.dismiss();
            toast.error('No bank account selected', {
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
            const res = await axios.post(`${process.env.API_URL}/return/customer/store`, {
                productIds,
                productQuantities,
                productPrices,
                date,
                comment,
                bankId,
                total,
                account,
                customerId
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
                setTotal(0);
                setReturnProducts([]);
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
        const newProducts = returnProducts.filter(product => {
            return product.product_id !== productId;
        });
        setReturnProducts(newProducts);
        setTotal(0);
        newProducts.map(el => {
            setTotal(oldTotal => oldTotal + parseFloat($(`.subtotal_${el.product_id}`).text()));
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
    const scanBarcode = async () => {
        const barcode = $(`.barcode`).val();
        setTimer(
            setTimeout(() => {
                axios.get(
                    `${process.env.API_URL}/product-by-barcode?id=${barcode}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        addProduct(res.data.product)
                        $(`.barcode`).val('');
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 500)
        );
    }
    const addProduct = (data) => {
        const alreadyAdded = returnProducts.filter(product => {
            return product.product_id === data.product_id;
        });
        if (alreadyAdded.length > 0) {
            alert('Product already added');
        } else {
            setReturnProducts(currentProduct => [...currentProduct, data]);
            setTotal(oldTotal => oldTotal + parseFloat(data.price));
        }
        $(`.search-product`).val('');
        setKeyword(null)
    }
    const handleAccountChange = (e) => {
        if (e.target.value === 'bank') {
            setLoader(true);
            axios.get(
                `${process.env.API_URL}/bank?allData=true`,
                headers
            ).then(res => {
                if (res.data.status === true) {
                    setBanks(res.data.banks);
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
        setAccount(e.target.value)
    }
    const handleTotal = (e) => {
        const re = /^[0-9]*[.]?[0-9]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setTotal(e.target.value)
        }
    }
    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Add Customer Return
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Add Customer Return`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body dark' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="date" className={`form-label`}>Date</label>
                                    <DatePicker
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        className={`form-control date`}
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="date" className={`form-label`}>Customer</label>
                                    <AutocompleteInput
                                        type='customer'
                                        token={user.token}
                                        placeholder='Search customer'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="product" className={`form-label`}>Choose Product</label>
                                    <div className={`autocompleteWrapper product`}>
                                        <input type="text"
                                               className={`form-control autocompleteInput search-product`}
                                               autoComplete={`off`} onKeyUp={(e) => searchProduct(e.target.value)}
                                               onKeyDown={(e) => searchProduct(e.target.value)}
                                               onChange={(e) => searchProduct(e.target.value)}
                                               placeholder={`Write product name`}/>
                                        {
                                            keyword && (
                                                <div className={`autocompleteItemContainer product`}>
                                                    {
                                                        products && (
                                                            products.length > 0 && (
                                                                products.map(el => (
                                                                    <div className={`autocompleteItem`}
                                                                         key={`search-product-item-${el.product_id}`}
                                                                         onClick={() => addProduct(el)}>{el.name} ({el.product_id})</div>
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
                                <div className="col-md-6">
                                    <label htmlFor="barcode" className={`form-label`}>Scan Barcode</label>
                                    <input type="text" className={`form-control barcode`}
                                           autoComplete={`off`} onKeyUp={scanBarcode}
                                           onKeyDown={scanBarcode}
                                           onChange={scanBarcode}
                                           placeholder={`Scan barcode here`}/>
                                </div>
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
                                    Price
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
                                returnProducts.length > 0 && (
                                    returnProducts.map((el, index) => (
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
                                                       defaultValue={el.price}
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
                                        <td colSpan={6} className={`text-center`}>
                                            No product added
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={4} className="text-end">
                                    <strong>Total</strong>
                                </td>
                                <td>
                                    <input type="text" value={total} onChange={handleTotal}
                                           className="form-control total"/>
                                </td>
                                <td>Tk.</td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="text-end">
                                    <strong>Adjust From</strong>
                                </td>
                                <td>
                                    <select name="" className="form-select form-control account"
                                            onChange={handleAccountChange}>
                                        <option value="">Choose Option</option>
                                        <option value="cash">Cash</option>
                                        <option value="customer">Customer Account</option>
                                        <option value="bkash">Bkash</option>
                                        <option value="nagad">Nagad</option>
                                        <option value="bank">Bank</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {
                                (account && account === 'bank' && banks && banks.length > 0) && (
                                    <tr>
                                        <td colSpan={4} className="text-end">
                                            <strong>Bank</strong>
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
                                )
                            }
                            </tfoot>
                        </table>
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
