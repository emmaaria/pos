import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {useEffect, useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Loader from "../../components/Loader";
import Select from "react-select";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {toast, ToastContainer} from "react-toastify";
import $ from "jquery";
import useMode from "../../lib/mode";

export default function CustomerLedger({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const [startDate, setStartDate] = useState();
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState();
    const [endDate, setEndDate] = useState();
    const [data, setData] = useState([]);
    const [totalDue, setTotalDue] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/customer?allData=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.customers && res.data.customers.length > 0) {
                        setCustomers([]);
                        res.data.customers.map(el => {
                            setCustomers(old => [...old, {
                                value: el.id,
                                label: `${el.name} (${el.address ? el.address : ''})`
                            }])
                        })
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [setCustomers]);

    const search = async (e) => {
        e.preventDefault;
        if (!customer || customer === '') {
            toast.dismiss();
            toast.error('Please select customer', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            return;
        }
        setLoading(true);
        const start = $('.startDate').val()
        const end = $('.endDate').val()
        axios.post(
            `${process.env.API_URL}/report/customer/ledger`, {
                startDate: start, endDate: end, customer
            },
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.data);
                setTotalDue(0);
                setTotalPaid(0);
                res.data.data?.map(el => {
                    setTotalDue(old => old + parseFloat(el.due))
                    setTotalPaid(old => old + parseFloat(el.deposit))
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
                    Customer Ledger
                </title>
            </Head>
            {
                loading && loading === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Customer Ledger`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body dark' : 'body-bg'}`}>
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
                                                isClearable={true}
                                                isSearchable={true}
                                                onChange={(value) => setCustomer(value?.value)}
                                            />
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
                                            <th>Customer Name</th>
                                            <th>Purpose</th>
                                            <th>Due</th>
                                            <th>Paid</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data && data.length <= 0 && (
                                                <tr>
                                                    <td colSpan={6} className={`text-center`}>No Data Found</td>
                                                </tr>
                                            )
                                        }
                                        {
                                            data.map((el, index) => (
                                                <tr key={el.transaction_id} valign={`middle`}>
                                                    <td>{index + 1}</td>
                                                    <td>{el.date}</td>
                                                    <td>{el.name}</td>
                                                    <td>{el.comment}</td>
                                                    <td>{el.due} Tk.</td>
                                                    <td>{el.deposit} Tk.</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                        {
                                            (data && data.length > 0) && (
                                                <tfoot>
                                                <tr>
                                                    <td colSpan={4} className="text-end">
                                                        <strong>Total : </strong>
                                                    </td>
                                                    <td>
                                                        {totalDue.toFixed(2)} Tk.
                                                    </td>
                                                    <td>
                                                        {totalPaid.toFixed(2)} Tk.
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} className="text-end">
                                                        <strong>
                                                            Balance :
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        {(totalDue - totalPaid).toFixed(2)} Tk.
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                </tfoot>
                                            )
                                        }
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
