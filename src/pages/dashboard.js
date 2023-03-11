import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../lib/session";
import Layout from "../components/layout/Layout";
import DashboardCard from "../components/DashboardCard";
import {useEffect, useState} from "react";
import axios from "axios";
import cash from "../../public/cash.png"
import bkash from "../../public/bkas.png"
import nagad from "../../public/nagad.png"
import bank from "../../public/bank.png"
import card from "../../public/card.png"

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
                            <div className="col-xxl-3 mb-4 col-lg-4">
                                <DashboardCard
                                    icon="fa-solid fa-bag-shopping"
                                    title="Total Product"
                                    value={data?.totalProduct}
                                    bgColor="#6c5ce7"
                                />
                            </div>
                            <div className="col-xxl-3 mb-4 col-lg-4">
                                <DashboardCard
                                    icon="fa-solid fa-user-group"
                                    title="Total Customer"
                                    value={data?.totalCustomer}
                                    bgColor="#e84393"
                                />
                            </div>
                            <div className="col-xxl-3 mb-4 col-lg-4">
                                <DashboardCard
                                    icon="fa-solid fa-users"
                                    title="Total Supplier"
                                    value={data?.totalSupplier}
                                    bgColor="#00b894"
                                />
                            </div>
                            <div className="col-xxl-3 mb-4 col-lg-4">
                                <DashboardCard
                                    icon="fa-solid fa-cart-plus"
                                    title="Total Purchase"
                                    value={data?.totalPurchase}
                                    bgColor="#192a56"
                                />
                            </div>
                            <div className="col-xxl-3 mb-4 col-lg-4">
                                <DashboardCard
                                    icon="fa-solid fa-shopping-cart"
                                    title="Total Invoice"
                                    value={data?.totalInvoice}
                                    bgColor="#fbc531"
                                />
                            </div>
                            <div className="col-xxl-3 mb-4 col-lg-4">
                                <DashboardCard
                                    icon="fa-solid fa-right-left"
                                    title="Total Return"
                                    value={data?.totalReturn}
                                    bgColor="#e84118"
                                />
                            </div>
                            <div className="col-xxl-3 mb-4 col-lg-4">
                                <DashboardCard
                                    icon="fa-solid fa-money-bill-trend-up"
                                    title="Purchase Amount"
                                    value={data ? `${data?.totalPurchaseAmount} Tk.` : ''}
                                    bgColor="#3c40c6"
                                />
                            </div>
                            <div className="col-xxl-3 mb-4 col-lg-4">
                                <DashboardCard
                                    icon="fa-solid fa-filter-circle-dollar"
                                    title="Sale Amount"
                                    value={data ? `${data?.totalSaleAmount} Tk.` : ''}
                                    bgColor="#0fbcf9"
                                />
                            </div>
                        </div>
                        <h4>Balance Overview</h4>
                        
                        <div className="row mt-4 row-cols-xxl-5 row-cols-md-3">
                            <div className="col mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-filter-circle-dollar"
                                    title="Cash"
                                    value={data ? `${data?.totalCash} Tk.` : ''}
                                    bgColor="#05c46b"
                                    imege={true}
                                    imageSrc={cash}
                                />
                            </div>
                            <div className="col mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-filter-circle-dollar"
                                    title="Bkash"
                                    value={data ? `${data?.totalBkash} Tk.` : ''}
                                    bgColor="#7d5fff"
                                    imege={true}
                                    imageSrc={bkash}
                                />
                            </div>
                            <div className="col mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-filter-circle-dollar"
                                    title="Nagad"
                                    value={data ? `${data?.totalNagad} Tk.` : ''}
                                    bgColor="#227093"
                                    imege={true}
                                    imageSrc={nagad}
                                />
                            </div>
                            <div className="col mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-filter-circle-dollar"
                                    title="Bank"
                                    value={data ? `${data?.totalBank} Tk.` : ''}
                                    bgColor="#cd6133"
                                    imege={true}
                                    imageSrc={bank}
                                />
                            </div>
                            <div className="col mb-4">
                                <DashboardCard
                                    icon="fa-solid fa-filter-circle-dollar"
                                    title="Card"
                                    value={data ? `${data?.totalCard} Tk.` : ''}
                                    bgColor="#40407a"
                                    imege={true}
                                    imageSrc={card}
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