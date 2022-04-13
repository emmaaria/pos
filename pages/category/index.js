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
export default function Category({user}) {
    const [categories, setCategories] = useState();
    const [total, setTotal] = useState([]);
    const [page, setPage] = useState(0);
    async function getCategories() {
        try {
            const res = await axios.post(
                '/api/category', {page}
            );
            if (res.status === 200) {
                setCategories(res.data.categories);
                setTotal(res.data.totalPages);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getCategories();
    }, [setCategories]);
    const searchCategory = async () => {
        const terms = $('.terms').val();
        try {
            const res = await axios.post(
                '/api/category',
                {
                    name: terms,
                    page: 0
                }
            );
            if (res.status === 200) {
                setCategories(res.data.categories);
                setTotal(res.data.totalPages);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const paginate = async (page) => {
        try {
            const res = await axios.post(
                '/api/category',
                {
                    page: page
                }
            );
            if (res.status === 200) {
                setCategories(res.data.categories);
                setTotal(res.data.totalPages);
                setPage(page);
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
            const response = await axios.post('/api/category/delete', {
                id: id,
            });
            if (response.status === 201) {
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
                await getCategories();
            }
        } catch (err) {
            toast.dismiss();
            toast.error(err.response.data, {
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
                    Categories
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Category`}>
                <div className="content">
                    <div className="custom-card">
                        <div className="row">
                            <div className="col-md-9">
                                <Link href={`/category/create`}>
                                    <a className={`btn btn-success`}>
                                        <i className="fa-solid fa-plus"/> Add New Category
                                    </a>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control terms"
                                                   placeholder={`Search category`}
                                                   name="email" onKeyUp={searchCategory} onKeyDown={searchCategory}
                                                   onChange={searchCategory}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <table className={`table mt-4`}>
                            <thead>
                            <tr>
                                <th width={`10%`}>Sl</th>
                                <th width={`70%`}>Name</th>
                                <th width={`20%`}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                categories && categories.length <= 0 && (
                                    <tr>
                                        <td colSpan={3} className={`text-center`}>No Category Found</td>
                                    </tr>
                                )
                            }
                            {categories && (
                                categories.map((el, index) => (
                                    <tr key={el._id} valign={`middle`}>
                                        <td>{index + 1}</td>
                                        <td>{el.name}</td>
                                        <td>
                                            <Link href={`/category/${el._id}`}>
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
                                                        el._id
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
                                                total.map(el => (
                                                    <li className={`page-item ${page === el ? 'active' : ''}`} key={el}>
                                                        <a className={`page-link`}
                                                           onClick={() => paginate(el)}>{el + 1}</a>
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