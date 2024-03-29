import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import Loader from "../../components/Loader";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import TableSkeleton from "../../components/TableSkeleton";
import AutocompleteDefaultSupplier from "../../components/AutocompleteDefaultSupplier";
import useMode from "../../lib/mode";

export default function EditPurchase({user, id}) {
    const [loader, setLoader] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState();
    const [paymentData, setPaymentData] = useState([]);
    const [total, setTotal] = useState(0);
    const [due, setDue] = useState(0);
    const [openingStock, setOpeningStock] = useState();
    const [bankId, setBankId] = useState();
    const [bank, setBank] = useState();
    const [purchase, setPurchase] = useState();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const [timer, setTimer] = useState(null);
    const [date, setDate] = useState(new Date());
    const [purchaseProducts, setPurchaseProducts] = useState([]);
    const [keyword, setKeyword] = useState();
    const [searching, setSearching] = useState(false);
    const [banks, setBanks] = useState([]);
    const [totalQty, setTotalQty] = useState(0);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const handleOpeningStockChange = (event) => {
        setOpeningStock(event.target.value)
    }
    const getBankAccounts = () => {
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
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/purchase/${id}`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setPurchase(res.data.purchase);
                setTotal(res.data.purchase.purchaseData.amount);
                setTotalQty(res.data.purchase.totalQty);
                setDate(new Date(res.data.purchase.purchaseData.date));
                setDue(res.data.purchase.purchaseData.paid);
                setPurchaseProducts(res.data.purchase.purchaseItems);
                setOpeningStock(res.data.purchase.purchaseData.opening)
                setPaymentMethod(res.data.purchase.purchaseData.payment_method ? res.data.purchase.purchaseData.payment_method : 'cash')
                setPaymentData(res.data.purchase.paymentData)
                if (res.data.purchase.paymentData.bank) {
                    getBankAccounts()
                    setBankId(res.data.purchase.paymentData.bank.bank_id)
                    setBank(res.data.purchase.paymentData.bank.withdraw)
                }
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, [setPurchase, setTotal, setDate, setDue, setPurchaseProducts, setLoading]);
    const handlePaymentMethod = (event) => {
        if (event.target.value === 'bank' || event.target.value === 'multiple') {
            setLoader(true);
            getBankAccounts()
        }
        setPaymentMethod(event.target.value)
        setDue(0)
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
            const res = await axios.post(`${process.env.API_URL}/purchase/update`, {
                purchase_id: id,
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
    const calculateSubtotal = (event,type, productId) => {
        const price = parseFloat($(`.productPrice_${productId}`).val());
        const quantity = parseFloat($(`.productQuantity_${productId}`).val());
        const subTotal = isNaN(price * quantity) ? 0 : price * quantity;
        $(`.subtotal_${productId}`).text(`${subTotal}`);
        if (type === 'quantity'){
            $(`.productQuantity_${productId}`).val(event.target.value.replace(/[^0-9.]/g, ''));
        }else {
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
        if (event && type){
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
                    setSearching(false)
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
            setTotal(oldTotal => parseFloat(oldTotal) + parseFloat(data.purchase_price));
        }
        $(`.search-product`).val('');
        setKeyword(null)
        setTotalQty(totalQty + 1);
    }
    const handleBankPaid = (event) => {
        $(`.bank`).val(event.target.value.replace(/[^0-9.]/g, ''));
        setBank(event.target.value.replace(/[^0-9.]/g, ''))
        calculateDue()
    }
    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Edit Purchase
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Edit Purchase`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="supplier" className={`form-label`}>Supplier</label>
                                        {
                                            purchase && loading === false && (
                                                <AutocompleteDefaultSupplier name={purchase.purchaseData.supplier_name}
                                                                             id={purchase.purchaseData.supplier_id}
                                                                             token={user.token}/>
                                            ) || (
                                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                    <Skeleton width={`100%`} height={40}/>
                                                </SkeletonTheme>
                                            )
                                        }
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="date" className={`form-label d-block`}>Date</label>
                                        {
                                            purchase && loading === false && (
                                                <DatePicker
                                                    selected={date}
                                                    onChange={(date) => setDate(date)}
                                                    dateFormat='yyyy-MM-dd'
                                                    className={`form-control date`}
                                                />
                                            ) || (
                                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                    <Skeleton width={`100%`} height={40}/>
                                                </SkeletonTheme>
                                            )
                                        }
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
                                                                     onClick={() => addProduct(el)}>{el.name}</div>
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
                                    purchaseProducts && !loading && (
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
                                                           onChange={(event) => calculateSubtotal(event,'price',el.product_id)}
                                                           onKeyUp={(event) => calculateSubtotal(event,'price',el.product_id)}
                                                           onKeyDown={(event) => calculateSubtotal(event,'price',el.product_id)}/>
                                                </td>
                                                <td>
                                                    <input type="text"
                                                           className={`form-control productQuantity productQuantity_${el.product_id}`}
                                                           defaultValue={el.quantity ? el.quantity : 1}
                                                           onChange={(event) => calculateSubtotal(event,'quantity',el.product_id)}
                                                           onKeyUp={(event) => calculateSubtotal(event,'quantity',el.product_id)}
                                                           onKeyDown={(event) => calculateSubtotal(event,'quantity',el.product_id)}/>
                                                </td>
                                                <td className={`text-end`}>
                                                    <span
                                                        className={`subtotal subtotal_${el.product_id}`}>{el.total ? parseFloat(el.total).toFixed(2) : parseFloat(el.purchase_price).toFixed(2)}</span> Tk.
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
                                        <TableSkeleton tr={5} td={6}/>
                                    )
                                }
                                </tbody>
                                <tfoot>
                                <tr>
                                    <td className={`text-end`} colSpan={3}><strong>Total</strong></td>
                                    <td>
                                        {totalQty}
                                    </td>
                                    <td className={`text-end border-1 border-white d-block`}>
                                        {
                                            purchase && loading === false && (
                                                <span className={`total`}>{parseFloat(total).toFixed(2)} Tk.</span>
                                            ) || (
                                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                    <Skeleton width={`100%`} height={30}/>
                                                </SkeletonTheme>
                                            )
                                        }
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
                                    purchase && loading === false && (
                                        paymentMethod === 'cash' && (
                                            <tr>
                                                <td className={`text-end`} colSpan={4}><strong>Cash Paid Amount</strong>
                                                </td>
                                                <td>
                                                    <input type="text" className={`form-control paid cash`}
                                                           onKeyUp={(event) => calculateDue(event,'cash')}
                                                           onKeyDown={(event) => calculateDue(event,'cash')} onChange={(event) => calculateDue(event,'cash')}
                                                           defaultValue={paymentData.cash ? paymentData.cash : ''}/>
                                                </td>
                                                <td></td>
                                            </tr>
                                        )
                                    )
                                }

                                {
                                    purchase && loading === false && (
                                        paymentMethod === 'bkash' && (
                                            <tr>
                                                <td className={`text-end`} colSpan={4}><strong>Bkash Paid Amount</strong>
                                                </td>
                                                <td>
                                                    <input type="text" className={`form-control paid bkash`}
                                                           onKeyUp={(event) => calculateDue(event,'bkash')}
                                                           onKeyDown={(event) => calculateDue(event,'bkash')} onChange={(event) => calculateDue(event,'bkash')}
                                                           defaultValue={paymentData.bkash ? paymentData.bkash : ''}/>
                                                </td>
                                                <td></td>
                                            </tr>
                                        )
                                    )
                                }

                                {
                                    purchase && loading === false && (
                                        paymentMethod === 'nagad' && (
                                            <tr>
                                                <td className={`text-end`} colSpan={4}><strong>Nagad Paid Amount</strong>
                                                </td>
                                                <td>
                                                    <input type="text" className={`form-control paid nagad`}
                                                           onKeyUp={(event) => calculateDue(event,'nagad')}
                                                           onKeyDown={(event) => calculateDue(event,'nagad')} onChange={(event) => calculateDue(event,'nagad')}
                                                           defaultValue={paymentData.nagad ? paymentData.nagad : ''}/>
                                                </td>
                                                <td></td>
                                            </tr>
                                        )
                                    )
                                }

                                {
                                    purchase && loading === false && (
                                        paymentMethod === 'bank' && banks && banks.length > 0 && (
                                            <tr>
                                                <td className={`text-end`} colSpan={4}><strong>Bank</strong>
                                                </td>
                                                <td>
                                                    <select className={`form-control form-select bankId`} value={bankId}
                                                            required onChange={(e) => setBankId(e.target.value)}>
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
                                    )
                                }
                                {
                                    purchase && loading === false && (
                                        paymentMethod === 'bank' && (
                                            <tr>
                                                <td className={`text-end`} colSpan={4}><strong>Bank Paid Amount</strong>
                                                </td>
                                                <td>
                                                    <input type="text" className={`form-control paid bank`}
                                                           onKeyUp={(event) => handleBankPaid(event)}
                                                           onKeyDown={(event) => handleBankPaid(event)} onChange={(event) => handleBankPaid(event)}
                                                           defaultValue={bank ? bank : ''}/>
                                                </td>
                                                <td></td>
                                            </tr>
                                        )
                                    )
                                }

                                {
                                    purchase && loading === false && (
                                        paymentMethod === 'multiple' && (
                                            <>
                                                <tr>
                                                    <td className={`text-end`} colSpan={4}><strong>Cash Paid Amount</strong>
                                                    </td>
                                                    <td>
                                                        <input type="text" className={`form-control paid cash`}
                                                               onKeyUp={(event) => calculateDue(event,'cash')}
                                                               onKeyDown={(event) => calculateDue(event,'cash')} onChange={(event) => calculateDue(event,'cash')}
                                                               defaultValue={paymentData.cash ? paymentData.cash : ''}/>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td className={`text-end`} colSpan={4}><strong>Bkash Paid Amount</strong>
                                                    </td>
                                                    <td>
                                                        <input type="text" className={`form-control paid bkash`}
                                                               onKeyUp={(event) => calculateDue(event,'bkash')}
                                                               onKeyDown={(event) => calculateDue(event,'bkash')} onChange={(event) => calculateDue(event,'bkash')}
                                                               defaultValue={paymentData.bkash ? paymentData.bkash : ''}/>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td className={`text-end`} colSpan={4}><strong>Nagad Paid Amount</strong>
                                                    </td>
                                                    <td>
                                                        <input type="text" className={`form-control paid nagad`}
                                                               onKeyUp={(event) => calculateDue(event,'nagad')}
                                                               onKeyDown={(event) => calculateDue(event,'nagad')} onChange={(event) => calculateDue(event,'nagad')}
                                                               defaultValue={paymentData.nagad ? paymentData.nagad : ''}/>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td className={`text-end`} colSpan={4}><strong>Bank</strong>
                                                    </td>
                                                    <td>
                                                        <select className={`form-control form-select bankId`} value={bankId}
                                                                required onChange={(e) => setBankId(e.target.value)}>
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
                                                               onKeyUp={(event) => handleBankPaid(event)}
                                                               onKeyDown={(event) => handleBankPaid(event)} onChange={(event) => handleBankPaid(event)}
                                                               defaultValue={bank ? bank : ''}/>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </>
                                        )
                                    )
                                }
                                <tr>
                                    <td className={`text-end`} colSpan={4}><strong>Due</strong></td>
                                    <td className={`text-end d-block`}>
                                        {
                                            purchase && loading === false && (
                                                <span className={`due`}>{parseFloat(total - due).toFixed(2)} Tk.</span>
                                            ) || (
                                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                    <Skeleton width={`100%`} height={30}/>
                                                </SkeletonTheme>
                                            )
                                        }
                                    </td>
                                    <td></td>
                                </tr>
                                </tfoot>
                            </table>
                            <div className="mb-3 mt-3">
                                <label className={`form-label`}>Opening Stock</label>
                                {
                                    user.role === 'super-admin' && (
                                        purchase && loading === false && (
                                            <select className="form-control opening" value={openingStock}
                                                    onChange={handleOpeningStockChange}>
                                                <option value='0'>No</option>
                                                <option value='1'>Yes</option>
                                            </select>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    )
                                }
                            </div>
                            <div className="mb-3 mt-3">
                                <label htmlFor="note" className={`form-label`}>Note</label>
                                {
                                    purchase && !loading && (
                                        <textarea id="note" rows="3" className={`note form-control`}
                                                  defaultValue={purchase.purchaseData.comment}/>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={80}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>
                            <button className={`btn btn-success`} onClick={handleForm}>Update</button>
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
                    destination: `/admin`,
                },
            };
        }
        return {
            props: {
                user: session.user,
                id,
            },
        };
    },
    session
);
