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

export default function CreatePurchase({user}) {
    const [loader, setLoader] = useState(false);
    const [banks, setBanks] = useState([]);
    const [total, setTotal] = useState(0);
    const [due, setDue] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('cash');
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
        const bkash = $('.bkash').val();
        const nagad = $('.nagad').val();
        const bankId = $('.bankId').val();
        const bank = $('.bank').val();
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
                total
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
                setDue(0);
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
            return product.product_id !== productId;
        });
        setPurchaseProducts(newProducts);
        setTotal(0);
        newProducts.map(el => {
            setTotal(oldTotal => oldTotal + parseFloat($(`.subtotal_${el.product_id}`).text()));
        });
    }
    const calculateSubtotal = (productId) => {
        const price = parseFloat($(`.productPrice_${productId}`).val());
        const quantity = parseFloat($(`.productQuantity_${productId}`).val());
        const subTotal = price * quantity;
        $(`.subtotal_${productId}`).text(`${subTotal}`);
        calculateSum();
    }
    const calculateSum = () => {
        setTotal(0);
        $(`.subtotal`).each(function () {
            setTotal(oldTotal => oldTotal + parseFloat($(this).text()));
        });
    }
    const calculateDue = () => {
        let paid = 0;
        $('.paid').each(function() {
            paid += Number($(this).val());
        });
        setDue(parseFloat(paid));
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
        $('.autocompleteItemContainer.product').hide();
        $(`.search-product`).val('');
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
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="supplier" className={`form-label`}>Supplier</label>
                                        <AutocompleteInput type='supplier' token={user.token}/>
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
                                <div className={`autocompleteWrapper product`}>
                                    <input type="text" className={`form-control autocompleteInput search-product`}
                                           autoComplete={`off`} onKeyUp={searchProduct}
                                           onKeyDown={searchProduct}
                                           onChange={searchProduct} placeholder={`Search product`}/>
                                    <div className={`autocompleteItemContainer product`}>
                                        {
                                            products && (
                                                products.map(el => (
                                                    <div className={`autocompleteItem`}
                                                         key={`search-product-item-${el.product_id}`}
                                                         onClick={() => addProduct(el)}>{el.name}</div>
                                                ))
                                            )
                                        }
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
                                                           onChange={() => calculateSubtotal(el.product_id)}
                                                           onKeyUp={() => calculateSubtotal(el.product_id)}
                                                           onKeyDown={() => calculateSubtotal(el.product_id)}/>
                                                </td>
                                                <td>
                                                    <input type="text"
                                                           className={`form-control productQuantity productQuantity_${el.product_id}`}
                                                           defaultValue={1}
                                                           onChange={() => calculateSubtotal(el.product_id)}
                                                           onKeyUp={() => calculateSubtotal(el.product_id)}
                                                           onKeyDown={() => calculateSubtotal(el.product_id)}/>
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
                                    <td className={`text-end`} colSpan={4}><strong>Total</strong></td>
                                    <td className={`text-end border-white d-block border-left-none border-right-none`}>
                                        <span className={`total`}>{total} Tk.</span>
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
                                    paymentMethod === 'cash' && (
                                        <tr>
                                            <td className={`text-end`} colSpan={4}><strong>Cash Paid Amount</strong></td>
                                            <td>
                                                <input type="text" className={`form-control paid cash`}
                                                       onKeyUp={calculateDue}
                                                       onKeyDown={calculateDue} onChange={calculateDue}/>
                                            </td>
                                            <td></td>
                                        </tr>
                                    )
                                }

                                {
                                    paymentMethod === 'bkash' && (
                                        <tr>
                                            <td className={`text-end`} colSpan={4}><strong>Bkash Paid Amount</strong></td>
                                            <td>
                                                <input type="text" className={`form-control paid bkash`}
                                                       onKeyUp={calculateDue}
                                                       onKeyDown={calculateDue} onChange={calculateDue}/>
                                            </td>
                                            <td></td>
                                        </tr>
                                    )
                                }

                                {
                                    paymentMethod === 'nagad' && (
                                        <tr>
                                            <td className={`text-end`} colSpan={4}><strong>Nagad Paid Amount</strong></td>
                                            <td>
                                                <input type="text" className={`form-control paid nagad`}
                                                       onKeyUp={calculateDue}
                                                       onKeyDown={calculateDue} onChange={calculateDue}/>
                                            </td>
                                            <td></td>
                                        </tr>
                                    )
                                }

                                {
                                    paymentMethod === 'bank' && banks && banks.length > 0 && (
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
                                                <td className={`text-end`} colSpan={4}><strong>Bank Paid Amount</strong>
                                                </td>
                                                <td>
                                                    <input type="text" className={`form-control paid bank`}
                                                           onKeyUp={calculateDue}
                                                           onKeyDown={calculateDue} onChange={calculateDue}/>
                                                </td>
                                                <td></td>
                                            </tr>
                                        </>
                                    )
                                }

                                {
                                    paymentMethod === 'multiple' && (
                                        <>
                                            <tr>
                                                <td className={`text-end`} colSpan={4}><strong>Cash Paid Amount</strong>
                                                </td>
                                                <td>
                                                    <input type="text" className={`form-control paid cash`}
                                                           onKeyUp={calculateDue}
                                                           onKeyDown={calculateDue} onChange={calculateDue}/>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className={`text-end`} colSpan={4}><strong>Bkash Paid Amount</strong>
                                                </td>
                                                <td>
                                                    <input type="text" className={`form-control paid bkash`}
                                                           onKeyUp={calculateDue}
                                                           onKeyDown={calculateDue} onChange={calculateDue}/>
                                                </td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td className={`text-end`} colSpan={4}><strong>Nagad Paid Amount</strong>
                                                </td>
                                                <td>
                                                    <input type="text" className={`form-control paid nagad`}
                                                           onKeyUp={calculateDue}
                                                           onKeyDown={calculateDue} onChange={calculateDue}/>
                                                </td>
                                                <td></td>
                                            </tr>
                                            {
                                                banks && banks.length > 0 && (
                                                    <>
                                                        <tr>
                                                            <td className={`text-end`} colSpan={4}><strong>Bank</strong>
                                                            </td>
                                                            <td>
                                                                <select className={`form-control form-select`} required>
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
                                                            <td className={`text-end`} colSpan={4}><strong>Bank Paid Amount</strong>
                                                            </td>
                                                            <td>
                                                                <input type="text" className={`form-control paid nagad`}
                                                                       onKeyUp={calculateDue}
                                                                       onKeyDown={calculateDue} onChange={calculateDue}/>
                                                            </td>
                                                            <td></td>
                                                        </tr>
                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }

                                <tr>
                                    <td className={`text-end`} colSpan={4}><strong>Due</strong></td>
                                    <td className={`text-end border-left-none border-right-none border-white d-block`}>
                                        <span className={`due`}>{total - due}</span> Tk.
                                    </td>
                                    <td></td>
                                </tr>
                                </tfoot>
                            </table>
                            <div className="mb-3 mt-3">
                                <label htmlFor="note" className={`form-label`}>Note</label>
                                <textarea id="note" rows="3" className={`note form-control`}/>
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