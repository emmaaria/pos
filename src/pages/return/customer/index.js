import Layout from "../../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../../lib/session";
import {useEffect, useState} from "react";
import axios from "axios";
import TableSkeleton from "../../../components/TableSkeleton";
import $ from 'jquery';
import {ToastContainer, toast} from 'react-toastify';
import useMode from "../../../lib/mode";
import Loader from "../../../components/Loader";

export default function CustomerReturnList({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const [data, setData] = useState();
    const [showReceipt, setShowReceipt] = useState(false);
    const [returnData, setReturnData] = useState();
    const [returnItems, setReturnItems] = useState();
    const [returnLoading, setReturnLoading] = useState(false);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/sale/return`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.returns.data);
                setLinks(res.data.returns.links);
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
                    `${process.env.API_URL}/sale/return?name=${name}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        setData(res.data.returns.data);
                        setLinks(res.data.returns.links);
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
                setData(res.data.returns.data);
                setLinks(res.data.returns.links);
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
            const response = await axios.post(`${process.env.API_URL}/sale/return/delete`, {
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
    const getReturn = async (id) => {
        setReturnLoading(true)
        try {
            const response = await axios.get(`${process.env.API_URL}/sale/return/${id}`, headers);
            if (response.data.status === true) {
                setReturnData(response.data.return)
                setReturnItems(response.data.returnItems)
                setShowReceipt(true)
                setReturnLoading(false)
                console.log(response.data.return)
                console.log(response.data.returnItems)
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Head>
                <title>
                    Return List
                </title>
            </Head>
            {
                returnLoading && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Return List`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body dark' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-3">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control terms"
                                                   placeholder={`Search Return`}
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
                                <th width={`5%`}>Sl</th>
                                <th width={`10%`}>Return ID</th>
                                <th width={`20%`}>Customer Name</th>
                                <th width={`10%`}>Date</th>
                                <th width={`15%`}>Return Amount</th>
                                <th width={`25%`}>Note</th>
                                <th width={`15%`}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data && data.length <= 0 && (
                                    <tr>
                                        <td colSpan={7} className={`text-center`}>No Return Found</td>
                                    </tr>
                                )
                            }
                            {data && !loading && (
                                data.map((el, index) => (
                                    <tr key={el.return_id} valign={`middle`} className={`row-id-${el.return_id}`}>
                                        <td>{index + 1}</td>
                                        <td>{el.return_id}</td>
                                        <td>{el.name}</td>
                                        <td>{el.date}</td>
                                        <td>{el.return_amount} Tk.</td>
                                        <td>{el.note}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary me-2" onClick={() => {
                                                getReturn(el.return_id)
                                            }}>
                                                <i className="fa-solid fa-eye"/>
                                            </button>
                                            <a className={`btn btn-danger btn-sm`} onClick={(e) => {
                                                e.preventDefault();
                                                const result =
                                                    confirm(
                                                        'Want to delete?'
                                                    );
                                                if (result) {
                                                    deleteHandler(
                                                        el.return_id
                                                    );
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
                    {
                        showReceipt && (
                            <div className="return-popup">
                                <div className="custom-card card">
                                    <div className="card-header text-white bold px-0 pb-0">
                                        <h5>
                                            Return Details
                                        </h5>
                                    </div>
                                    <hr/>
                                    <div className="card-body p-0">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <p className="mb-1">Customer Name: {returnData?.customerName}</p>
                                                <p className="mb-1">Date: {returnData?.date}</p>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <table className="table">
                                                    <thead>
                                                    <tr>
                                                        <th>
                                                            Product
                                                        </th>
                                                        <th>
                                                            Quantity
                                                        </th>
                                                        <th>
                                                            Subtotal
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        returnItems?.map((item) => (
                                                            <tr key={item.id}>
                                                                <td>
                                                                    {item?.name}
                                                                </td>
                                                                <td>
                                                                    {item?.quantity}
                                                                </td>
                                                                <td>
                                                                    {item?.total} Tk.
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                                    <tfoot>
                                                    <tr>
                                                        <td colSpan={2} className="text-end bold">
                                                            Total
                                                        </td>
                                                        <td>
                                                            {returnData?.return_amount} Tk.
                                                        </td>
                                                    </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <button className="btn btn-warning" onClick={() => {
                                                    setShowReceipt(false);
                                                    setReturnItems({})
                                                    setReturnData({})
                                                }}>
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }

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
