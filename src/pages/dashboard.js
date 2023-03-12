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
import {CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis, BarChart, Bar, ResponsiveContainer} from "recharts";
import useMode from "../lib/mode";

export default function Dashboard({user}) {
    const [data, setData] = useState();
    const {mode} = useMode()
    const [salesChart, setSalesChart] = useState([]);
    const [profitChart, setProfitChart] = useState([]);
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
                if (res.data.data.salesChart && res.data.data.salesChart.length > 0) {
                    setSalesChart(res.data.data.salesChart)
                }
                if (res.data.data.profitChart && res.data.data.profitChart.length > 0) {
                    setProfitChart([]);
                    res.data.data.profitChart.map(month => {
                        setProfitChart(old => [...old, {month: month.month, profit: parseFloat(month.profit)}])
                    })
                }
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
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <h4 className={mode === 'dark' ? 'dark-mode-color' : ''}>Overview</h4>
                    <div className="row mt-4">
                        <div className="col-xxl-3 mb-4 col-lg-4">
                            <DashboardCard
                                icon="fa-solid fa-bag-shopping"
                                title="Total Product"
                                value={data ? `${data?.totalProduct}` : ''}
                                bgColor="#6c5ce7"
                            />
                        </div>
                        <div className="col-xxl-3 mb-4 col-lg-4">
                            <DashboardCard
                                icon="fa-solid fa-user-group"
                                title="Total Customer"
                                value={data ? `${data?.totalCustomer}` : ''}
                                bgColor="#e84393"
                            />
                        </div>
                        <div className="col-xxl-3 mb-4 col-lg-4">
                            <DashboardCard
                                icon="fa-solid fa-users"
                                title="Total Supplier"
                                value={data ? `${data?.totalSupplier}` : ''}
                                bgColor="#00b894"
                            />
                        </div>
                        <div className="col-xxl-3 mb-4 col-lg-4">
                            <DashboardCard
                                icon="fa-solid fa-cart-plus"
                                title="Total Purchase"
                                value={data ? `${data?.totalPurchase}` : ''}
                                bgColor="#192a56"
                            />
                        </div>
                        <div className="col-xxl-3 mb-4 col-lg-4">
                            <DashboardCard
                                icon="fa-solid fa-shopping-cart"
                                title="Total Invoice"
                                value={data ? `${data?.totalInvoice}` : ''}
                                bgColor="#fbc531"
                            />
                        </div>
                        <div className="col-xxl-3 mb-4 col-lg-4">
                            <DashboardCard
                                icon="fa-solid fa-right-left"
                                title="Total Return"
                                value={data ? `${data?.totalReturn}` : ''}
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
                    <h4 className={mode === 'dark' ? 'dark-mode-color' : ''}>Charts</h4>
                    <div className="row mt-4">
                        <div className="col-md-6 mb-4">
                            <div className={`chart-card ${mode === 'dark' ? 'dark-mode-bg' : ''}`}>
                                <h5 className={mode === 'dark' ? 'dark-mode-color' : ''}>Sales</h5>
                                <div className="mt-4">
                                    {
                                        data && (
                                            <ResponsiveContainer height={300} width="100%">
                                                <LineChart width={500} height={300} data={salesChart}>
                                                    <XAxis dataKey="month"/>
                                                    <YAxis/>
                                                    <Tooltip/>
                                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                                    <Line type="monotone" dataKey="sale" stroke="rgb(249, 58, 11)"
                                                          strokeWidth={2} activeDot={{r: 8}}/>
                                                </LineChart>
                                            </ResponsiveContainer>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className={`chart-card ${mode === 'dark' ? 'dark-mode-bg' : ''}`}>
                                <h5 className={mode === 'dark' ? 'dark-mode-color' : ''}>Profit</h5>
                                <div className="mt-4">
                                    {
                                        data && (
                                            <ResponsiveContainer height={300} width="100%">
                                                <BarChart width={700} height={300} data={profitChart}>
                                                    <XAxis dataKey="month"/>
                                                    <YAxis/>
                                                    <Tooltip/>
                                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                                    <Bar dataKey="profit" fill="rgb(249, 58, 11)"/>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <h4 className={mode === 'dark' ? 'dark-mode-color' : ''}>Balance Overview</h4>
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
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <h4 className={mode === 'dark' ? 'dark-mode-color' : ''}>Today's Overview</h4>
                    <div className="row mt-4 row-cols-xxl-4 row-cols-md-3">
                        <div className="col mb-4">
                            <DashboardCard
                                icon="fa-solid fa-shopping-cart"
                                title="Invoice"
                                value={data ? `${data?.todayTotalInvoice}` : ''}
                                bgColor="#16a085"
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                icon="fa-solid fa-filter-circle-dollar"
                                title="Sale Amount"
                                value={data ? `${data?.todayTotalSaleAmount} Tk.` : ''}
                                bgColor="#8e44ad"
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                icon="fa-solid fa-cart-plus"
                                title="Purchase"
                                value={data ? `${data?.todayTotalPurchase}` : ''}
                                bgColor="#e67e22"
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                icon="fa-solid fa-money-bill-trend-up"
                                title="Purchase Amount"
                                value={data ? `${data?.todayTotalPurchaseAmount} Tk.` : ''}
                                bgColor="#c0392b"
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                icon="fa-solid fa-right-left"
                                title="Returns"
                                value={data ? `${data?.todayTotalReturn}` : ''}
                                bgColor="#2c3e50"
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                icon="fa-solid fa-money-bill-transfer"
                                title="Return Amount"
                                value={data ? `${data?.todayTotalReturnAmount} Tk.` : ''}
                                bgColor="#ff3838"
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                title="Cash"
                                value={data ? `${data?.todayTotalCash} Tk.` : ''}
                                bgColor="#4C4B16"
                                imege={true}
                                imageSrc={cash}
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                title="Bkash"
                                value={data ? `${data?.todayTotalBkash} Tk.` : ''}
                                bgColor="#2C3333"
                                imege={true}
                                imageSrc={bkash}
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                title="Nagad"
                                value={data ? `${data?.todayTotalNagad} Tk.` : ''}
                                bgColor="#0E8388"
                                imege={true}
                                imageSrc={nagad}
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                title="Bank"
                                value={data ? `${data?.todayTotalBank} Tk.` : ''}
                                bgColor="#3E54AC"
                                imege={true}
                                imageSrc={bank}
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                title="Card"
                                value={data ? `${data?.todayTotalCard} Tk.` : ''}
                                bgColor="#81C6E8"
                                imege={true}
                                imageSrc={card}
                            />
                        </div>
                        <div className="col mb-4">
                            <DashboardCard
                                title="Profit"
                                icon="fa-solid fa-piggy-bank"
                                value={data ? `${parseFloat(data?.todayTotalProfit).toFixed(2)} Tk.` : ''}
                                bgColor="#A84448"
                            />
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