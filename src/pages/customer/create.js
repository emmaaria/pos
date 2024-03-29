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

export default function CreateCustomer({user}) {
    const [loader, setLoader] = useState(false);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const {mode} = useMode()
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
        const additionalInfo = $('.additionalInfo').val();
        const due = $('.due').val();
        if (name === '') {
            toast.dismiss();
            toast.error('Name is required', {
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
            const res = await axios.post(`${process.env.API_URL}/customer/store`, {
                name,
                mobile,
                address,
                due,
                additionalInfo
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
    return (
        <>
            <Head>
                <title>
                    Add New Customer
                </title>
            </Head>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <ToastContainer/>
            <Layout user={user} title={`Add New Customer`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="mb-3">
                            <label htmlFor="name" className={`form-label`}>Customer Name</label>
                            <input type="text" className={`form-control name`} id={`name`} required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className={`form-label`}>Customer Mobile Number</label>
                            <input type="text" className={`form-control mobile`} id={`mobile`}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className={`form-label`}>Customer Address</label>
                            <input type="text" className={`form-control address`} id={`address`}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="additionalInfo" className={`form-label`}>Customer Additional Data</label>
                            <textarea className={`form-control additionalInfo`} rows={8}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="due" className={`form-label`}>Previous Due</label>
                            <input type="text" className={`form-control due`} id={`due`}/>
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
