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

export default function CreateDirectReturn({user}) {
    const [loader, setLoader] = useState(false);
    const [total, setTotal] = useState(0);
    const [products, setProducts] = useState();
    const [timer, setTimer] = useState(null);
    const [date, setDate] = useState(new Date());
    const [returnProducts, setReturnProducts] = useState([]);
    const [keyword, setKeyword] = useState();
    const [searching, setSearching] = useState(false);
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
    const addProduct = (data) => {
        const alreadyAdded = returnProducts.filter(product => {
            return product.product_id === data.product_id;
        });
        if (alreadyAdded.length > 0) {
            alert('Product already added');
        } else {
            setReturnProducts(currentProduct => [...currentProduct, data]);
            setTotal(oldTotal => oldTotal + parseFloat(data.purchase_price));
        }
        $(`.search-product`).val('');
        setKeyword(null)
    }
    return (
        <>
            <Head>
                <title>
                    Add Direct Product Return
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Add Direct Product Return`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
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
                                                   onBlur={() => setKeyword('')}
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
                                               autoComplete={`off`} onKeyUp={(e) => searchProduct(e.target.value)}
                                               onKeyDown={(e) => searchProduct(e.target.value)}
                                               onChange={(e) => searchProduct(e.target.value)}
                                               onBlur={() => setKeyword('')}
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