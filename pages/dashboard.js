import Head from "next/head";
import { withIronSessionSsr } from 'iron-session/next';
import session from "../lib/session";
import Layout from "../components/layout/Layout";
export default function Dashboard({user}) {
    return(
        <>
            <Head>
                <title>Dashboard</title>
                <link rel="icon" href="/fav.png"/>
            </Head>
            <Layout user={user} title={`Dashboard`}></Layout>
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