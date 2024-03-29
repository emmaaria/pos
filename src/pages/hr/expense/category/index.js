import Layout from "../../../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../../../lib/session";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import TableSkeleton from "../../../../components/TableSkeleton";
import $ from 'jquery';
import {ToastContainer, toast} from 'react-toastify';
import useMode from "../../../../lib/mode";

export default function ExpenseCategory({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const [data, setData] = useState();
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/expense/category`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.categories.data);
                setLinks(res.data.categories.links);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const search = async () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                setLoading(true);
                const name = $('.terms').val();
                axios.get(
                    `${process.env.API_URL}/expense/category?name=${name}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        setData(res.data.categories.data);
                        setLinks(res.data.categories.links);
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
                setData(res.data.categories.data);
                setLinks(res.data.categories.links);
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
            const response = await axios.post(`${process.env.API_URL}/expense/category/delete`, {
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
    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Expense Category List
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Expense Category List`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body dark' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row">
                            <div className="col-md-9">
                                <Link href={`/hr/expense/category/create`} className={`btn btn-success`}>
                                    <i className="fa-solid fa-plus"/> Add New Category
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control terms"
                                                   placeholder={`Search product`}
                                                   name="email" onKeyUp={search} onKeyDown={search}
                                                   onChange={search}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <table className={`table mt-4`}>
                            <thead>
                            <tr>
                                <th width={`10%`}>Sl</th>
                                <th width={`75%`}>Name</th>
                                <th width={`15%`}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data && data.length <= 0 && (
                                    <tr>
                                        <td colSpan={3} className={`text-center`}>No Category Found</td>
                                    </tr>
                                )
                            }
                            {data && !loading && (
                                data.map((el, index) => (
                                    <tr key={el.id} valign={`middle`} className={`row-id-${el.id}`}>
                                        <td>{index + 1}</td>
                                        <td>{el.name}</td>
                                        <td>
                                            <Link href={`/hr/expense/category/${el.id}`} className={`btn btn-warning btn-sm me-2`}>
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
                                <TableSkeleton tr={3} td={3}/>
                            )}
                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={3}>
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
