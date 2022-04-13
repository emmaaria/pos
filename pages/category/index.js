import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import TableSkeleton from "../../components/TableSkeleton";

export default function Category({user}) {
    const [categories, setCategories] = useState();
    useEffect(() => {
        async function getCategories() {
            try {
                const res = await axios.post(
                    '/api/category',
                );
                if (res.status === 200) {
                    setCategories(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        }

        getCategories();
    }, [setCategories]);
    return (
        <>
            <Head>
                <title>
                    Categories
                </title>
            </Head>
            <Layout user={user} title={`Category`}>
                <div className="content">
                    <div className="custom-card">
                        <Link href={`/category/create`}>
                            <a className={`btn btn-success`}>
                                <i className="fa-solid fa-plus"/> Add New Category
                            </a>
                        </Link>
                        <table className={`table mt-4`}>
                            <thead>
                            <tr>
                                <th width={`10%`}>Sl</th>
                                <th width={`70%`}>Name</th>
                                <th width={`20%`}>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                categories && categories.length <= 0 && (
                                    <tr>
                                        <td colSpan={3} className={`text-center`}>No Category Found</td>
                                    </tr>
                                )
                            }
                            {categories && (
                                categories.map((el, index)=> (
                                    <tr key={el._id} valign={`middle`}>
                                        <td>{index+1}</td>
                                        <td>{el.name}</td>
                                        <td>
                                            <Link href={`#`}>
                                                <a className={`btn btn-warning btn-sm me-2`}>
                                                    <i className="fa-solid fa-pen-to-square"/>
                                                </a>
                                            </Link>
                                            <Link href={`#`}>
                                                <a className={`btn btn-danger btn-sm`}>
                                                    <i className="fa-solid fa-trash-can"/>
                                                </a>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) || (
                                <TableSkeleton tr={3} td={3}/>
                            )}

                            </tbody>
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