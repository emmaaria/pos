import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Loader from "../../components/Loader";
import useMode from "../../lib/mode";
import ProductSearch from "../../components/ProductSearch";
import $ from "jquery"

export default function ProductPurchaseReport({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const {mode} = useMode()
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [data, setData] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalQty, setTotalQty] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [loading, setLoading] = useState(false);

    const search = (e) => {
        e.preventDefault;
        setLoading(true);
        const productId = $('.product-id').val()
        axios.post(
            `${process.env.API_URL}/report/purchase/by-product`, {
                productId: productId,
                startDate: startDate.toLocaleDateString("sv-SE"),
                endDate: endDate.toLocaleDateString("sv-SE")
            },
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.data);
                setTotalAmount(res.data.totalAmount);
                setTotalQty(res.data.totalQuantity);
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
                    Product Wise Purchase Report
                </title>
            </Head>
            {
                loading && loading === true && (
                    <Loader/>
                )
            }
            <Layout user={user} title={`Product Wise Purchase Report`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row mb-4">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Product
                                    </label>
                                    <ProductSearch token={user.token}/>
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
                                </div>
                            </div>
                        </div>
                        {
                            data && (
                                <>
                                    <hr/>
                                    <table className={`table mt-4`}>
                                        <thead>
                                        <tr>
                                            <th width={`10%`}>Sl</th>
                                            <th>Date</th>
                                            <th>Purchase No.</th>
                                            <th>Supplier Name</th>
                                            <th>Quantity</th>
                                            <th>Weight</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data && data.length <= 0 && (
                                                <tr>
                                                    <td colSpan={7} className={`text-center`}>
                                                        No Purchase Found
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        {
                                            data.map((el, index) => (
                                                <tr key={el.purchase_id} valign={`middle`}>
                                                    <td>{index + 1}</td>
                                                    <td>{el.date}</td>
                                                    <td>{el.purchase_id}</td>
                                                    <td>{el.supplierName}</td>
                                                    <td>{el.quantity}</td>
                                                    <td>{parseFloat(el.quantity) * parseFloat(el.weight)}</td>
                                                    <td>{el.total} Tk.</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td colSpan={4} className="text-end">
                                                <strong>Total</strong>
                                            </td>
                                            <td>
                                                {totalQty.toFixed(2)}
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
