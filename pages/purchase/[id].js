import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import db from "../../lib/db";
import CategoryModel from "../../models/Category";

export default function EditCategory({user, category}) {
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        const name = $('.name').val();
        try {
            const res = await axios.post('/api/category/update', {
                name, id: category._id
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
                    Edit Category
                </title>
            </Head>
            <ToastContainer/>
            <Layout user={user} title={`Edit Category`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label htmlFor="name" className={`form-label`}>Category Name</label>
                                <input type="text" className={`form-control name`} id={`name`} required
                                       defaultValue={category.name}/>
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
        const categoryId = params.id;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
        await db.connect();
        const categoryObject = await CategoryModel.findById({_id: categoryId}).lean();
        
        const category = JSON.stringify(categoryObject);
        return {
            props: {
                user: session.user,
                category: JSON.parse(category),
            },
        };
    },
    session
);