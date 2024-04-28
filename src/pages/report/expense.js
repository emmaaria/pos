import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Loader from "../../components/Loader";
import useMode from "../../lib/mode";
import Select from "react-select";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {useReactToPrint} from "react-to-print";
import {toast, ToastContainer} from "react-toastify";

export default function ExpenseReport({user}) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const {mode} = useMode()
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [data, setData] = useState();
    const [expenseCategories, setExpenseCategories] = useState();
    const [expenseCategory, setExpenseCategory] = useState();
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/expense/category?allData=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.categories && res.data.categories.length > 0) {
                        setExpenseCategories(res.data.categories);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [setExpenseCategories]);

    const search = (e) => {
        e.preventDefault;
        if (!startDate || !endDate) {
            toast.dismiss();
            toast.error('Please select a start and end date', {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            return
        }
        setLoading(true);
        axios.post(
            `${process.env.API_URL}/report/expense`, {
                expenseCategory: expenseCategory,
                startDate: startDate?.toLocaleDateString("sv-SE"),
                endDate: endDate?.toLocaleDateString("sv-SE")
            },
            headers
        ).then(res => {
            if (res.data.status === true) {
                setData(res.data.data);
                setTotalAmount(res.data.totalAmount);
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
                    Expense Report
                </title>
            </Head>
            {
                loading && loading === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Expense Report`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row mb-4">
                            <div className="row">
                                <div className="col">
                                    <label className="form-label">
                                        Expense Category
                                    </label>
                                    {
                                        expenseCategories && (
                                            <Select
                                                options={expenseCategories}
                                                placeholder="Select Category"
                                                isClearable={true}
                                                isSearchable={true}
                                                getOptionValue={(item) => item.id}
                                                getOptionLabel={(item) => item.name}
                                                onChange={(value) => {
                                                    setExpenseCategory(value?.id)
                                                }}/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col">
                                    <label className="form-label">
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
                                    <label className="form-label">
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
                                    {
                                        data && data.length > 0 && (
                                            <button className="btn btn-warning ms-3" type={"button"} onClick={handlePrint}>
                                                Print
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            data && (
                                <>
                                    <hr/>
                                    <table className={`table mt-4`} ref={componentRef}>
                                        <thead>
                                        <tr>
                                            <th width={`10%`}>Sl</th>
                                            <th>Expense Category</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data && data.length <= 0 && (
                                                <tr>
                                                    <td colSpan={3} className={`text-center`}>
                                                        No Expense Found
                                                    </td>
                                                </tr>
                                            )
                                        }
                                        {
                                            data.map((el, index) => (
                                                <tr key={index} valign={`middle`}>
                                                    <td>{index + 1}</td>
                                                    <td>{el.category_name}</td>
                                                    <td>{el.total} Tk.</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <td colSpan={2} className="text-end">
                                                <strong>Total</strong>
                                            </td>
                                            <td>
                                                {totalAmount.toFixed(2)}
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
