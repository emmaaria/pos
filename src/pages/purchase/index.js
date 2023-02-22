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

export default function Purchase({user}) {
    const [purchases, setPurchases] = useState();
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };

    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/purchase`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setPurchases(res.data.purchases.data);
                setLinks(res.data.purchases.links);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    const searchPurchase = async () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                setLoading(true);
                const name = $('.terms').val();
                axios.get(
                    `${process.env.API_URL}/purchase?name=${name}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        setPurchases(res.data.purchases.data);
                        setLinks(res.data.purchases.links);
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
                setPurchases(res.data.purchases.data);
                setLinks(res.data.purchases.links);
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
            const response = await axios.post(`${process.env.API_URL}/purchase/delete`, {
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
                    Purchase
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Purchase`}>
                <div className="content">
                    <div className="custom-card">
                        <div className="row">
                            <div className="col-md-9">
                                <Link href={`/purchase/create`}>
                                    <a className={`btn btn-success`}>
                                        <i className="fa-solid fa-plus"/> Add New Purchase
                                    </a>
                                </Link>
                            </div>
                            <div className="col-md-3">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control terms"
                                                   placeholder={`Search`}
                                                   name="email" onKeyUp={searchPurchase} onKeyDown={searchPurchase}
                                                   onChange={searchPurchase}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <table className={`table mt-4`}>
                            <thead>
                            <tr>
                                <th width={`5%`}>Sl</th>
                                <th width={`15%`}>Purchase ID</th>
                                <th width={`15%`}>Date</th>
                                <th width={`15%`}>Supplier Name</th>
                                <th width={`15%`}>Amount</th>
                                <th width={`15%`}>Note</th>
                                <th width={`20%`}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                purchases && purchases.length <= 0 && (
                                    <tr>
                                        <td colSpan={7} className={`text-center`}>No Purchase Found</td>
                                    </tr>
                                )
                            }
                            {purchases && !loading &&(
                                purchases.map((el, index) => (
                                    <tr key={el.id} valign={`middle`} className={`row-id-${el.id}`}>
                                        <td>{index + 1}</td>
                                        <td className={`text-uppercase`}>{el.purchase_id}</td>
                                        <td>{el.date}</td>
                                        <td>{el.supplier_name}</td>
                                        <td>{el.amount} Tk.</td>
                                        <td>{el.comment}</td>
                                        <td>
                                            <Link href={`/purchase/barcode/${el.id}`}>
                                                <a className={`btn btn-success btn-sm me-2`}>
                                                    <i className="fa-solid fa-barcode"/>
                                                </a>
                                            </Link>
                                            <Link href={`/purchase/view/${el.id}`}>
                                                <a className={`btn btn-success btn-sm me-2`}>
                                                    <i className="fa-solid fa-eye"/>
                                                </a>
                                            </Link>
                                            <Link href={`/purchase/${el.id}`}>
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