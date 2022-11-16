import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import TableSkeleton from "../../components/TableSkeleton";
import $ from 'jquery';
import {ToastContainer, toast} from 'react-toastify';

export default function Bank({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const [banks, setBanks] = useState();
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/bank`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setBanks(res.data.banks.data);
                setLinks(res.data.banks.links);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    const searchBank = async () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                setLoading(true);
                const name = $('.terms').val();
                axios.get(
                    `${process.env.API_URL}/bank?name=${name}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        setBanks(res.data.banks.data);
                        setLinks(res.data.banks.links);
                        setLoading(false);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 2000)
        );
    }
    const paginate = async (url) => {
        setLoading(true);
        try {
            const res = await axios.get(
                url,
                headers
            );
            if (res.data.status === true) {
                setBanks(res.data.banks.data);
                setLinks(res.data.banks.links);
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
            const response = await axios.post(`${process.env.API_URL}/bank/delete`, {
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
            }else {
                toast.dismiss();
                toast.error(response.data.errors, {
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
                    Banks
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Banks`}>
                <div className="content">
                    <div className="custom-card">
                        <div className="row">
                            <div className="col-md-9">
                                <Link href={`/bank/create`}>
                                    <a className={`btn btn-success`}>
                                        <i className="fa-solid fa-plus"/> Add New Bank
                                    </a>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control terms"
                                                   placeholder={`Search bank`}
                                                   name="email" onKeyUp={searchBank} onKeyDown={searchBank}
                                                   onChange={searchBank}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <table className={`table mt-4`}>
                            <thead>
                            <tr>
                                <th width={`20%`}>Bank Name</th>
                                <th width={`15%`}>Account Name</th>
                                <th width={`20%`}>Account Number</th>
                                <th width={`10%`}>Account Type</th>
                                <th width={`20%`}>Balance</th>
                                <th width={`15%`}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                banks && banks.length <= 0 && (
                                    <tr>
                                        <td colSpan={6} className={`text-center`}>No Customer Found</td>
                                    </tr>
                                )
                            }
                            {banks && !loading && (
                                banks.map((el) => (
                                    <tr key={el.id} valign={`middle`} className={`row-id-${el.id}`}>
                                        <td>{el.name}</td>
                                        <td>{el.account_name}</td>
                                        <td>{el.account_no}</td>
                                        <td>{el.bank_type.toUpperCase()}</td>
                                        <td>
                                            {
                                                el.balance ? el.balance : 0
                                            } Tk.
                                        </td>
                                        <td>
                                            <Link href={`/bank/${el.id}`}>
                                                <a className={`btn btn-warning btn-sm me-2`}>
                                                    <i className="fa-solid fa-pen-to-square"/>
                                                </a>
                                            </Link>
                                            <a className={`btn btn-danger btn-sm`} onClick={(e) => {
                                                e.preventDefault();
                                                const result =
                                                    confirm(
                                                        'Want to delete?'
                                                    );
                                                if (result) {
                                                    deleteHandler(
                                                        el.id
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
                            )}
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