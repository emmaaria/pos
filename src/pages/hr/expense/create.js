import Layout from "../../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useEffect, useState} from "react";
import Loader from "../../../components/Loader";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Select from "react-select";
import DatePicker from "react-datepicker";

export default function CreateExpense({user}) {
    const [loader, setLoader] = useState(false);
    const [categories, setCategories] = useState([]);
    const [banks, setBanks] = useState([]);
    const [category, setCategory] = useState();
    const [account, setAccount] = useState();
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(new Date());
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const handleAmount = (e) => {
        const re = /^[0-9]*[.]?[0-9]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setAmount(e.target.value)
        }
    }
    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/expense/category?allData=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.categories && res.data.categories.length > 0) {
                        setCategories([]);
                        res.data.categories.map(el => {
                            setCategories(old => [...old, {value: el.id, label: el.name}])
                        })
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [setCategories]);
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        setLoader(true);
        const note = $('.note').val();
        const amount = $('.amount').val();
        const bankId = $('.bankId').val();
        if (account === '') {
            toast.dismiss();
            toast.error('Account is required', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            setLoader(false);
            return;
        }
        if (account === 'bank' && !bankId && bankId === '') {
            toast.dismiss();
            toast.error('You haven\'t select any Bank', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            setLoader(false);
            return;
        }
        if (amount === '') {
            toast.dismiss();
            toast.error('Amount is required', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            setLoader(false);
            return;
        }
        if (!category || category === '') {
            toast.dismiss();
            toast.error('Expense category is required', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            setLoader(false);
            return;
        }
        if (!date || date === '') {
            toast.dismiss();
            toast.error('Date is required', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            setLoader(false);
            return;
        }
        try {
            const res = await axios.post(`${process.env.API_URL}/expense/store`, {
                category,
                note,
                amount,
                account,
                date,
                bankId
            }, headers);
            if (res.data.status === true) {
                toast.dismiss();
                toast.success('Successfully Saved', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                $('form').trigger('reset');
                setLoader(false);
            } else {
                toast.dismiss();
                if (typeof res.data.errors === 'object') {
                    Object.values(res.data.errors).map(err => {
                        toast.error(err[0], {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: 'dark',
                        });
                    })
                    setLoader(false);
                } else {
                    toast.error('Something went wrong', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark',
                    });
                    setLoader(false);
                }
            }
        } catch (e) {
            toast.dismiss();
            toast.error(e.response.statusText, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            setLoader(false);
        }
    }

    const handleAccount = (event) => {
        if (event.target.value === 'bank') {
            setLoader(true);
            axios.get(
                `${process.env.API_URL}/bank?allData=true`,
                headers
            ).then(res => {
                if (res.data.status === true) {
                    setBanks(res.data.banks);
                    setLoader(false);
                } else {
                    setLoader(false);
                    toast.error('No bank account fround. Please add bank first.', {
                        position: "bottom-right",
                        autoClose: false,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark',
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        }
        setAccount(event.target.value)
    }
    return (
        <>
            <Head>
                <title>
                    Add New Expense
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Add New Expense`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3 row">
                                
                                <div className="col-md-4">
                                    <label htmlFor="category" className={`form-label`}>Expense Category</label>
                                    {
                                        categories && (
                                            <Select options={categories} isClearable={true} isSearchable={true} onChange={(value) => setCategory(value.value)} required/>
                                        ) || (
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                                <Skeleton width={`100%`} height={40}/>
                                            </SkeletonTheme>
                                        )
                                    }
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="note" className={`form-label`}>Account</label>
                                    <select className="form-select form-control account" required onChange={handleAccount} value={account}>
                                        <option value="">Choose Account</option>
                                        <option value="cash">Cash</option>
                                        <option value="bkash">Bkash</option>
                                        <option value="nagad">Nagad</option>
                                        <option value="bank">Bank</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="date" className={`form-label`}>Date</label>
                                    <DatePicker
                                        selected={date}
                                        onChange={(date) => setDate(date)}
                                        dateFormat='yyyy-MM-dd'
                                        className={`form-control date`}
                                    />
                                </div>
                            </div>
                            {
                                account && account === 'bank' && (
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            <select className={`form-control form-select bankId`} required>
                                                <option value="">Select Bank</option>
                                                {
                                                    banks.map(bank => (
                                                        <option key={bank.id} value={bank.id}>
                                                            {bank.name} ({bank.account_no})
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label htmlFor="amount" className={`form-label`}>Amount</label>
                                    <input type="text" className={`form-control amount`} id={`amount`} value={amount}
                                           onChange={handleAmount} required/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="note" className={`form-label`}>Expense Note</label>
                                    <input type="text" className={`form-control note`} id={`note`}/>
                                </div>
                            </div>
                            <button className={`btn btn-success`} type={`submit`}>Save</button>
                        </form>
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