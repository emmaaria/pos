import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import Loader from "../../components/Loader";
import {useState} from "react";

export default function CreateBank({user}) {
    const [loader, setLoader] = useState(false);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
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
        const balance = $('.balance').val();
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
            const res = await axios.post(`${process.env.API_URL}/bank/store`,{name,account_name,account_no, bank_type, balance, branch}, headers);
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
                $('form').trigger('reset');
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
    return (
        <>
            <Head>
                <title>
                    Add New Bank Account
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Add New Bank Account`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label className={`form-label`}>Bank Name</label>
                                <input type="text" className={`form-control bankName`} required/>
                            </div>
                            <div className="mb-3">
                                <label className={`form-label`}>Account Name</label>
                                <input type="text" className={`form-control bankAccountName`} required />
                            </div>
                            <div className="mb-3">
                                <label className={`form-label`}>Account Number</label>
                                <input type="text" className={`form-control accountNumber`} required />
                            </div>
                            <div className="mb-3">
                                <label className={`form-label`}>Branch</label>
                                <input type="text" className={`form-control branch`} required />
                            </div>
                            <div className="mb-3">
                                <label className={`form-label`}>Account Type</label>
                                <select className={`form-control bankType`} required>
                                    <option value="">Select Account Type</option>
                                    <option value="saving">Savings</option>
                                    <option value="loan">Loan</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className={`form-label`}>Balance</label>
                                <input type="text" className={`form-control balance`} />
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