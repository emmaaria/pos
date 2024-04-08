import Layout from "../../components/layout/Layout"
import Head from "next/head"
import {withIronSessionSsr} from 'iron-session/next'
import session from "../../lib/session"
import {ToastContainer, toast} from 'react-toastify'
import axios from "axios"
import $ from 'jquery'
import {useEffect, useState, lazy, Suspense} from "react"
import DatePicker from "react-datepicker"
import AutocompleteInput from "../../components/AutocompleteInput"
import Loader from "../../components/Loader"
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/virtual'
import PosMenu from "../../components/PosMenu";
import Swal from 'sweetalert2'

const PosCategories = lazy(() => import("../../components/PosCategories"))
const PosProducts = lazy(() => import("../../components/PosProducts"))
import PosCartList from "../../components/PosCartList";
import PosPaymentModal from "../../components/PosPaymentModal";
import PosInvoicePrint from "../../components/PosInvoicePrint";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import styles from '../../styles/CreateSale.module.css'
import useMode from "../../lib/mode";

export default function CreateSale({user}) {
    const [loader, setLoader] = useState(false)
    const [subTotal, setSubTotal] = useState(0)
    const [showInvoice, setShowInvoice] = useState(false)
    const [total, setTotal] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [paid, setPaid] = useState(0)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [invoice, setInvoice] = useState()
    const [discount, setDiscount] = useState(0)
    const [discountType, setDiscountType] = useState('Tk.')
    const [date, setDate] = useState(new Date())
    const [invoiceProducts, setInvoiceProducts] = useState([])
    const [staticProducts, setStaticProducts] = useState()
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    }
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/products-with-stock`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setStaticProducts(res.data.products)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [invoice])
    const handleForm = async (e) => {
        e.preventDefault()
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        })
        setLoader(true)
        hidePayment()
        const productIds = $('.productId').map(function (index, el) {
            return $(el).val()
        }).get()
        const productQuantities = $('.productQuantity').map(function (index, el) {
            return $(el).val()
        }).get()
        const productPrices = $('.productPrice').map(function (index, el) {
            return $(el).val()
        }).get()
        const productDiscounts = $('.product_discount').map(function (index, el) {
            return $(el).val()
        }).get()
        const productDiscountTypes = $('.product_discount_type').map(function (index, el) {
            return $(el).val()
        }).get()
        const productDiscountedAmounts = $('.productDiscountedAmount').map(function (index, el) {
            return $(el).val()
        }).get()
        const comment = $('.note').val()
        const date = $('.date').val()
        const cash = $('.cash').val()
        const bkash = $('.bkash').val()
        const nagad = $('.nagad').val()
        const card = $('.card').val()
        const payment_method = $('.paymentMethod').val()
        const bank = $('.bank').val()
        const bankId = $('.bankId').val()
        const discountType = $('.discount-type').val()
        const discount = $('.discount').val()
        const customer = $('.customer-id').val()
        if (productIds.length <= 0) {
            setLoader(false)
            toast.dismiss()
            toast.error('No product added', {
                position: "bottom-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            })
            return
        }
        try {
            const res = await axios.post(`${process.env.API_URL}/invoice/store`, {
                customer_id: customer,
                payment_method,
                productIds,
                productQuantities,
                productPrices,
                productDiscounts,
                productDiscountTypes,
                productDiscountedAmounts,
                date,
                comment,
                cash,
                bkash,
                bank,
                bankId,
                nagad,
                card,
                discountAmount,
                discount,
                discountType,
                pos: 1
            }, headers)
            console.log(res.data)
            if (res.data.status === true) {
                toast.dismiss()
                toast.success('Successfully Saved', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                })
                setShowInvoice(true)
                setInvoice(res.data.invoice)
                setPaid(0)
                setGrandTotal(0)
                setSubTotal(0)
                setDiscountAmount(0)
                setInvoiceProducts([])
                setTotal(0)
                setLoader(false)
                $('.note').val('')
                $('.cash').val('')
                $('.bkash').val('')
                $('.nagad').val('')
                $('.card').val('')
                $('.discount').val('')
            } else {
                toast.dismiss()
                toast.success(res.data.errors, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                })
                setLoader(false)
            }
        } catch (e) {
            console.log(e)
            toast.dismiss()
            toast.error(e.response.data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            })
            setLoader(false)
        }
    }

    const removeProduct = (productId) => {
        const newProducts = invoiceProducts.filter(product => {
            return product.product_id !== productId
        })
        setInvoiceProducts(newProducts)
        setTotal(0)
        setGrandTotal(0)
        setSubTotal(0)
        newProducts.map(el => {
            setTotal(oldTotal => oldTotal + parseFloat($(`.subtotal_${el.product_id}`).text()))
            setGrandTotal(oldTotal => oldTotal + parseFloat($(`.subtotal_${el.product_id}`).text()))
        })
    }
    const calculateSubtotal = (productId) => {
        const price = parseFloat($(`.productPrice_${productId}`).val())
        const quantity = parseFloat($(`.productQuantity_${productId}`).val())
        $(`.subtotal_${productId}`).text(((price * quantity).toFixed(2)))
        calculateSum()
    }
    const calculateSum = () => {
        setSubTotal(0)
        setTotal(0)
        setGrandTotal(0)
        setDiscountAmount(0)
        $(`.productDiscountedAmount`).each(function () {
            if (!isNaN($(this).val()) && $(this).val() !== '') {
                setDiscountAmount(oldDiscountAmount => oldDiscountAmount + parseFloat($(this).val()))
            }
        })
        $(`.subtotal`).each(function () {
            setSubTotal(oldTotal => oldTotal + parseFloat($(this).text()))
            setTotal(oldTotal => oldTotal + parseFloat($(this).text()))
            setGrandTotal(oldTotal => oldTotal + parseFloat($(this).text()))
        })
    }
    const calculateDue = () => {
        setPaid(0)
        $(`.paid`).each(function () {
            setPaid(oldTotal => oldTotal + parseFloat($(this).val() ? $(this).val() : 0))
        })
    }
    const searchProductByBarcode = (e) => {
        e.preventDefault()
        const id = $(`.scan-barcode`).val()
        if (id !== '') {
            staticProducts.filter((item) => {
                if (item.product_id === id) {
                    addProduct(item)
                    $(`.scan-barcode`).val('')
                }
            })
        }
    }
    const addToCartDirect = (data) => {
        const alreadyAdded = invoiceProducts.filter(product => {
            return product.product_id === data.product_id
        })
        if (user.stockOverSelling != 1) {
            const stock = data.purchase - (data.sale - data.return);
            if (stock <= 0) {
                toast.dismiss()
                toast.error('You don\'t have stock. Please purchase product first.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                })
                return;
            }
        }

        toast.dismiss()
        if (alreadyAdded.length > 0) {
            const oldQty = $(`.productQuantity_${data.product_id}`).val()
            const newQty = parseFloat(oldQty) + 1
            $(`.productQuantity_${data.product_id}`).val(newQty)
            calculateSubtotal(data.product_id)
        } else {
            setInvoiceProducts(currentProduct => [...currentProduct, data])
            setSubTotal(oldTotal => oldTotal + parseFloat(data.price))
            setTotal(oldTotal => oldTotal + parseFloat(data.price))
            setGrandTotal(oldTotal => oldTotal + parseFloat(data.price))
        }
        $(`.search-product`).val('')
    }

    const addToCartByCustomer = (data) => {
        const alreadyAdded = invoiceProducts.filter(product => {
            return product.product_id === data.product_id
        })
        if (user.stockOverSelling != 1) {
            const stock = data.purchase - (data.sale - data.return);
            if (stock <= 0) {
                toast.dismiss()
                toast.error('You don\'t have stock. Please purchase product first.', {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                })
                return;
            }
        }
        toast.dismiss()
        if (alreadyAdded.length > 0) {
            const oldQty = $(`.productQuantity_${data.product_id}`).val()
            const newQty = parseFloat(oldQty) + 1
            $(`.productQuantity_${data.product_id}`).val(newQty)
            calculateSubtotal(data.product_id)
        } else {
            setLoader(true)
            axios.post(`${process.env.API_URL}/product/price-by-customer`, {
                customer: $('.customer-id').val(),
                productID: data.product_id
            }, headers).then(response => {
                setLoader(false)
                if (response.data.product && response.data.product.price) {
                    setInvoiceProducts(currentProduct => [...currentProduct, {
                        ...data,
                        price: response.data.product.price
                    }])
                    setSubTotal(oldTotal => oldTotal + parseFloat(response.data.product.price))
                    setTotal(oldTotal => oldTotal + parseFloat(response.data.product.price))
                    setGrandTotal(oldTotal => oldTotal + parseFloat(response.data.product.price))
                } else {
                    setInvoiceProducts(currentProduct => [...currentProduct, data])
                    setSubTotal(oldTotal => oldTotal + parseFloat(data.price))
                    setTotal(oldTotal => oldTotal + parseFloat(data.price))
                    setGrandTotal(oldTotal => oldTotal + parseFloat(data.price))
                }
            }).catch(error => {
                setLoader(false)
                console.log(error)
            })
        }

    }
    const addProduct = (data) => {
        if (user.customerBasedPrice === 'yes') {
            if ($('.customer-id').val() == '') {
                Swal.fire({
                    title: 'Please select customer first',
                    icon: 'error'
                })
            } else {
                addToCartByCustomer(data)
            }
        } else {
            addToCartDirect(data)
        }
    }
    const showPayment = () => {
        $('.payment-modal').fadeIn()
    }
    const hidePayment = () => {
        $('.payment-modal').fadeOut()
    }

    const closeInvoice = () => {
        setShowInvoice(false);
        setInvoice(null);
    }

    const calculateDiscount = () => {
        const discount = $('.discount').val() ? $('.discount').val() : 0
        const discountType = $('.discount-type').val()
        setDiscountType(discountType)
        setDiscount(discount)
        setTotal(0)
        setGrandTotal(0)
        $(`.subtotal`).each(function () {
            setTotal(oldTotal => oldTotal + parseFloat($(this).text()))
            setGrandTotal(oldTotal => oldTotal + parseFloat($(this).text()))
        })
        if (discountType === '%') {
            const discountedAmount = (total * parseFloat(discount)) / 100
            setDiscountAmount(discountedAmount)
        } else {
            setDiscountAmount(parseFloat(discount))
        }
    }
    const reset = () => {
        setPaid(0)
        setGrandTotal(0)
        setSubTotal(0)
        setDiscountAmount(0)
        setInvoiceProducts([])
        setTotal(0)
        setLoader(false)
        $('.note').val('')
        $('.cash').val('')
        $('.bkash').val('')
        $('.nagad').val('')
        $('.card').val('')
        $('.discount').val('')
    }
    const {mode} = useMode()
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
            <Layout user={user} title={`POS`} sidebar={false} topbar={false}>
                <div className={`content-pos ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="row pb-15">
                        <div className="col-md-7">
                            <div className="d-flex gap-3 justify-content-between">
                                <PosMenu token={user.token}/>
                                <div className={`autocompleteWrapper product flex-grow-1`}>
                                    <div className="search-product-input-wrapper">
                                        <div className="search-icon">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </div>
                                        <input type="text"
                                               className={`form-control autocompleteInput search-product ${styles.posInput}`}
                                               autoComplete={`off`} onKeyUp={(e) => setSearch(e.target.value)}
                                               onKeyDown={(e) => setSearch(e.target.value)}
                                               onChange={(e) => setSearch(e.target.value)}
                                               placeholder={`Search product by name`}/>
                                    </div>
                                </div>
                                <div className="barcode-scanner flex-grow-1">
                                    <form onSubmit={searchProductByBarcode}>
                                        <div className="barcode-icon">
                                            <i className="fa-solid fa-barcode"></i>
                                        </div>
                                        <input type="text" className={`form-control scan-barcode ${styles.posInput}`}
                                               placeholder={`Scan Barcode Here`}
                                               autoComplete={`off`}
                                               id='barcode'
                                               autoFocus/>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="customer-input">
                                        <div className="customer-icon">
                                            <i className="fa-regular fa-user"></i>
                                        </div>
                                        <AutocompleteInput type='customer' token={user.token}
                                                           placeholder='Search customer' className={styles.posInput}/>
                                        <div className="customer-add-icon">
                                            <a>
                                                <i className="fa-solid fa-user-plus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="date-input">
                                        <div className="date-icon">
                                            <i className="fa-solid fa-calendar-days"></i>
                                        </div>
                                        <DatePicker
                                            selected={date}
                                            onChange={(date) => setDate(date)}
                                            dateFormat='yyyy-MM-dd'
                                            className={`form-control date ${styles.posInput}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="custom-card left-card">
                                        <Suspense fallback={<SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)"
                                                                           highlightColor="#dddddd"><Skeleton
                                            width={`100%`} height={40}/></SkeletonTheme>}>
                                            <PosCategories token={user.token}/>
                                        </Suspense>
                                        <Suspense fallback={<>
                                            <div className={`product-item`}>
                                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)"
                                                               highlightColor="#dddddd">
                                                    <Skeleton width={`100px`} height={60}/>
                                                </SkeletonTheme>
                                            </div>
                                        </>}>
                                            <PosProducts staticProducts={staticProducts} addProduct={addProduct}
                                                         searchText={search}/>
                                        </Suspense>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="custom-card right-card">
                                        <PosCartList calculateSubtotal={calculateSubtotal}
                                                     invoiceProducts={invoiceProducts} removeProduct={removeProduct}
                                                     discountType={user.discountType}/>
                                        <div className="subtotal-area">
                                            <table className={`table table-bordered`}>
                                                <thead>
                                                <tr className={`no-border`}>
                                                    <th width="60%" className={`no-border p-0`}></th>
                                                    <th className={`no-border p-0`} width="40%"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td className={`text-end`}>
                                                        <strong>Subtotal</strong>
                                                    </td>
                                                    <td>
                                                        <span>{subTotal} Tk.</span>
                                                    </td>
                                                </tr>
                                                {
                                                    user.discountType == 'invoice' && (
                                                        <>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <select
                                                                        className={`form-select form-control discount-type`}
                                                                        onChange={calculateDiscount}>
                                                                        <option value="%">Discount Type (%)</option>
                                                                        <option value="fixed">Discount Type (Fixed)</option>
                                                                    </select>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td></td>
                                                                <td>
                                                                    <input type="text" className={`form-control discount`}
                                                                           placeholder={`Discount`}
                                                                           onKeyUp={calculateDiscount}
                                                                           onKeyDown={calculateDiscount}
                                                                           onChange={calculateDiscount}/>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    )
                                                }
                                                <tr>
                                                    <td className={`text-end`}>
                                                        <strong>Discounted Amount</strong>
                                                    </td>
                                                    <td>
                                                        <span>{discountAmount} Tk.</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={`text-end`}>
                                                        <strong>Previous Due</strong>
                                                    </td>
                                                    <td>
                                                        <span className="previousDue">0 Tk.</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className={`text-end`}>
                                                        <p className={`ttl`}>
                                                            <strong>Total</strong>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p className={`ttl`}>
                                                            <strong>
                                                                <span
                                                                    className='total'>{(total - discountAmount).toFixed(2)}</span> Tk.
                                                            </strong>
                                                        </p>
                                                    </td>
                                                </tr>
                                                {
                                                    invoiceProducts && invoiceProducts.length > 0 && (
                                                        <tr>
                                                            <td colSpan={2}>
                                                                <div className="payment-area">
                                                                    <div
                                                                        className="d-flex justify-content-between align-items-center gap-4">
                                                                        <button
                                                                            className={`btn btn-danger d-block w-100 py-3`}
                                                                            onClick={reset}>
                                                                            Reset <i
                                                                            className="fa-solid fa-rotate-right"></i>
                                                                        </button>
                                                                        <button
                                                                            className={`btn btn-success d-block w-100 py-3 pay-btn`}
                                                                            onClick={showPayment}>
                                                                            Pay Now <i
                                                                            className="fa-solid fa-money-bill"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
            <PosPaymentModal hidePayment={hidePayment} calculateDue={calculateDue}
                             discountAmount={discountAmount} grandTotal={grandTotal} handleForm={handleForm}
                             paid={paid} token={user.token} discountType={discountType} discount={discount}/>
            {
                showInvoice && (
                    <PosInvoicePrint companyName={user.companyName} companyAddress={user.companyAddress}
                                     companyMobile={user.companyMobile} invoice={invoice} closeInvoice={closeInvoice}/>
                )
            }
        </>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req}) {
        const session = req.session
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            }
        }
        return {
            props: {
                user: session.user
            },
        }
    },
    session
)
