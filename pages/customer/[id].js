import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import db from "../../lib/db";
import CustomerModel from "../../models/Customer";

export default function EditCustomer({user, customer}) {
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        const name = $('.name').val();
        const mobile = $('.mobile').val();
        const address = $('.address').val();
        try {
            const res = await axios.post('/api/customer/update', {
                name, mobile, address, id: customer._id
            });
            if (res.status === 201) {
                toast.dismiss();
                toast.success('Successfully Updated', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            }
        } catch (e) {
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
                    Edit Customer
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Edit Customer`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label htmlFor="name" className={`form-label`}>Customer Name</label>
                                <input type="text" className={`form-control name`} id={`name`} required
                                       defaultValue={customer.name}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className={`form-label`}>Customer Mobile</label>
                                <input type="text" className={`form-control mobile`} id={`mobile`}
                                       defaultValue={customer.mobile}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className={`form-label`}>Customer Address</label>
                                <input type="text" className={`form-control address`} id={`address`}
                                       defaultValue={customer.address}/>
                            </div>
                            <button className={`btn btn-success`} type={`submit`}>Update</button>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req, params}) {
        const session = req.session;
        const customerId = params.id;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
        await db.connect();
        const customerObject = await CustomerModel.findById({_id: customerId}).lean();
        await db.disconnect();
        const customer = JSON.stringify(customerObject);
        return {
            props: {
                user: session.user,
                customer: JSON.parse(customer),
            },
        };
    },
    session
);