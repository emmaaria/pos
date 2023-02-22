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
                    <Link href={`/dashboard`} className={`
                                ${
                        router.pathname === '/dashboard'
                            ? styles.active
                            : ''
                    }
                            `}>
                        <i className="fa-solid fa-gauge-high"/>
                    </Link>
                </li>
                <li>
                    <Link href={`/supplier`} className={`
                                ${
                        router.pathname === '/sale' ||
                        router.pathname === '/sale/create' ||
                        router.pathname === '/sale/[id]'
                            ? styles.active
                            : ''
                    }
                            `}>
                        <i className="fa-solid fa-shopping-cart"/>
                    </Link>
                    <ul className={`saleMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/sale`} className={`
                                ${
                                router.pathname === '/sale' ||
                                router.pathname === '/sale/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Sale List
                            </Link>
                        </li>
                        <li>
                            <Link href={`/sale/create`} className={`
                                ${
                                router.pathname === '/sale/create'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Add New Sale
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/product`} className={`
                                ${
                        router.pathname === '/product' ||
                        router.pathname === '/product/create' ||
                        router.pathname === '/product/[id]'
                            ? styles.active
                            : ''
                    }
                            `}>
                        <i className="fa-solid fa-bag-shopping"/>
                    </Link>
                </li>
                <li>
                    <Link href={`/category`} className={`
                                ${
                        router.pathname === '/category' ||
                        router.pathname === '/category/create' ||
                        router.pathname === '/category/[id]'
                            ? styles.active
                            : ''
                    }
                            `}>
                        <i className="fa-solid fa-book"/>
                    </Link>
                </li>
                <li>
                    <Link href={`/customer`} className={`
                                ${
                        router.pathname === '/customer' ||
                        router.pathname === '/customer/create' ||
                        router.pathname === '/customer/[id]'
                            ? styles.active
                            : ''
                    }
                            `}>
                        <i className="fa-solid fa-user-group"/>
                    </Link>
                    <ul className={`customerMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/customer`} className={`
                                ${
                                router.pathname === '/customer' ||
                                router.pathname === '/customer/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Customer List
                            </Link>
                        </li>
                        <li>
                            <Link href={`/customer/create`} className={`
                                ${
                                router.pathname === '/customer/create'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Add Customer
                            </Link>
                        </li>
                        <li>
                            <Link href={`#`} className={`
                                ${
                                router.pathname === '/customer/ledger'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Customer Ledger
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/supplier`} className={`
                                ${
                        router.pathname === '/supplier' ||
                        router.pathname === '/supplier/create' ||
                        router.pathname === '/supplier/[id]'
                            ? styles.active
                            : ''
                    }
                            `}>
                        <i className="fa-solid fa-users"/>
                    </Link>
                    <ul className={`supplierMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/supplier`} className={`
                                ${
                                router.pathname === '/supplier' ||
                                router.pathname === '/supplier/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Supplier List
                            </Link>
                        </li>
                        <li>
                            <Link href={`/supplier/create`} className={`
                                ${
                                router.pathname === '/supplier/create'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Add Supplier
                            </Link>
                        </li>
                        <li>
                            <Link href={`#`} className={`
                                ${
                                router.pathname === '/supplier/ledger'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Supplier Ledger
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/unit`} className={`
                                ${
                        router.pathname === '/unit' ||
                        router.pathname === '/unit/create' ||
                        router.pathname === '/unit/[id]'
                            ? styles.active
                            : ''
                    }
                            `}>
                        <i className="fa-solid fa-scale-balanced"/>
                    </Link>
                </li>
                <li>
                    <Link href={`/purchase`} className={`
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
                    </Link>
                </li>
            </ul>
        </div>
    )
}