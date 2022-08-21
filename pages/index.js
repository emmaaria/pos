import Head from 'next/head';
import styles from '../styles/Login.module.scss';
import $ from 'jquery';
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import {useRouter} from "next/router";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../lib/session";

export default function Login() {
    const router = useRouter();
    const handleForm = async e => {
        e.preventDefault();
        toast.loading('Loading', {
            position: "bottom-left",
            theme: 'dark'
        });
        const email = $('.email').val();
        const password = $('.password').val();
        const company_id = $('.company_id').val();
        if (email === ''){
            toast.dismiss();
            toast.error('Email is required', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            return;
        }
        if (password === ''){
            toast.dismiss();
            toast.error('Password is required', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            return;
        }
        axios
            .post(`${process.env.API_URL}/login`, {
                email: email,
                password: password,
                company_id
            })
            .then((response) => {
                if (response.data.status === true) {
                    axios
                        .post('/api/auth/login', {
                            id: response.data.user.id,
                            name: response.data.user.name,
                            email: response.data.user.email,
                            token: response.data.token,
                        })
                        .then(() => {
                            toast.dismiss();
                            toast.success('Successfully Logged In', {
                                position: "bottom-left",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: 'dark',
                            });
                            router.replace('/dashboard');
                        })
                        .catch((err) => {
                            toast.dismiss();
                            toast.error(err.response.data, {
                                position: "bottom-left",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                theme: 'dark',
                            });
                        });
                }else {
                    toast.dismiss();
                    toast.error(response.data.errors, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: 'dark',
                    });
                }
            })
            .catch((err) => {
                toast.dismiss();
                toast.error(err.response.data, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            });
    }
    return (
        <>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/fav.png"/>
            </Head>
            <ToastContainer/>
            <div className={styles.wrapper}>
                <div className={styles.formWrapper}>
                    <form onSubmit={handleForm}>
                        <h1 className={`text-center`}>
                            Login
                        </h1>
                        <div className="mb-3">
                            <input type="text" className={`form-control email`} placeholder={`Mobile Number`} required/>
                        </div>
                        <div className="mb-3">
                            <input type="text" className={`form-control company_id`} placeholder={`Customer Number`} required/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className={`form-control password`} placeholder={`Password`} required/>
                        </div>
                        <button className={`btn btn-success d-block w-100`} type={`submit`}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req}) {
        const session = req.session;
        if (session.user) {
            return {
                redirect: {
                    destination: `/dashboard`,
                },
            };
        }
        return {
            props: {},
        };
    },
    session
);