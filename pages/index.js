import Head from 'next/head';
import styles from '../styles/Login.module.css';
import $ from 'jquery';
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import {useRouter} from "next/router";
import { withIronSessionSsr } from 'iron-session/next';
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
        try {
            const response = await axios.post('/api/auth/login', {
                email,password
            });
            console.log(response)
            if (response.status === 201) {
                toast.dismiss();
                toast.success(response.data, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                await router.replace('/dashboard');
            }
        } catch (err) {
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
        }
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
                            <input type="email" className={`form-control email`} placeholder={`Email Address`}/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className={`form-control password`} placeholder={`Password`}/>
                        </div>
                        <button className={`btn btn-success d-block w-100`} type={`submit`}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
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