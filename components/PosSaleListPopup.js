import axios from "axios";
import {useEffect, useState} from "react";
import $ from "jquery";
import {toast} from "react-toastify";
import Link from "next/link";
import TableSkeleton from "./TableSkeleton";
import styles from './PosSaleListPopup.module.css'

export default function PosSaleListPopup({token, setShowSales}){
    const [sales, setSales] = useState();
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);
    const headers = {
        headers: {Authorization: `Bearer ${token}`},
    };
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/today-invoices`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setSales(res.data.invoices.data);
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
                    `${process.env.API_URL}/today-invoices?keyword=${name}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        setSales(res.data.invoices.data);
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
        setLoading(true);
        try {
            const res = await axios.get(
                url,
                headers
            );
            if (res.data.status === true) {
                setSales(res.data.invoices.data);
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
        <div className={styles.saleListPopup}>
            <div className={styles.saleListPopupInner}>
                <div className={styles.close}>
                    <span className='fa-solid fa-close' onClick={() => setShowSales(false)}></span>
                </div>
                <div className="custom-card">
                    <div className="row">
                        <div className="col-md-9">
                            <h3>Today Invoices</h3>
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
                            <th width={`5%`}>Sl</th>
                            <th width={`10%`}>Invoice ID</th>
                            <th width={`15%`}>Date</th>
                            <th width={`20%`}>Customer Name</th>
                            <th width={`15%`}>Amount</th>
                            <th width={`15%`}>Note</th>
                            <th width={`20%`}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            sales && sales.length <= 0 && (
                                <tr>
                                    <td colSpan={7} className={`text-center`}>No Invoice Found</td>
                                </tr>
                            )
                        }
                        {sales && !loading &&(
                            sales.map((el, index) => (
                                <tr key={el.invoice_id} valign={`middle`} className={`row-id-${el.invoice_id}`}>
                                    <td>{index + 1}</td>
                                    <td className={`text-uppercase`}>{el.invoice_id}</td>
                                    <td>{el.date}</td>
                                    <td>{el.customer_name}</td>
                                    <td>{el.total - el.discountAmount} Tk.</td>
                                    <td>{el.comment}</td>
                                    <td>
                                        <Link href={`/sale/view/${el.invoice_id}`}>
                                            <a className={`btn btn-success btn-sm me-2`}>
                                                <i className="fa-solid fa-eye"/>
                                            </a>
                                        </Link>
                                        <Link href={`/sale/${el.invoice_id}`}>
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
        </div>
    )
}