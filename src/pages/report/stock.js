import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {useEffect, useState} from "react";
import axios from "axios";
import TableSkeleton from "../../components/TableSkeleton";
import $ from "jquery";
import useMode from "../../lib/mode";

export default function Stock({user}) {
    const [products, setProducts] = useState();
    const [totalPurchase, setTotalPurchase] = useState(0);
    const [totalSale, setTotalSale] = useState(0);
    const [stock, setStock] = useState(0);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };

    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/stock`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setProducts(res.data.products.data);
                setTotalPurchase(res.data.totalPurchase);
                setTotalSale(res.data.totalSale);
                setStock(res.data.stock);
                setLinks(res.data.products.links);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    const search = async (e) => {
        e.preventDefault()
        setLoading(true);
        const name = $('.terms').val();
        axios.get(
            `${process.env.API_URL}/stock?name=${name}`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setProducts(res.data.products.data);
                setLinks(res.data.products.links);
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
                setProducts(res.data.products.data);
                setLinks(res.data.products.links);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Stock
                </title>
            </Head>
            <Layout user={user} title={`Stock`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-3">
                                <form onSubmit={search}>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control terms"
                                                   placeholder={`Search`}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <table className={`table mt-4`}>
                            <thead>
                            <tr>
                                <th>Sl</th>
                                <th>Product Name</th>
                                <th>Total Purchase Quantity</th>
                                <th>Total Sale Quantity</th>
                                <th>Stock</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products && products.length <= 0 && (
                                    <tr>
                                        <td colSpan={5} className={`text-center`}>No Product Found</td>
                                    </tr>
                                )
                            }
                            {products && !loading && (
                                products.map((el, index) => (
                                    <tr key={el.product_id} valign={`middle`}>
                                        <td>{index + 1}</td>
                                        <td>{el.name}</td>
                                        <td>{el.purchase ? el.purchase : 0}</td>
                                        <td>
                                            {el.sale ? el.sale - el.return : 0}
                                        </td>
                                        <td>
                                            {el.purchase - (el.sale - el.return)}
                                        </td>
                                    </tr>
                                ))
                            ) || (
                                <TableSkeleton tr={3} td={5}/>
                            )}

                            </tbody>
                            <tfoot>
                            <tr>
                                <td colSpan={2} className={`text-end`}>
                                    <strong>
                                        Total
                                    </strong>
                                </td>
                                <td>
                                    <strong>
                                        {totalPurchase}
                                    </strong>
                                </td>
                                <td>
                                    <strong>
                                        {totalSale}
                                    </strong>
                                </td>
                                <td>
                                    <strong>
                                        {stock}
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5}>
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