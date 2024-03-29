import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import TableSkeleton from "../../components/TableSkeleton";
import {ToastContainer, toast} from 'react-toastify';
import $ from "jquery";
import useMode from "../../lib/mode";

export default function Sale({user}) {
    const [invoices, setInvoices] = useState();
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);
    const {mode} = useMode()
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };

    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/invoice`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setInvoices(res.data.invoices.data);
                setLinks(res.data.invoices.links);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    const searchInvoice = async () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                setLoading(true);
                const name = $('.terms').val();
                axios.get(
                    `${process.env.API_URL}/invoice?keyword=${name}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        setInvoices(res.data.invoices.data);
                        setLinks(res.data.invoices.links);
                        setLoading(false);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 2000)
        );
    }
    const paginate = async (url) => {
        const name = $('.terms').val();
        setLoading(true);
        try {
            const res = await axios.get(
                `${url}&keyword=${name}`,
                headers
            );
            if (res.data.status === true) {
                setInvoices(res.data.invoices.data);
                setLinks(res.data.invoices.links);
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
            const response = await axios.post(`${process.env.API_URL}/invoice/delete`, {
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
    return (
        <>
            <Head>
                <title>
                    Sale List
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Sale List`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body dark' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row">
                            <div className="col-md-9">
                                <Link href={`/sale/create`} className={`btn btn-success`}>
                                    <i className="fa-solid fa-plus"/> Add New Sale
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control terms"
                                                   placeholder={`Search`}
                                                   name="email" onKeyUp={searchInvoice} onKeyDown={searchInvoice}
                                                   onChange={searchInvoice}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <table className={`table mt-4`}>
                            <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Invoice No.</th>
                                <th>Date</th>
                                <th>Customer Name</th>
                                <th>Amount</th>
                                <th>Note</th>
                                <th className="text-end">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                invoices && invoices.length <= 0 && (
                                    <tr>
                                        <td colSpan={7} className={`text-center`}>No Sales Found</td>
                                    </tr>
                                )
                            }
                            {invoices && !loading && (
                                invoices.map((el, index) => (
                                    <tr key={el.invoice_id} valign={`middle`} className={`row-id-${el.invoice_id}`}>
                                        <td>{index + 1}</td>
                                        <td className={`text-uppercase`}>{el.invoice_id}</td>
                                        <td>{el.date}</td>
                                        <td>{el.customer_name}</td>
                                        <td>{el.grand_total} Tk.</td>
                                        <td>{el.comment}</td>
                                        <td className="text-end">
                                            <Link href={`/sale/view/${el.invoice_id}`}
                                                  className={`btn btn-success btn-sm me-2`}>
                                                <i className="fa-solid fa-eye"/>
                                            </Link>
                                            <Link href={`/sale/${el.invoice_id}`}
                                                  className={`btn btn-warning btn-sm me-2`}>
                                                <i className="fa-solid fa-pen-to-square"/>
                                            </Link>
                                            <a className={`btn btn-danger btn-sm`} onClick={(e) => {
                                                e.preventDefault();
                                                const result =
                                                    confirm(
                                                        'Want to delete?'
                                                    );
                                                if (result) {
                                                    deleteHandler(
                                                        el.invoice_id
                                                    ).then();
                                                }
                                            }}>
                                                <i className="fa-solid fa-trash-can"/>
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            ) || (
                                <TableSkeleton tr={3} td={7}/>
                            )}

                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={7}>
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
