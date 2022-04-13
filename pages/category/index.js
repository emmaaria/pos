import Layout from "../../components/layout/Layout";
import Head from "next/head";
import { withIronSessionSsr } from 'iron-session/next';
import session from "../../lib/session";
import styles from '../../styles/Category.module.css';
import Link from "next/link";
export default function Category({user}){
    return(
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
                    </div>
                </div>
            </Layout>
        </>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
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
                user : session.user
            },
        };
    },
    session
);