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

export default function EditPurchase({user, id}) {
    const [loader, setLoader] = useState(false);
    const [total, setTotal] = useState(0);
    const [due, setDue] = useState(0);
    const [purchase, setPurchase] = useState();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState();
    const [timer, setTimer] = useState(null);
    const [date, setDate] = useState(new Date());
    const [purchaseProducts, setPurchaseProducts] = useState([]);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/purchase/${id}`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setPurchase(res.data.purchase);
                setTotal(res.data.purchase.purchaseData.amount);
                setDate(new Date(res.data.purchase.purchaseData.date));
                setDue(res.data.purchase.purchaseData.paid);
                setPurchaseProducts(res.data.purchase.purchaseItems);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, [setPurchase, setTotal, setDate, setDue, setPurchaseProducts, setLoading]);
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
        const paid = $('.paid').val();
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
                paid,
                total
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
        const paid = $(`.paid`).val();
        if (paid !== ''){
            setDue(parseFloat(paid));
        }else {
            setDue(0);
        }
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
        console.log(alreadyAdded);
        if (alreadyAdded.length > 0) {
            alert('Product already added');
        } else {
            setPurchaseProducts(currentProduct => [...currentProduct, data]);
            setTotal(oldTotal => parseFloat(oldTotal) + parseFloat(data.purchase_price));
        }
        $('.autocompleteItemContainer.product').hide();
        $(`.search-product`).val('');
    }
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
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
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
                                        <label htmlFor="date" className={`form-label`}>Date</label>
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
                                    purchaseProducts && !loading && (
                                        purchaseProducts.map((el, index) => (
                                            <tr key={`purchase-product-item-${el.product_id}`}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    {el.name}
                                                    <input type="hidden" className={`productId`} defaultValue={el.product_id}/>
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
                                                           defaultValue={el.quantity ? el.quantity : 1}
                                                           onChange={() => calculateSubtotal(el.product_id)}
                                                           onKeyUp={() => calculateSubtotal(el.product_id)}
                                                           onKeyDown={() => calculateSubtotal(el.product_id)}/>
                                                </td>
                                                <td className={`text-end`}>
                                                    <span
                                                        className={`subtotal subtotal_${el.product_id}`}>{el.total ? el.total : el.purchase_price}</span> Tk.
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
                                    <td className={`text-end`} colSpan={4}><strong>Total</strong></td>
                                    <td className={`text-end border-1 border-white d-block`}>
                                        {
                                            purchase && loading === false && (
                                                <span className={`total`}>{total} Tk.</span>
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
                                    <td className={`text-end`} colSpan={4}><strong>Paid</strong></td>
                                    <td className={`px-0`}>
                                        {
                                            purchase && loading === false && (
                                                <input type="text" className={`form-control paid`} onKeyUp={calculateDue}
                                                       onKeyDown={calculateDue} onChange={calculateDue}
                                                       defaultValue={purchase.purchaseData.paid}/>
                                            ) || (
                                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                    <Skeleton width={`100%`} height={30}/>
                                                </SkeletonTheme>
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className={`text-end`} colSpan={4}><strong>Due</strong></td>
                                    <td className={`text-end border-1 border-white d-block`}>
                                        {
                                            purchase && loading === false && (
                                                <span className={`due`}>{total - due} Tk.</span>
                                            ) || (
                                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                    <Skeleton width={`100%`} height={30}/>
                                                </SkeletonTheme>
                                            )
                                        }
                                    </td>
                                </tr>
                                </tfoot>
                            </table>
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