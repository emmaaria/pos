import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Loader from "../../components/Loader";
import useMode from "../../lib/mode";
import Select from "react-select";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {useReactToPrint} from "react-to-print";
import {toast, ToastContainer} from "react-toastify";

export default function SaleByCustomer({user}) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const {mode} = useMode()
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [data, setData] = useState();
    const [categories, setCategories] = useState();
    const [category, setCategory] = useState();
    const [customers, setCustomers] = useState();
    const [customer, setCustomer] = useState();
    const [products, setProducts] = useState();
    const [product, setProduct] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalSaleQty, setTotalSaleQty] = useState(0);
    const [totalReturnQty, setTotalReturnQty] = useState(0);
    const [totalNetQuantity, setTotalNetQuantity] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [loading, setLoading] = useState(false);

    const [suppliers, setSuppliers] = useState();
    const [supplier, setSupplier] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/category?allData=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.categories && res.data.categories.length > 0) {
                        setCategories(res.data.categories);
                    }
                }
            } catch (err) {
                console.log(err);
            }

            try {
                const res = await axios.get(
                    `${process.env.API_URL}/customer?allData=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.customers && res.data.customers.length > 0) {
                        setCustomers(res.data.customers);
                    }
                }
            } catch (err) {
                console.log(err);
            }

            try {
                const res = await axios.get(
                    `${process.env.API_URL}/supplier?allData=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.suppliers && res.data.suppliers.length > 0) {
                        setSuppliers(res.data.suppliers);
                    }
                }
            } catch (err) {
                console.log(err);
            }

            try {
                const res = await axios.get(
                    `${process.env.API_URL}/product?all=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.products && res.data.products.length > 0) {
                        setProducts(res.data.products);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [setCategories, setCustomers, setProducts, setSuppliers]);

    const search = (e) => {
        e.preventDefault;
        if (!customer) {
            toast.dismiss();
            toast.error('Please select a customer', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            return
        }
        setLoading(true);
        axios.post(
            `${process.env.API_URL}/report/sales/by-customer`, {
                supplier: supplier,
                customer: customer,
                product: product,
                category: category,
                startDate: startDate?.toLocaleDateString("sv-SE"),
                endDate: endDate?.toLocaleDateString("sv-SE")
            },
            headers
        ).then(res => {
            console.log(res.data)
            if (res.data.status === true) {
                setData(res.data.data);
                setTotalAmount(res.data.totalAmount);
                setTotalNetQuantity(res.data.totalNetQuantity);
                setTotalReturnQty(res.data.totalReturnQty);
                setTotalSaleQty(res.data.totalSaleQty);
                setTotalWeight(res.data.totalWeight);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <>
            <Head>
                <title>
                    Customer Wise Sales
                </title>
            </Head>
            {
                loading && loading === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Customer Wise Sales`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row mb-4">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Customer
                                    </label>
                                    {
                                        customers && (
                                            <Select
                                                options={customers}
                                                placeholder="Select Customer"
                                                isClearable={true}
                                                isSearchable={true}
                                                getOptionValue={(item) => item.id}
                                                getOptionLabel={(item) => `${item.name} (${item.address ? item.address : ''})`}
                                                onChange={(value) => {
                                                    setCustomer(value?.id)
                                                }}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        Supplier
                                    </label>
                                    {
                                        suppliers && (
                                            <Select
                                                options={suppliers}
                                                placeholder="Select Supplier"
                                                isClearable={true}
                                                isSearchable={true}
                                                getOptionValue={(item) => item.id}
                                                getOptionLabel={(item) => `${item.name}`}
                                                onChange={(value) => {
                                                    setSupplier(value?.id)
                                                }}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        Category
                                    </label>
                                    {
                                        categories && (
                                            <Select
                                                options={categories}
                                                placeholder="Select Category"
                                                isClearable={true}
                                                isSearchable={true}
                                                getOptionValue={(item) => item.id}
                                                getOptionLabel={(item) => item.name}
                                                onChange={(value) => {
                                                    setCategory(value?.id)
                                                }}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        Product
                                    </label>
                                    {
                                        products && (
                                            <Select
                                                options={products}
                                                placeholder="Select Product"
                                                isClearable={true}
                                                isSearchable={true}
                                                getOptionValue={(item) => item.product_id}
                                                getOptionLabel={(item) => item.name}
                                                onChange={(value) => {
                                                    setProduct(value?.product_id)
                                                }}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        Start Date
                                    </label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        className={`form-control startDate`}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label">
                                        End Date
                                    </label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        className={`form-control endDate`}
                                    />
                                </div>
                                <div className="col mt-1-8">
                                    <button className="btn btn-success" type={"button"} onClick={search}>
                                        Search
                                    </button>
                                    {
                                        data && data.length > 0 && (
                                            <button className="btn btn-warning ms-3" type={"button"} onClick={handlePrint}>
                                                Print
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            data && (
                                <>
                                    <hr/>
                                    <table className={`table mt-4`} ref={componentRef}>
                                        <thead>
                                        <tr>
                                            <th width={`10%`}>Sl</th>
                                            <th>Product</th>
                                            <th>Sale Qty</th>
                                            <th>Return Qty</th>
                                            <th>Net Sale Qty</th>
                                            <th>Weight</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data && data.length <= 0 && (
                                                <tr>
                                                    <td colSpan={5} className={`text-center`}>
                                                        No Sales Found
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        {
                                            data.map((el, index) => (
                                                <tr key={el.product_id} valign={`middle`}>
                                                    <td>{index + 1}</td>
                                                    <td>{el.name}</td>
                                                    <td>{el.sold_qty}</td>
                                                    <td>{el.returned_qty}</td>
                                                    <td>{el.final_qty}</td>
                                                    <td>{el.weight * el.final_qty}</td>
                                                    <td>{el.final_sale_amount} Tk.</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td colSpan={2} className="text-end">
                                                <strong>Total</strong>
                                            </td>
                                            <td>
                                                {totalSaleQty.toFixed(2)}
                                            </td>
                                            <td>
                                                {totalReturnQty.toFixed(2)}
                                            </td>
                                            <td>
                                                {totalNetQuantity.toFixed(2)}
                                            </td>
                                            <td>
                                                {totalWeight.toFixed(2)}
                                            </td>
                                            <td>
                                                {totalAmount.toFixed(2)}
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </>
                            )
                        }
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
