import Layout from "../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../lib/session";
import {ToastContainer, toast} from 'react-toastify';
import axios from "axios";
import $ from 'jquery';
import {useEffect, useState} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import Loader from "../../components/Loader";
import ImageUploading from 'react-images-uploading';

export default function EditCustomer({user}) {
    const [company, setCompany] = useState();
    const [image, setImage] = useState([]);
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(true);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    const onImageUpload = (imageList) => {
        setImage(imageList);
    };

    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/company`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setCompany(res.data.company);
                setLoading(false);
            } else {
                toast.error(res.data.errors, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    const handleForm = async (e) => {
        e.preventDefault();
        toast.loading('Submitting', {
            position: "bottom-right",
            theme: 'dark'
        });
        setLoader(true);
        const name = $('.name').val();
        const mobile = $('.mobile').val();
        const address = $('.address').val();
        const email = $('.email').val();
        const vat_number = $('.vat_number').val();
        const mushok_number = $('.mushok_number').val();
        if (name === '') {
            toast.dismiss();
            toast.error('Name is required', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
            });
            setLoader(false);
            return;
        }
        try {
            const res = await axios.post(`${process.env.API_URL}/company/update`, {
                name, mobile, address, email, vat_number, mushok_number, logo : image.length > 0 ? image[0].data_url : ''
            }, headers);
            if (res.data.status === true) {
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
                setLoader(false);
            } else {
                toast.dismiss();
                toast.error(e.response.data.errors, {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark',
                });
                setLoader(false);
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
            setLoader(false);
        }
    }
    return (
        <>
            <Head>
                <title>
                    Edit Company Information
                </title>
            </Head>
            <ToastContainer/>
            {
                loader && loader === true && (
                    <Loader/>
                )
            }
            <Layout user={user} title={`Edit Company Information`}>
                <div className="content">
                    <div className="custom-card">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label className={`form-label`}>Company Logo</label>
                                {
                                    company && loading === false && (
                                        <img className={`logoImage`} src={company.logo} />
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={60}/>
                                        </SkeletonTheme>
                                    )
                                }
                                <div className="mt-3 mb-3">
                                    <ImageUploading
                                        multiple
                                        value={image}
                                        onChange={onImageUpload}
                                        maxNumber={1}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                              imageList,
                                              onImageUpload,
                                              onImageRemove,
                                          }) => (
                                            // write your building UI
                                            <div className="upload__image-wrapper">
                                                {
                                                    image.length <= 0 && (
                                                        <button
                                                            onClick={onImageUpload}
                                                            type={`button`}
                                                            className={`uploadBtn`}
                                                        >
                                                            <i className="fa-solid fa-cloud-arrow-up" /> Upload Logo
                                                        </button>
                                                    )
                                                }
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <img src={image['data_url']} className={`uploadPreview`}/>
                                                        <div className="image-item__btn-wrapper">
                                                            <button onClick={() => onImageRemove(index)} type={`button`} className={`removeBtn`}>
                                                                <i className="fa-solid fa-trash" /> Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ImageUploading>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className={`form-label`}>Company Name</label>
                                {
                                    company && loading === false && (
                                        <input type="text" className={`form-control name`} required
                                               defaultValue={company.name}/>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <label className={`form-label`}>Company Address</label>
                                {
                                    company && loading === false && (
                                        <input type="text" className={`form-control address`}
                                               defaultValue={company.address}/>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <label className={`form-label`}>Company Mobile Number</label>
                                {
                                    company && loading === false && (
                                        <input type="text" className={`form-control mobile`} defaultValue={company.mobile}/>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className={`form-label`}>Company Email</label>
                                {
                                    company && loading === false && (
                                        <input type="text" className={`form-control email`}
                                               defaultValue={company.email}/>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>

                            <div className="mb-3">
                                <label className={`form-label`}>Vat Registration Number</label>
                                {
                                    company && loading === false && (
                                        <input type="text" className={`form-control vat_number`}
                                               defaultValue={company.vat_number}/>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <label className={`form-label`}>Mushok Number</label>
                                {
                                    company && loading === false && (
                                        <input type="text" className={`form-control mushok_number`}
                                               defaultValue={company.mushok_number}/>
                                    ) || (
                                        <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                            <Skeleton width={`100%`} height={40}/>
                                        </SkeletonTheme>
                                    )
                                }
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