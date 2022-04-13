import styles from './Sidebar.module.css';
import CustomImage from "../CustomImage";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Sidebar({user}) {
    const router = useRouter();
    return(
        <div className={styles.sidebar}>
            <div className={styles.avatar}>
                <CustomImage src={`/avatar.jpg`} circle={true}/>
            </div>
            <p className={styles.userName}>
                {user.name}
            </p>
            <ul>
                <li>
                    <Link href={`/dashboard`}>
                        <a className={`
                                ${
                            router.pathname == '/dashboard'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-gauge-high"></i>
                            Dashboard
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/dashboard`}>
                        <a className={`
                                ${
                            router.pathname == '/product'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-bag-shopping"></i>
                            Products
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/category`}>
                        <a className={`
                                ${
                            router.pathname == '/category' ||
                            router.pathname == '/category/create'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-book"></i>
                            Category
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/dashboard`}>
                        <a className={`
                                ${
                            router.pathname == '/product'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-user-group"></i>
                            Customer
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/dashboard`}>
                        <a className={`
                                ${
                            router.pathname == '/product'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-users"></i>
                            Supplier
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}