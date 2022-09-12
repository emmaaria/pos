import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useEffect, useState} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Loader from "../../components/Loader";

export default function EditBank({user, id}) {
    const [bank, setBank] = useState();
    const [type, setType] = useState(null);
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/bank/${id}`,
            headers
        ).then(res => {
            console.log(res.data);
            if (res.data.status === true) {
                setBank(res.data.bank);
                setType(res.data.bank.bank_type);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        setLoader(true);
        const name = $('.bankName').val();
        const account_name = $('.bankAccountName').val();
        const account_no = $('.accountNumber').val();
        const bank_type = $('.bankType').val();
        const branch = $('.branch').val();
        if (name === ''){
            toast.dismiss();
            toast.error('Bank name is required', {
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
        if (account_name === ''){
            toast.dismiss();
            toast.error('Account name is required', {
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
        if (account_no === ''){
            toast.dismiss();
            toast.error('Bank account number is required', {
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
        if (branch === ''){
            toast.dismiss();
            toast.error('Bank branch is required', {
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
        if (bank_type === ''){
            toast.dismiss();
            toast.error('Please select bank account type', {
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
            const res = await axios.post(`${process.env.API_URL}/bank/update`,{name,account_name,account_no, bank_type, branch, id}, headers);
            if (res.data.status === true){
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
                setLoader(false);
            }else {
                toast.dismiss();
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
        }catch (e) {
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
    const handleTypeChange = (event) => {
        setType(event.target.value)
    }
    return (
        <>
            <Head>
                <title>
                    Edit Bank
                </title>
            </Head>
            <ToastContainer/>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <Layout user={user} title={`Edit Bank`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label className={`form-label`}>Bank Name</label>
                                {
                                    bank && loading === false && (
                                        <div className="mb-3">
                                            <input type="text" className={`form-control bankName`} defaultValue={bank.name} required/>
                                        </div>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className={`form-label`}>Account Name</label>
                                {
                                    bank && loading === false && (
                                        <div className="mb-3">
                                            <input type="text" className={`form-control bankAccountName`} required defaultValue={bank.account_name} />
                                        </div>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className={`form-label`}>Account Number</label>
                                {
                                    bank && loading === false && (
                                        <div className="mb-3">
                                            <input type="text" className={`form-control accountNumber`} required defaultValue={bank.account_no} />
                                        </div>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className={`form-label`}>Branch</label>
                                {
                                    bank && loading === false && (
                                        <div className="mb-3">
                                            <input type="text" className={`form-control branch`} required defaultValue={bank.branch} />
                                        </div>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className={`form-label`}>Account Type</label>
                                {
                                    bank && loading === false && (
                                        <div className="mb-3">
                                            <select className={`form-control bankType`} required value={type} onChange={handleTypeChange}>
                                                <option value="">Select Account Type</option>
                                                <option value="saving">Savings</option>
                                                <option value="loan">Loan</option>
                                            </select>
                                        </div>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>
                            <button className={`btn btn-success`} type={`submit`}>Update</button>
                        </form>
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
                    destination: `/`,
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