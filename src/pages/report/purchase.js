import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {useEffect, useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Loader from "../../components/Loader";
import useMode from "../../lib/mode";
import Select from "react-select";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";

export default function PurchaseReport({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const {mode} = useMode()
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [data, setData] = useState();
    const [total, setTotal] = useState();
    const [loading, setLoading] = useState(false);
    const [suppliers, setSuppliers] = useState();
    const [supplier, setSupplier] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/supplier?allData=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.suppliers && res.data.suppliers.length > 0) {
                        setSuppliers(res.data.suppliers);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [setSuppliers]);

    const search = async (e) => {
        e.preventDefault;
        setLoading(true);
        axios.post(
            `${process.env.API_URL}/report/purchase`, {
                startDate: startDate.toLocaleDateString("sv-SE"),
                endDate: endDate.toLocaleDateString("sv-SE"),
                supplier: supplier,
            },
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.data);
                setTotal(0);
                res.data.data?.map(el => {
                    setTotal(old => old + parseFloat(el.amount))
                })
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <>
            <Head>
                <title>
                    Purchase Report
                </title>
            </Head>
            {
                loading && loading === true && (
                    <Loader/>
                )
            }
            <Layout user={user} title={`Purchase Report`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body dark' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row mb-4">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Supplier
                                    </label>
                                    {
                                        suppliers && (
                                            <Select
                                                options={suppliers}
                                                placeholder="Select Supplier"
                                                isClearable={true}
                                                isSearchable={true}
                                                getOptionValue={(item) => item.id}
                                                getOptionLabel={(item) => item.name}
                                                onChange={(value) => {
                                                    setSupplier(value?.id)
                                                }}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col">
                                    <label className="form-label d-block">
                                        Start Date
                                    </label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        className={`form-control startDate`}
                                    />
                                </div>
                                <div className="col">
                                    <label className="form-label d-block">
                                        End Date
                                    </label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        className={`form-control endDate`}
                                    />
                                </div>
                                <div className="col mt-1-8">
                                    <button className="btn btn-success" type={"button"} onClick={search}>
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            data && (
                                <>
                                    <hr/>
                                    <table className={`table mt-4`}>
                                        <thead>
                                        <tr>
                                            <th width={`10%`}>Sl</th>
                                            <th>Purchase No.</th>
                                            <th>Supplier Name</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data && data.length <= 0 && (
                                                <tr>
                                                    <td colSpan={4} className={`text-center`}>No Sales Found</td>
                                                </tr>
                                            )
                                        }
                                        {
                                            data.map((el, index) => (
                                                <tr key={el.purchase_id} valign={`middle`}>
                                                <td>{index + 1}</td>
                                                    <td>{el.purchase_id}</td>
                                                    <td>{el.supplier_name}</td>
                                                    <td>{el.amount} Tk.</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td colSpan={3} className="text-end">
                                                <strong>Total</strong>
                                            </td>
                                            <td>
                                                {total} Tk.
                                            </td>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </>
                            )
                        }
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
