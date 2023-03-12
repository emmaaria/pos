import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import Loader from "../../components/Loader";
import {useState} from "react";
import useMode from "../../lib/mode";

export default function CreateSupplier({user}) {
    const [loader, setLoader] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(0);
    const [balance, setBalance] = useState('');
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
        const name = $('.name').val();
        const mobile = $('.mobile').val();
        const address = $('.address').val();
        const balanceType = $('.balanceType').val();
        const balance = $('.balance').val();
        if (name === '') {
            toast.dismiss();
            toast.error('Name is required', {
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
            const res = await axios.post(`${process.env.API_URL}/supplier/store`, {
                name,
                mobile,
                address,
                balanceType,
                balance
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
                setBalance('');
                setHasPrevious(0)
                setLoader(false);
            } else {
                toast.dismiss();
                toast.success('Something went wrong', {
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
    const handlePrevious = (event) => {
        setHasPrevious(event.target.value);
    }
    const handleBalance = (e) => {
        const re = /^[0-9]*[.]?[0-9]*$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setBalance(e.target.value)
        }
    }
    const {mode} = useMode()
    return (
        <>
            <Head>
                <title>
                    Add New Supplier
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Add New Supplier`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className={`custom-card`}>
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label htmlFor="name" className={`form-label`}>Supplier Name</label>
                                <input type="text" className={`form-control name`} id={`name`} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className={`form-label`}>Supplier Mobile Number</label>
                                <input type="text" className={`form-control mobile`} id={`mobile`}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className={`form-label`}>Supplier Address</label>
                                <input type="text" className={`form-control address`} id={`address`}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="hasPrevious" className={`form-label`}>Has Previous Balance</label>
                                <select id="hasPrevious" className="form-control form-select" onChange={handlePrevious}>
                                    <option value="0">No</option>
                                    <option value="1">Yes</option>
                                </select>
                            </div>

                            {
                                hasPrevious == 1 && (
                                    <div className="mb-3">
                                        <label htmlFor="hasPrevious" className={`form-label`}>Balance Type</label>
                                        <select id="hasPrevious" className="form-control form-select balanceType">
                                            <option value="due">Due</option>
                                            <option value="advance">Advance</option>
                                        </select>
                                    </div>
                                )
                            }
                            {
                                hasPrevious == 1 && (
                                    <div className="mb-3">
                                        <label htmlFor="balance" className={`form-label`}>Previous Balance Amount</label>
                                        <input value={balance} onChange={handleBalance} type="text"
                                               className={`form-control balance`} id={`balance`}/>
                                    </div>
                                )
                            }
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