import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import TableSkeleton from "../../components/TableSkeleton";
import $ from 'jquery';
import {ToastContainer, toast} from 'react-toastify';
import useMode from "../../lib/mode";
import Select from "react-select";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {useReactToPrint} from "react-to-print";

export default function Product({user}) {
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const [products, setProducts] = useState();
    const [suppliers, setSuppliers] = useState([]);
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/product`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setProducts(res.data.products.data);
                setLinks(res.data.products.links);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);

    const searchProductBySupplier = (supplierID) => {
        setLoading(true)
        axios.get(
            `${process.env.API_URL}/product?supplier=${supplierID}`,
            headers
        ).then(res => {
            setLoading(false);
            if (res.data.status === true) {
                setProducts(res.data.products);
                setLinks([]);
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
    }

    useEffect(() => {
        async function getData() {
            try {
                const res = await axios.get(
                    `${process.env.API_URL}/supplier?allData=true`, headers
                );
                if (res.data.status === true) {
                    if (res.data.suppliers && res.data.suppliers.length > 0) {
                        setSuppliers(res.data.suppliers);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }

        getData();
    }, [setSuppliers]);

    const searchProduct = async () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        setTimer(
            setTimeout(() => {
                setLoading(true);
                const name = $('.terms').val();
                axios.get(
                    `${process.env.API_URL}/product?name=${name}`,
                    headers
                ).then(res => {
                    if (res.data.status === true) {
                        setProducts(res.data.products.data);
                        setLinks(res.data.products.links);
                        setLoading(false);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 2000)
        );
    }
    const paginate = async (url) => {
        setLoading(true);
        try {
            const res = await axios.get(
                url,
                headers
            );
            if (res.data.status === true) {
                setProducts(res.data.products.data);
                setLinks(res.data.products.links);
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
        }
    }
    const deleteHandler = async (id) => {
        toast.loading('Deleting', {
            position: "bottom-right",
            theme: 'dark'
        });
        try {
            const response = await axios.post(`${process.env.API_URL}/product/delete`, {
                id: id,
            }, headers);
            if (response.data.status === true) {
                toast.dismiss();
                toast.success('Successfully Deleted', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                $(`.row-id-${id}`).fadeOut();
            } else {
                toast.dismiss();
                toast.error(response.data.errors, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            }
        } catch (err) {
            toast.dismiss();
            toast.error(err.response.data.errors, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
        }
    };
    const {mode} = useMode()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    return (
        <>
            <Head>
                <title>
                    Products
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Products`}>
                <div className={`content ${mode === 'dark' ? 'dark-mode-bg-body dark' : 'body-bg'}`}>
                    <div className="custom-card">
                        <div className="row">
                            <div className="col">
                                <Link href={`/product/create`} className={`btn btn-success`}>
                                    <i className="fa-solid fa-plus"/> Add New Product
                                </Link>
                                <button className={`btn btn-warning ms-4`} onClick={handlePrint}>Print</button>
                            </div>
                            <div className="col">
                                {
                                    suppliers && (
                                        <Select
                                            options={suppliers}
                                            placeholder="Search By Supplier"
                                            isClearable={true}
                                            isSearchable={true}
                                            getOptionValue={(item) => item.id}
                                            getOptionLabel={(item) => `${item.name} (${item.address ? item.address : ''})`}
                                            onChange={(value) => {
                                                searchProductBySupplier(value?.id)
                                            }}/>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#dddddd">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>
                            <div className="col">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control terms"
                                                   placeholder={`Search product`}
                                                   name="email" onKeyUp={searchProduct} onKeyDown={searchProduct}
                                                   onChange={searchProduct}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <table className={`table mt-4`} ref={componentRef}>
                            <thead>
                            <tr>
                                <th width={`10%`}>Sl</th>
                                <th width={`40%`}>Name</th>
                                <th width={`20%`}>Sale Price</th>
                                <th width={`20%`}>Purchase Price</th>
                                <th width={`10%`} className={`no-print`}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products && products.length <= 0 && (
                                    <tr>
                                        <td colSpan={5} className={`text-center`}>No Product Found</td>
                                    </tr>
                                )
                            }
                            {
                                products && !loading && (
                                    products.length > 0 && (
                                        products.map((el, index) => (
                                            <tr key={el.id} valign={`middle`} className={`row-id-${el.id}`}>
                                                <td>{index + 1}</td>
                                                <td>{el.name}</td>
                                                <td>{el.price} Tk.</td>
                                                <td>{el.purchase_price} Tk.</td>
                                                <td className={`no-print`}>
                                                    <Link href={`/product/${el.id}`} className={`btn btn-warning btn-sm me-2`}>
                                                        <i className="fa-solid fa-pen-to-square"/>
                                                    </Link>
                                                    <a className={`btn btn-danger btn-sm`} onClick={(e) => {
                                                        e.preventDefault();
                                                        const result =
                                                            confirm(
                                                                'Want to delete?'
                                                            );
                                                        if (result) {
                                                            deleteHandler(
                                                                el.id
                                                            );
                                                        }
                                                    }}>
                                                        <i className="fa-solid fa-trash-can"/>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                )}
                            {
                                loading && (
                                    <TableSkeleton tr={3} td={5}/>
                                )
                            }
                            </tbody>
                            {
                                links.length > 0 && (
                                    <tfoot className={`no-print`}>
                                    <tr>
                                        <td colSpan={6}>
                                            <nav className={`float-end`}>
                                                <ul className="pagination mt-3">
                                                    {
                                                        links.map(el => (
                                                            <li className={`page-item ${el.active === true ? 'active' : ''}`}
                                                                key={el.label}>
                                                                <a className={`page-link`}
                                                                   onClick={() => paginate(el.url)}
                                                                   dangerouslySetInnerHTML={{__html: el.label}}/>
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            </nav>
                                        </td>
                                    </tr>
                                    </tfoot>
                                )
                            }
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req}) {
        const session = req.session;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
        return {
            props: {
                user: session.user
            },
        };
    },
    session
);
