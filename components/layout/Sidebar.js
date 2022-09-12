import styles from './Sidebar.module.css';
import CustomImage from "../CustomImage";
import Link from "next/link";
import {useRouter} from "next/router";
import $ from 'jquery';
export default function Sidebar({user}) {
    const router = useRouter();
    const showCustomerMenu = (e) => {
        e.preventDefault();
        $('.customerMenu').slideToggle();
        $('.ci').toggleClass('open');
    };
    const showBankMenu = (e) => {
        e.preventDefault();
        $('.bankMenu').slideToggle();
        $('.bank').toggleClass('open');
    };
    const showSupplierMenu = (e) => {
        e.preventDefault();
        $('.supplierMenu').slideToggle();
        $('.si').toggleClass('open');
    };
    const showSaleMenu = (e) => {
        e.preventDefault();
        $('.saleMenu').slideToggle();
        $('.sales').toggleClass('open');
    };
    return (
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
                            router.pathname === '/dashboard'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-gauge-high"/>
                            Dashboard
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`#`}>
                        <a
                            onClick={showSaleMenu}
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
                            Sales
                            <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} sale`}/>
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
                                    POS
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
                            Products
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/report/stock`}>
                        <a className={`
                                ${
                            router.pathname === '/report/stock'
                                ? styles.active
                                : ''
                        }
                            `}>
                            <i className="fa-solid fa-cubes"/>
                            Stock
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
                            Category
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/customer`}>
                        <a
                            onClick={showCustomerMenu}
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
                            Customer
                            <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} ci`}/>
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
                            onClick={showSupplierMenu}
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
                            Supplier
                            <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} si`}/>
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
                            Unit
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
                            Purchase
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`/bank`}>
                        <a
                            onClick={showBankMenu}
                            className={`
                                ${
                                router.pathname === '/bank' ||
                                router.pathname === '/bank/create' ||
                                router.pathname === '/bank/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                            <i className="fa-solid fa-building-columns" />
                            Bank
                            <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} bank`}/>
                        </a>
                    </Link>
                    <ul className={`bankMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/bank`}>
                                <a className={`
                                ${
                                    router.pathname === '/bank' ||
                                    router.pathname === '/bank/[id]'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Bank List
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/bank/create`}>
                                <a className={`
                                ${
                                    router.pathname === '/bank/create'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Add Bank
                                </a>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}