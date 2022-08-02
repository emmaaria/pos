import styles from './PosSidebar.module.css';
import CustomImage from "../CustomImage";
import Link from "next/link";
import {useRouter} from "next/router";
export default function PosSidebar() {
    const router = useRouter();
    return (
        <div className={styles.sidebar}>
            <div className={styles.avatar}>
                <CustomImage src={`/avatar.jpg`} circle={true}/>
            </div>
            <ul>
                <li>
                    <Link href={`/dashboard`}>
                        <a className={`
                                ${
                            router.pathname === '/dashboard'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-gauge-high"/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/supplier`}>
                        <a
                            className={`
                                ${
                                router.pathname === '/sale' ||
                                router.pathname === '/sale/create' ||
                                router.pathname === '/sale/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                            <i className="fa-solid fa-shopping-cart"/>
                        </a>
                    </Link>
                    <ul className={`saleMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/sale`}>
                                <a className={`
                                ${
                                    router.pathname === '/sale' ||
                                    router.pathname === '/sale/[id]'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Sale List
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/sale/create`}>
                                <a className={`
                                ${
                                    router.pathname === '/sale/create'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Add New Sale
                                </a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/product`}>
                        <a className={`
                                ${
                            router.pathname === '/product' ||
                            router.pathname === '/product/create' ||
                            router.pathname === '/product/[id]'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-bag-shopping"/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/category`}>
                        <a className={`
                                ${
                            router.pathname === '/category' ||
                            router.pathname === '/category/create' ||
                            router.pathname === '/category/[id]'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-book"/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/customer`}>
                        <a
                            className={`
                                ${
                            router.pathname === '/customer' ||
                            router.pathname === '/customer/create' ||
                            router.pathname === '/customer/[id]'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-user-group"/>
                        </a>
                    </Link>
                    <ul className={`customerMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/customer`}>
                                <a className={`
                                ${
                                    router.pathname === '/customer' ||
                                    router.pathname === '/customer/[id]'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Customer List
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/customer/create`}>
                                <a className={`
                                ${
                                    router.pathname === '/customer/create'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Add Customer
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`#`}>
                                <a className={`
                                ${
                                    router.pathname === '/customer/ledger'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Customer Ledger
                                </a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/supplier`}>
                        <a
                            className={`
                                ${
                                router.pathname === '/supplier' ||
                                router.pathname === '/supplier/create' ||
                                router.pathname === '/supplier/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                            <i className="fa-solid fa-users"/>
                        </a>
                    </Link>
                    <ul className={`supplierMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/supplier`}>
                                <a className={`
                                ${
                                    router.pathname === '/supplier' ||
                                    router.pathname === '/supplier/[id]'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Supplier List
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/supplier/create`}>
                                <a className={`
                                ${
                                    router.pathname === '/supplier/create'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Add Supplier
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`#`}>
                                <a className={`
                                ${
                                    router.pathname === '/supplier/ledger'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Supplier Ledger
                                </a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/unit`}>
                        <a className={`
                                ${
                            router.pathname === '/unit' ||
                            router.pathname === '/unit/create' ||
                            router.pathname === '/unit/[id]'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-scale-balanced"/>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/purchase`}>
                        <a className={`
                                ${
                            router.pathname === '/purchase' ||
                            router.pathname === '/purchase/create' ||
                            router.pathname === '/purchase/[id]' ||
                            router.pathname === '/purchase/view/[id]'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-cart-plus"/>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}