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
import TableSkeleton from "../../components/TableSkeleton";
import Link from "next/link";

export default function CustomerReceiveList({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const [startDate, setStartDate] = useState();
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState();
    const [endDate, setEndDate] = useState();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [links, setLinks] = useState([]);
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
    useEffect(() => {
        axios.post(
            `${process.env.API_URL}/customer/payments`, {},
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.data.data);
                setLinks(res.data.data.links);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, [])

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
            `${process.env.API_URL}/customer/payments`, {
                startDate: start, endDate: end, customer
            },
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.data);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    const paginate = async (url) => {
        setLoading(true);
        try {
            const res = await axios.get(
                url,
                headers
            );
            if (res.data.status === true) {
                setData(res.data.data.data);
                setLinks(res.data.data.links);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const deleteHandler = async (id) => {
        toast.loading('Deleting', {
            position: "bottom-right",
            theme: 'dark'
        });
        try {
            const response = await axios.post(`${process.env.API_URL}/customer/payment/delete`, {
                id: id,
            }, headers);
            if (response.data.status === true) {
                toast.dismiss();
                toast.success('Successfully Deleted', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                $(`.row-id-${id}`).fadeOut();
            } else {
                toast.dismiss();
                toast.error(response.data.error, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            }
        } catch (err) {
            toast.dismiss();
            toast.error(err.response.data.errors, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
        }
    };
    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Manage Customer Payments
                </title>
            </Head>
            {
                loading && loading === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Manage Customer Payments`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row mb-4">
                            <div className="col-md-12">
                                <Link href={`/customer/receive`} className={`btn btn-success`}>
                                    <i className="fa-solid fa-plus"/> Add Customer Payment
                                </Link>
                            </div>
                        </div>
                        <hr/>
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
                        <hr/>
                        <table className={`table mt-4`}>
                            <thead>
                            <tr>
                                <th width={`10%`}>ID</th>
                                <th>Date</th>
                                <th>Customer Name</th>
                                <th>Purpose</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (!loading && data && data.length <= 0) && (
                                    <tr>
                                        <td colSpan={6} className={`text-center`}>No Data Found</td>
                                    </tr>
                                )
                            }
                            {
                                data && !loading && (
                                    data.map((el) => (
                                        <tr key={el.transaction_id} valign={`middle`}
                                            className={`row-id-${el.transaction_id}`}>
                                            <td>{el.transaction_id}</td>
                                            <td>{el.date}</td>
                                            <td>{el.name}</td>
                                            <td>{el.comment}</td>
                                            <td>{el.deposit} Tk.</td>
                                            <td>
                                                <a className={`btn btn-danger btn-sm`} onClick={(e) => {
                                                    e.preventDefault();
                                                    const result =
                                                        confirm(
                                                            'Want to delete?'
                                                        );
                                                    if (result) {
                                                        deleteHandler(
                                                            el.transaction_id
                                                        );
                                                    }
                                                }}>
                                                    <i className="fa-solid fa-trash-can"/>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) || (
                                    <TableSkeleton tr={3} td={6}/>
                                )
                            }
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={6}>
                                    <nav className={`float-end`}>
                                        <ul className="pagination mt-3">
                                            {
                                                links.map(el => (
                                                    <li className={`page-item ${el.active === true ? 'active' : ''}`}
                                                        key={el.label}>
                                                        <a className={`page-link`}
                                                           onClick={() => paginate(el.url)}
                                                           dangerouslySetInnerHTML={{__html: el.label}}/>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </nav>
                                </td>
                            </tr>
                            </tfoot>
                        </table>
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
