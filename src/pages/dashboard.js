import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../lib/session";
import Layout from "../components/layout/Layout";
import DashboardCard from "../components/DashboardCard";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Dashboard({user}) {
    const [data, setData] = useState();
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/dashboard`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.data);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/fav.png"/>
            </Head>
            <Layout user={user} title={`Dashboard`}>
                <div className="content">
                    <div className="custom-card">
                        <h4>Overview</h4>
                        <div className="row mt-4">
                            <div className="col-md-4 mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-bag-shopping"
                                    title="Total Product"
                                    value={data?.totalProduct}
                                    bgColor="#6c5ce7"
                                />
                            </div>
                            <div className="col-md-4 mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-user-group"
                                    title="Total Customer"
                                    value={data?.totalCustomer}
                                    bgColor="#e84393"
                                />
                            </div>
                            <div className="col-md-4 mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-users"
                                    title="Total Supplier"
                                    value={data?.totalSupplier}
                                    bgColor="#00b894"
                                />
                            </div>
                            <div className="col-md-4 mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-cart-plus"
                                    title="Total Purchase"
                                    value={data?.totalPurchase}
                                    bgColor="#192a56"
                                />
                            </div>
                            <div className="col-md-4 mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-shopping-cart"
                                    title="Total Invoice"
                                    value={data?.totalInvoice}
                                    bgColor="#fbc531"
                                />
                            </div>
                            <div className="col-md-4 mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-right-left"
                                    title="Total Return"
                                    value={data?.totalReturn}
                                    bgColor="#e84118"
                                />
                            </div>
                        </div>
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