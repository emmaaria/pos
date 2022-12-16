import styles from './TopBar.module.css';
import Link from "next/link";
import Image from "next/image";
import CustomImage from "../CustomImage";
import $ from 'jquery';
import axios from "axios";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

export default function TopBar({title, handle}) {
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
        <div className={styles.topBar}>
            <div className={styles.sidebarToggler}>
                <a onClick={showSidebar}>
                    <i className="fa-solid fa-bars-staggered"></i>
                </a>
            </div>
            <h4 className={styles.pageTitle}>
                {title}
            </h4>
            <ul className={styles.rightSide}>
                <li>
                    <button className={styles.fullScreen} onClick={handle.enter}>
                        <Image src={`/full-screen.svg`} width={25} height={25}/>
                    </button>
                </li>
                <li>
                    <Link href={`/sale/create`}>
                        <a className={`btn btn-success`}>
                            POS
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`#`}>
                        <a className={styles.notification}>
                            <i className="fa-solid fa-bell"></i>
                        </a>
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
                                    <a><i className="fa-solid fa-user"></i> Edit Profile</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={``}>
                                    <a><i className="fa-solid fa-lock"></i> Change Password</a>
                                </Link>
                            </li>
                            <li>
                                <Link href={`#`}>
                                    <a onClick={logout}><i className="fa-solid fa-right-from-bracket"></i> Logout</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}