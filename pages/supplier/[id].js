import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import db from "../../lib/db";
import SupplierModel from "../../models/Supplier";

export default function EditSupplier({user, supplier}) {
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
            const res = await axios.post('/api/supplier/update', {
                name, mobile, address, id: supplier._id
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
                    Edit Supplier
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Edit Supplier`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label htmlFor="name" className={`form-label`}>Supplier Name</label>
                                <input type="text" className={`form-control name`} id={`name`} required
                                       defaultValue={supplier.name}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobile" className={`form-label`}>Supplier Mobile</label>
                                <input type="text" className={`form-control mobile`} id={`mobile`}
                                       defaultValue={supplier.mobile}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className={`form-label`}>Supplier Address</label>
                                <input type="text" className={`form-control address`} id={`address`}
                                       defaultValue={supplier.address}/>
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
        const supplierId = params.id;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
        await db.connect();
        const supplierObject = await SupplierModel.findById({_id: supplierId}).lean();
        await db.disconnect();
        const supplier = JSON.stringify(supplierObject);
        return {
            props: {
                user: session.user,
                supplier: JSON.parse(supplier),
            },
        };
    },
    session
);