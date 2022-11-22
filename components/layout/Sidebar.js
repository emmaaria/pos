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
        $('.customerParent').toggleClass(styles.opened);
    };
    const showBankMenu = (e) => {
        e.preventDefault();
        $('.bankMenu').slideToggle();
        $('.bank').toggleClass('open');
        $('.bankParent').toggleClass(styles.opened);
    };
    const showSettingMenu = (e) => {
        e.preventDefault();
        $('.settingMenu').slideToggle();
        $('.setting').toggleClass('open');
        $('.settingParent').toggleClass(styles.opened);
    };
    const showSupplierMenu = (e) => {
        e.preventDefault();
        $('.supplierMenu').slideToggle();
        $('.si').toggleClass('open');
        $('.supplierParent').toggleClass(styles.opened);
    };
    const showSaleMenu = (e) => {
        e.preventDefault();
        $('.saleMenu').slideToggle();
        $('.sales').toggleClass('open');
        $('.salesParent').toggleClass(styles.opened);
    };

    const showPurchaseMenu = (e) => {
        e.preventDefault();
        $('.purchaseMenu').slideToggle();
        $('.purchase').toggleClass('open');
        $('.purchaseParent').toggleClass(styles.opened);
    };
    return (
        <div className={styles.sidebar}>
            <div className={styles.avatarArea}>
                <div className={styles.avatar}>
                    <CustomImage src={`/avatar.jpg`} circle={true}/>
                </div>
                <p className={styles.userName}>
                    {user.name}
                </p>
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
                            Dashboard
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={`#`}>
                        <a
                            onClick={showSaleMenu}
                            className={`salesParent 
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
                            className={`customerParent 
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
                            className={`supplierParent 
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
                    <Link href={`#`}>
                        <a
                            onClick={showPurchaseMenu}
                            className={`purchaseParent 
                                ${
                                router.pathname === '/purchase' ||
                                router.pathname === '/purchase/create' ||
                                router.pathname === '/purchase/barcode/[id]' ||
                                router.pathname === '/purchase/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                            <i className="fa-solid fa-cart-plus"/>
                            Purchase
                            <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} sale`}/>
                        </a>
                    </Link>
                    <ul className={`purchaseMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/purchase`}>
                                <a className={`
                                ${
                                    router.pathname === '/purchase' ||
                                    router.pathname === '/purchase/[id]'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Purchase List
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href={`/purchase/create`}>
                                <a className={`
                                ${
                                    router.pathname === '/purchase/create'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Add Purchase
                                </a>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/bank`}>
                        <a
                            onClick={showBankMenu}
                            className={`bankParent 
                                ${
                                router.pathname === '/bank' ||
                                router.pathname === '/bank/create' ||
                                router.pathname === '/bank/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                            <i className="fa-solid fa-building-columns"/>
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

                <li>
                    <Link href={`#`}>
                        <a
                            onClick={showSettingMenu}
                            className={`settingParent 
                                ${
                                router.pathname === '/setting/company'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                            <i className="fa-solid fa-gear"/>
                            Settings
                            <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} setting`}/>
                        </a>
                    </Link>
                    <ul className={`settingMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/setting/company`}>
                                <a className={`
                                ${
                                    router.pathname === '/setting/company'
                                        ? styles.active
                                        : ''
                                }
                            `}>
                                    Company Information
                                </a>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}