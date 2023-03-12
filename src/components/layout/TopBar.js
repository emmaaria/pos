import styles from './TopBar.module.css';
import Link from "next/link";
import Image from "next/image";
import CustomImage from "../CustomImage";
import $ from 'jquery';
import axios from "axios";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {useState, useEffect} from "react";
import useMode from "../../lib/mode";

export default function TopBar({title, handle}) {
    const [time, setTime] = useState('');
    const {mode, changeMode} = useMode()
    const clock = () => {
        const today = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        setTime(today)
        setTimeout(clock, 3000)
    }
    useEffect(() => {
        clock()
    }, [])
    const router = useRouter();
    const showUserMenu = (e) => {
        e.preventDefault();
        $('.topMenu').slideToggle();
    };
    const showSidebar = (e) => {
        e.preventDefault();
        $('.sidebar').toggleClass('sidebar-show');
    };
    const logout = (e) => {
        e.preventDefault();
        axios
            .post('/api/auth/logout', {})
            .then(() => {
                toast.success('Successfully Logged out', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                router.replace('/');
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
        <div className={`${styles.topBar} ${mode === 'dark' ? 'dark-mode-bg' : ''}`}>
            <div className={styles.sidebarToggler}>
                <Link href={`#`} onClick={showSidebar}>
                    <i className={`fa-solid fa-bars-staggered ${mode === 'dark' ? 'dark-mode-color' : 'text-dark'}`}></i>
                </Link>
            </div>
            <h4 className={`${styles.pageTitle} ${mode === 'dark' ? 'dark-mode-color' : ''}`}>
                {title}
            </h4>
            <ul className={styles.rightSide}>
                <li>
                    <div className={styles.clock}>
                        {time}
                    </div>
                </li>
                <li>
                    <button className={styles.fullScreen} onClick={handle.enter}>
                        <Image className={mode === 'dark' ? 'dark-mode-image' : ''} src={`/full-screen.svg`} width={25} height={25} alt="Full Screen"/>
                    </button>
                </li>
                <li>
                    <Link href={`/sale/create`} className={`btn btn-success`}>
                        POS
                    </Link>
                </li>
                <li>
                    <Link href={`#`} className={styles.mode} onClick={(e) =>{
                        e.preventDefault()
                        changeMode()
                    }}>
                        {
                            mode === 'light' && (
                                <i className="fa-solid fa-moon text-dark"></i>
                            ) || (
                                <i className="fa-solid fa-sun text-white"></i>
                            )
                        }
                    </Link>
                </li>
                <li className={styles.userMenu}>
                    <div className={styles.avatar} onClick={showUserMenu}>
                        <CustomImage src={`/avatar.jpg`} circle={true}/>
                    </div>
                    <div className={`topMenu ${styles.userMenuContainer}`}>
                        <ul>
                            <li>
                                <Link href={``}>
                                    <i className="fa-solid fa-user"></i> Edit Profile
                                </Link>
                            </li>
                            <li>
                                <Link href={``}>
                                    <i className="fa-solid fa-lock"></i> Change Password
                                </Link>
                            </li>
                            <li>
                                <Link href={`#`} onClick={logout}>
                                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}