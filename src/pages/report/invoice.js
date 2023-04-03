import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Loader from "../../components/Loader";
import useMode from "../../lib/mode";

export default function InvoiceReport({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [data, setData] = useState();
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false);

    const search = async (e) => {
        e.preventDefault;
        setLoading(true);
        axios.post(
            `${process.env.API_URL}/report/sales`, {
                startDate : startDate.toLocaleDateString("sv-SE"),
                endDate : endDate.toLocaleDateString("sv-SE")
            },
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.data);
                setTotal(0);
                res.data.data?.map(el => {
                    setTotal(old => old + parseFloat(el.grand_total))
                })
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Invoice Report
                </title>
            </Head>
            {
                loading && loading === true && (
                    <Loader/>
                )
            }
            <Layout user={user} title={`Invoice Report`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row mb-4">
                            <div className="row">
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
                                            <th>Invoice No.</th>
                                            <th>Customer Name</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data && data.length <= 0 && (
                                                <tr>
                                                    <td colSpan={4} className={`text-center`}>No Sales Found</td>
                                                </tr>
                                            )
                                        }
                                        {
                                            data.map((el, index) => (
                                                <tr key={el.invoice_id} valign={`middle`}>
                                                    <td>{index + 1}</td>
                                                    <td>{el.invoice_id}</td>
                                                    <td>{el.customer_name}</td>
                                                    <td>{el.grand_total} Tk.</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td colSpan={3} className="text-end">
                                                <strong>Total</strong>
                                            </td>
                                            <td>
                                                {total} Tk.
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