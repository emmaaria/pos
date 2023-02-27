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

    const showReturnMenu = (e) => {
        e.preventDefault();
        $('.returnMenu').slideToggle();
        $('.return').toggleClass('open');
        $('.returnParent').toggleClass(styles.opened);
    };
    const showProductMenu = (e) => {
        e.preventDefault();
        $('.productMenu').slideToggle();
        $('.product').toggleClass('open');
        $('.productParent').toggleClass(styles.opened);
    };

    const showHrMenu = (e) => {
        e.preventDefault();
        $('.hrMenu').slideToggle();
        $('.hr').toggleClass('open');
        $('.hrParent').toggleClass(styles.opened);
    };

    const showReportMenu = (e) => {
        e.preventDefault();
        $('.reportMenu').slideToggle();
        $('.report').toggleClass('open');
        $('.reportParent').toggleClass(styles.opened);
    };
    return (
        <div className={`sidebar ${styles.sidebar}`}>
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
                    <Link href={`/dashboard`} className={`
                                ${
                        router.pathname === '/dashboard'
                            ? styles.active
                            : ''
                    }
                            `}>
                        <i className="fa-solid fa-gauge-high"/>
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href={`#`} onClick={showSaleMenu}
                          className={`salesParent 
                                ${
                              router.pathname === '/sale' ||
                              router.pathname === '/sale/create' ||
                              router.pathname === '/sale/view/[id]' ||
                              router.pathname === '/sale/[id]'
                                  ? styles.active
                                  : ''
                          }
                            `}>
                        <i className="fa-solid fa-shopping-cart"/>
                        Sales
                        <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} sale`}/>
                    </Link>
                    <ul className={`saleMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/sale`} className={`
                                ${
                                router.pathname === '/sale' ||
                                router.pathname === '/sale/[id]' ||
                                router.pathname === '/sale/view/[id]'
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
                                POS
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/product`} onClick={showProductMenu}
                          className={`productParent 
                                ${
                              router.pathname === '/product' ||
                              router.pathname === '/product/create' ||
                              router.pathname === '/product/[id]' ||
                              router.pathname === '/category' ||
                              router.pathname === '/category/create' ||
                              router.pathname === '/category/[id]'
                                  ? styles.active
                                  : ''
                          }
                            `}>
                        <i className="fa-solid fa-bag-shopping"/>
                        Product
                        <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} product`}/>
                    </Link>
                    <ul className={`productMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/product`} className={`
                                ${
                                router.pathname === '/product' ||
                                router.pathname === '/product/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Manage Products
                            </Link>
                        </li>
                        <li>
                            <Link href={`/product/create`} className={`
                                ${
                                router.pathname === '/product/create'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Add New Product
                            </Link>
                        </li>
                        <li>
                            <Link href={`/category`} className={`
                                ${
                                router.pathname === '/category' ||
                                router.pathname === '/category/create'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Manage Category
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/report/stock`} className={`
                                ${
                        router.pathname === '/report/stock'
                            ? styles.active
                            : ''
                    }
                            `}>
                        <i className="fa-solid fa-cubes"/>
                        Stock
                    </Link>
                </li>
                <li>
                    <Link href={`/customer`} onClick={showCustomerMenu}
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
                    <Link href={`/supplier`} onClick={showSupplierMenu}
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
                        Unit
                    </Link>
                </li>
                <li>
                    <Link href={`#`} onClick={showPurchaseMenu}
                          className={`purchaseParent 
                                ${
                              router.pathname === '/purchase' ||
                              router.pathname === '/purchase/create' ||
                              router.pathname === '/purchase/barcode/[id]' ||
                              router.pathname === '/purchase/view/[id]' ||
                              router.pathname === '/purchase/[id]'
                                  ? styles.active
                                  : ''
                          }
                            `}>
                        <i className="fa-solid fa-cart-plus"/>
                        Purchase
                        <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} sale`}/>
                    </Link>
                    <ul className={`purchaseMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/purchase`} className={`
                                ${
                                router.pathname === '/purchase' ||
                                router.pathname === '/purchase/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Purchase List
                            </Link>
                        </li>
                        <li>
                            <Link href={`/purchase/create`} className={`
                                ${
                                router.pathname === '/purchase/create'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Add Purchase
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`#`} onClick={showReturnMenu}
                          className={`returnParent 
                                ${
                              router.pathname === '/return' ||
                              router.pathname === '/return/direct/create' ||
                              router.pathname === '/purchase/view/[id]' ||
                              router.pathname === '/purchase/[id]'
                                  ? styles.active
                                  : ''
                          }
                            `}>
                        <i className="fa-solid fa-right-left"></i>
                        Return
                        <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} return`}/>
                    </Link>
                    <ul className={`returnMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/return`} className={`
                                ${
                                router.pathname === '/return' ||
                                router.pathname === '/return/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Return List
                            </Link>
                        </li>
                        <li>
                            <Link href={`/return/direct/create`} className={`
                                ${
                                router.pathname === '/return/direct/create'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Direct Product Return
                            </Link>
                        </li>
                        <li>
                            <Link href={`/return/invoice/create`} className={`
                                ${
                                router.pathname === '/return/invoice/create'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Invoice Product Return
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link href={`/bank`} onClick={showBankMenu}
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
                    </Link>
                    <ul className={`bankMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/bank`} className={`
                                ${
                                router.pathname === '/bank' ||
                                router.pathname === '/bank/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Bank List
                            </Link>
                        </li>
                        <li>
                            <Link href={`/bank/create`} className={`
                                ${
                                router.pathname === '/bank/create'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Add Bank
                            </Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <Link href={`#`} onClick={showHrMenu}
                          className={`hrParent 
                                ${
                              router.pathname === '/hr/expense' ||
                              router.pathname === '/hr/expense/create' ||
                              router.pathname === '/hr/expense/category' ||
                              router.pathname === '/hr/expense/category/create' ||
                              router.pathname === '/hr/expense/category/[id]'
                                  ? styles.active
                                  : ''
                          }
                            `}>
                        <i className="fa-solid fa-hospital-user"></i>
                        HR
                        <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} hr`}/>
                    </Link>
                    <ul className={`hrMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/hr/expense/category`} className={`
                                ${
                                router.pathname === '/hr/expense/category' ||
                                router.pathname === '/hr/expense/category/create' ||
                                router.pathname === '/hr/expense/category/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Expense Category
                            </Link>
                        </li>
                        <li>
                            <Link href={`/hr/expense`} className={`
                                ${
                                router.pathname === '/hr/expense' ||
                                router.pathname === '/hr/expense/create' ||
                                router.pathname === '/hr/expense/[id]'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Manage Expense
                            </Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <Link href={`#`} onClick={showReportMenu}
                          className={`reportParent 
                                ${
                              router.pathname === '/report/sales'
                                  ? styles.active
                                  : ''
                          }
                            `}>
                        <i className="fa-solid fa-chart-column"></i>
                        Reports
                        <span className={`fa-solid fa-caret-right float-end ${styles.dropdownIcon} report`}/>
                    </Link>
                    <ul className={`reportMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/report/sales`} className={`
                                ${
                                router.pathname === '/report/sales'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Sales Report
                            </Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <Link href={`#`} onClick={showSettingMenu}
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
                    </Link>
                    <ul className={`settingMenu ${styles.subMenu}`}>
                        <li>
                            <Link href={`/setting/company`} className={`
                                ${
                                router.pathname === '/setting/company'
                                    ? styles.active
                                    : ''
                            }
                            `}>
                                Company Information
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}