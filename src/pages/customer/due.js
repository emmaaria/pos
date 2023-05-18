import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {useEffect, useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import Loader from "../../components/Loader";
import Select from "react-select";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {toast, ToastContainer} from "react-toastify";
import $ from "jquery";
import useMode from "../../lib/mode";

export default function AddCustomerDue({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState();
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState();
    const [loader, setLoader] = useState(false);
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
                    `${process.env.API_URL}/customer?allData=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.customers && res.data.customers.length > 0) {
                        setCustomers([]);
                        res.data.customers.map(el => {
                            setCustomers(old => [...old, {
                                value: el.id,
                                label: `${el.name} (${el.address ? el.address : ''})`
                            }])
                        })
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [setCustomers]);

    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        setLoader(true);
        const note = $('.note').val();
        const paymentDate = $('.date').val();
        if (!amount || amount === '') {
            toast.dismiss();
            toast.error('Amount is required', {
                position: "bottom-right",
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
        if (!customer || customer === '') {
            toast.dismiss();
            toast.error('Please select customer', {
                position: "bottom-right",
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
                position: "bottom-right",
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
            const res = await axios.post(`${process.env.API_URL}/customer/due/store`, {
                customer,
                note,
                amount,
                date: paymentDate,
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
                setAmount('');
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

    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Add Manual Customer Due
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Add Manual Customer Due`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="mb-3 row">
                            <div className="col-md-4">
                                <label className={`form-label`}>Customer</label>
                                {
                                    customers && (
                                        <Select options={customers} isClearable={true} isSearchable={true}
                                                onChange={(value) => setCustomer(value?.value)}/>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
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
                            <div className="col-md-4">
                                <label htmlFor="amount" className={`form-label`}>Amount</label>
                                <input type="text" className={`form-control`} id={`amount`} value={amount}
                                       onChange={handleAmount} onKeyUp={handleAmount} onKeyDown={handleAmount}/>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="note" className={`form-label`}>Due Note</label>
                                <input type="text" className={`form-control note`} id={`note`}/>
                            </div>
                        </div>
                        <button className={`btn btn-success`} onClick={handleForm}>Save</button>
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
