import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';

export default function CreateSupplier({user}) {
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        const name = $('.name').val();
        const mobile = $('.mobile').val();
        const address = $('.address').val();
        const due = $('.due').val();
        try {
            const res = await axios.post('/api/supplier/create',{name,mobile,address, due});
            if (res.status === 201){
                toast.dismiss();
                toast.success('Successfully Saved', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                $('form').trigger('reset');
            }
        }catch (e) {
            toast.dismiss();
            toast.error(e.response.data, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
        }
    }
    return (
        <>
            <Head>
                <title>
                    Add New Supplier
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Add New Supplier`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label htmlFor="name" className={`form-label`}>Supplier Name</label>
                                <input type="text" className={`form-control name`} id={`name`} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className={`form-label`}>Supplier Mobile Number</label>
                                <input type="text" className={`form-control mobile`} id={`mobile`} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className={`form-label`}>Supplier Address</label>
                                <input type="text" className={`form-control address`} id={`address`} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="due" className={`form-label`}>Previous Due</label>
                                <input type="text" className={`form-control due`} id={`due`} />
                            </div>
                            <button className={`btn btn-success`} type={`submit`}>Save</button>
                        </form>
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