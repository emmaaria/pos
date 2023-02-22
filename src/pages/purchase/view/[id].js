import Layout from "../../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../../lib/session";
import {useState, useEffect} from "react";
import axios from "axios";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import TableSkeleton from "../../../components/TableSkeleton";

export default function Details({user, id}) {
    const [purchase, setPurchase] = useState();
    const [loading, setLoading] = useState(true);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/purchase/${id}`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setPurchase(res.data.purchase);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <>
            <Head>
                <title>
                    Purchase Details
                </title>
            </Head>
            <Layout user={user} title={`Purchase Details`}>
                <div className="content">
                    <div className="custom-card">
                        <p>
                            <strong>Supplier Name</strong> : {
                            purchase && loading === false && (
                                purchase.purchaseData.supplier_name
                            ) || (
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                    <Skeleton width={`100%`} height={20}/>
                                </SkeletonTheme>
                            )
                        }
                        </p>
                        <p>
                            <strong>Purchase ID</strong> : {
                            purchase && loading === false && (
                                purchase.purchaseData.purchase_id
                            ) || (
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                    <Skeleton width={`100%`} height={20}/>
                                </SkeletonTheme>
                            )
                        }
                        </p>
                        <p>
                            <strong>Purchase Date</strong> : {
                            purchase && loading === false && (
                                purchase.purchaseData.date
                            ) || (
                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                    <Skeleton width={`100%`} height={20}/>
                                </SkeletonTheme>
                            )
                        }
                        </p>
                        <hr/>
                        <table className={`table table-bordered table-hover`}>
                            <thead>
                            <tr>
                                <th width={`5%`}>
                                    SL
                                </th>
                                <th width={`45%`}>
                                    Product Name
                                </th>
                                <th width={`15%`}>
                                    Purchase Price
                                </th>
                                <th width={`15%`}>
                                    Quantity
                                </th>
                                <th className={`text-end`} width={`20%`}>
                                    Subtotal
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                purchase && purchase.purchaseItems && !loading && (
                                    purchase.purchaseItems.map((el, index) => (
                                        <tr key={`product-${el.id}`}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {el.name}
                                            </td>
                                            <td>{el.purchase_price} Tk.</td>
                                            <td>{el.quantity}</td>
                                            <td className={`text-end`}>{el.total} Tk.</td>
                                        </tr>
                                    ))
                                ) || (
                                    <TableSkeleton tr={5} td={5}/>
                                )
                            }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={4} className={`text-end`}>Total</td>
                                    <td className={`text-end`}>
                                        {
                                            purchase && loading === false && (
                                                purchase.purchaseData.amount+ ' Tk.'
                                            ) || (
                                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                    <Skeleton width={`100%`} height={20}/>
                                                </SkeletonTheme>
                                            )
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={4} className={`text-end`}>Paid</td>
                                    <td className={`text-end`}>
                                        {
                                            purchase && loading === false && (
                                                purchase.purchaseData.paid ? purchase.purchaseData.paid : 0 + ' Tk.'
                                            ) || (
                                                <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                    <Skeleton width={`100%`} height={20}/>
                                                </SkeletonTheme>
                                            )
                                        }
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
    async function getServerSideProps({req, params}) {
        const session = req.session;
        const id = params.id;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/admin`,
                },
            };
        }
        return {
            props: {
                user: session.user,
                id,
            },
        };
    },
    session
);