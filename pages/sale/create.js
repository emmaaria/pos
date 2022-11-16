import Layout from "../../components/layout/Layout"
import Head from "next/head"
import {withIronSessionSsr} from 'iron-session/next'
import session from "../../lib/session"
import {ToastContainer, toast} from 'react-toastify'
import axios from "axios"
import $ from 'jquery'
import {useState} from "react"
import DatePicker from "react-datepicker"
import AutocompleteInput from "../../components/AutocompleteInput"
import Loader from "../../components/Loader"
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/virtual'
import PosMenu from "../../components/PosMenu";
import PosCategories from "../../components/PosCategories";
import PosProducts from "../../components/PosProducts";

export default function CreateSale({user}) {
    const [loader, setLoader] = useState(false)
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [paid, setPaid] = useState(0)
    const [discountAmount, setDiscountAmount] = useState(0)
    const [products, setProducts] = useState()
    const [timer, setTimer] = useState(null)
    const [date, setDate] = useState(new Date())
    const [invoiceProducts, setInvoiceProducts] = useState([])
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    }
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
        const comment = $('.note').val()
        const date = $('.date').val()
        const cash = $('.cash').val()
        const bkash = $('.bkash').val()
        const nagad = $('.nagad').val()
        const card = $('.card').val()
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
                productIds,
                productQuantities,
                productPrices,
                date,
                comment,
                cash,
                bkash,
                nagad,
                card,
                discountAmount,
                discount,
                discountType,
                pos: 1
            }, headers)
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
                toast.success(res.data.error, {
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
        $(`.subtotal_${productId}`).text(price * quantity)
        calculateSum()
    }
    const calculateSum = () => {
        setSubTotal(0)
        setTotal(0)
        setGrandTotal(0)
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
    const searchProduct = async () => {
        $('.autocompleteItemContainer.product').show()
        if (timer) {
            clearTimeout(timer)
            setTimer(null)
        }
        const name = $(`.search-product`).val()
        setTimer(
            setTimeout(() => {
                axios.get(
                    `${process.env.API_URL}/product?name=${name}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        setProducts(res.data.products.data)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }, 500)
        )
    }
    const searchProductByBarcode = async (e) => {
        e.preventDefault()
        const id = $(`.scan-barcode`).val()
        if (id !== '') {
            axios.get(
                `${process.env.API_URL}/product-by-barcode?id=${id}`,
                headers
            ).then(res => {
                if (res.data.status === true) {
                    addProduct(res.data.product)
                    $(`.scan-barcode`).val('')
                    calculateSubtotal(res.data.product.product_id)
                } else {
                    alert('No product found')
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
    const addProduct = (data) => {
        const alreadyAdded = invoiceProducts.filter(product => {
            return product.product_id === data.product_id
        })
        if (alreadyAdded.length > 0) {
            const oldQty = $(`.productQuantity_${data.product_id}`).val()
            const newQty = parseFloat(oldQty) + 1
            $(`.productQuantity_${data.product_id}`).val(newQty)
        } else {
            setInvoiceProducts(currentProduct => [...currentProduct, data])
            setSubTotal(oldTotal => oldTotal + parseFloat(data.price))
            setTotal(oldTotal => oldTotal + parseFloat(data.price))
            setGrandTotal(oldTotal => oldTotal + parseFloat(data.price))
        }
        $('.autocompleteItemContainer.product').hide()
        $(`.search-product`).val('')
    }
    const showPayment = () => {
        $('.payment-modal').fadeIn()
    }
    const hidePayment = () => {
        $('.payment-modal').fadeOut()
    }
    const addMoney = (amount) => {
        $('.cash').val(amount)
        calculateDue()
    }
    const calculateDiscount = () => {
        const discount = $('.discount').val() ? $('.discount').val() : 0
        const discountType = $('.discount-type').val()
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
                <div className="content-pos">
                    <div className="row pb-15">
                        <div className="col-md-7">
                            <form onSubmit={handleForm} id='invoice'></form>
                            <div className="d-flex gap-3 justify-content-between">
                                <PosMenu/>
                                <div className={`autocompleteWrapper product flex-grow-1`}>
                                    <input type="text"
                                           className={`form-control autocompleteInput search-product`}
                                           autoComplete={`off`} onKeyUp={searchProduct}
                                           onKeyDown={searchProduct}
                                           onChange={searchProduct} placeholder={`Search product by name`}/>
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
                                <div className="barcode-scanner flex-grow-1">
                                    <form onSubmit={searchProductByBarcode}>
                                        <div className="barcode-icon">
                                            <i className="fa-solid fa-barcode"></i>
                                        </div>
                                        <input type="text" className={`form-control scan-barcode`}
                                               placeholder={`Scan Barcode Here`}
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
                                                           placeholder='Search customer'/>
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
                                            className={`form-control date`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="custom-card left-card">
                                        <PosCategories token={user.token}/>
                                        <PosProducts token={user.token} addProduct={addProduct}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="custom-card right-card">
                                        <div className="product-table">
                                            <table className={`table`}>
                                                <thead>
                                                <tr>
                                                    <th width={`5%`}>
                                                        SL
                                                    </th>
                                                    <th width={`35%`}>
                                                        Product
                                                    </th>
                                                    <th width={`15%`}>
                                                        Price
                                                    </th>
                                                    <th width={`15%`}>
                                                        Qty
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
                                                    invoiceProducts && invoiceProducts.length <= 0 && (
                                                        <tr>
                                                            <td colSpan={6} className={`text-center`}>
                                                                No product added
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                                {
                                                    invoiceProducts.map((el, index) => (
                                                        <tr key={`purchase-product-item-${el.product_id}`}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td className={`bold`}>
                                                                {el.name}
                                                                <input type="hidden" className={`productId`}
                                                                       defaultValue={el.product_id}/>
                                                            </td>
                                                            <td>
                                                                {el.price} Tk.
                                                                <input type="hidden"
                                                                       className={`form-control productPrice productPrice_${el.product_id}`}
                                                                       defaultValue={el.price}/>
                                                            </td>
                                                            <td>
                                                                <div className="product-qry-container">

                                                                </div>
                                                                <input type="text"
                                                                       className={`form-control productQuantity productQuantity_${el.product_id}`}
                                                                       defaultValue={1}
                                                                       onChange={() => calculateSubtotal(el.product_id)}
                                                                       onKeyUp={() => calculateSubtotal(el.product_id)}
                                                                       onKeyDown={() => calculateSubtotal(el.product_id)}/>
                                                            </td>
                                                            <td className={`text-end`}>
                                                                <span className={`subtotal subtotal_${el.product_id}`}>
                                                                    {el.price}
                                                                </span> Tk.
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
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="subtotal-area">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-2">
                                                        <select className={`form-select form-control discount-type`}
                                                                onChange={calculateDiscount}>
                                                            <option value="%">Discount Type (%)</option>
                                                            <option value="fixed">Discount Type (Fixed)</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="text" className={`form-control discount`}
                                                               placeholder={`Discount`}
                                                               onKeyUp={calculateDiscount}
                                                               onKeyDown={calculateDiscount}
                                                               onChange={calculateDiscount}/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 text-end">
                                                    <p>
                                                        <strong>Total Qty</strong> : <span>{subTotal} Tk.</span>
                                                    </p>
                                                    <p>
                                                        <strong>Subtotal</strong> : <span>{subTotal} Tk.</span>
                                                    </p>
                                                    <p>
                                                        <strong>Discount
                                                            Amount</strong> : <span>{discountAmount}</span> Tk.
                                                    </p>
                                                    <p className={`ttl`}>
                                                        <strong>
                                                            Total : <span
                                                            className='total'>{total - discountAmount}</span> Tk.
                                                        </strong>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="payment-area">
                                            <div className="d-flex justify-content-between align-items-center gap-4">
                                                <button className={`btn btn-danger d-block w-100 py-3`} onClick={reset}>
                                                    Reset <i className="fa-solid fa-rotate-right"></i>
                                                </button>
                                                <button className={`btn btn-success d-block w-100 py-3 pay-btn`}
                                                        onClick={showPayment}>
                                                    Pay Now <i className="fa-solid fa-money-bill"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                            <div className="mb-3 mt-3">
                                <textarea id="note" rows="3" className={`note form-control`} placeholder='Note'/>
                            </div>
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
                            Change/Due : {Math.abs((grandTotal - discountAmount) - paid)} Tk.
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