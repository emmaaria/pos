import Layout from "../../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../../lib/session";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Barcode from "react-barcode";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {useReactToPrint} from 'react-to-print';
import {useRef} from "react";

const ProductItem = ({data, perRow, user}) => {
    const countBarcode = [];
    for (let i = 0; i < data.quantity; i++) {
        countBarcode.push(i);
    }
    return (countBarcode.map((el, index) => (
        <div className={`barcode-item position-relative`} key={`barcode-${index}`} style={{width: `${100 / perRow}%`}}>
            <small className="left">
                {
                    user.companyName.split(" ").length > 0 ? user.companyName.split(" ")[0] : ""
                }
            </small>
            <small className="right">
                {
                    user.companyName.split(" ").length > 1 ? user.companyName.split(" ")[1] : ""
                }
            </small>
            <div className="barcodeContainer">
                <span style={{fontSize: '10px', lineHeight: 1}}>{data.name}</span>
                <span style={{fontSize: '11px'}}><strong>Price - {data.price} Tk.</strong></span>
                <Barcode value={data.product_id} height={23} fontSize={9} margin={0}
                         width={1} background={`#ffffff`} lineColor={`#000000`}/>
            </div>
        </div>
    )))
}

export default function PrintBarcode({user, id}) {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    const [purchase, setPurchase] = useState();
    const [loading, setLoading] = useState(true);
    const headers = {
        headers: {Authorization: `Bearer ${user.token}`},
    };
    useEffect(() => {
        axios.get(
            `${process.env.API_URL}/purchase/${id}`,
            headers
        ).then(res => {
            if (res.data.status === true) {
                setPurchase(res.data.purchase);
                setLoading(false);
            }
        }).catch(err => {
            console.log(err);
        });
    }, []);
    return (
        <>
            <Head>
                <title>
                    Purchase Details
                </title>
            </Head>
            <Layout user={user} title={`Purchase Details`}>
                <div className="content">
                    <div className="custom-card text-light">
                        <button className={`btn btn-success float-end mb-4`} onClick={handlePrint}>Print</button>
                        <div className="barcode-grid" ref={componentRef} style={{
                            paddingTop: `${user.paddingTop}`,
                            paddingLeft: `${user.paddingLeft}`,
                            paddingRight: `${user.paddingRight}`
                        }}>
                            {
                                purchase && purchase.purchaseItems && !loading && (
                                    purchase.purchaseItems.map((el, index) => (
                                        <ProductItem user={user} perRow={user.perRow} data={el}
                                                     key={`barcode-item-${index}`}/>
                                    ))
                                ) || (
                                    <>
                                        <div className={`barcode-item`}>
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={60}/>
                                            </SkeletonTheme>
                                        </div>
                                        <div className={`barcode-item`}>
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={60}/>
                                            </SkeletonTheme>
                                        </div>
                                        <div className={`barcode-item`}>
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={60}/>
                                            </SkeletonTheme>
                                        </div>
                                        <div className={`barcode-item`}>
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={60}/>
                                            </SkeletonTheme>
                                        </div>
                                        <div className={`barcode-item`}>
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={60}/>
                                            </SkeletonTheme>
                                        </div>
                                        <div className={`barcode-item`}>
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={60}/>
                                            </SkeletonTheme>
                                        </div>
                                        <div className={`barcode-item`}>
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={60}/>
                                            </SkeletonTheme>
                                        </div>
                                        <div className={`barcode-item`}>
                                            <SkeletonTheme baseColor="rgba(249, 58, 11, 0.1)" highlightColor="#212130">
                                                <Skeleton width={`100%`} height={60}/>
                                            </SkeletonTheme>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req, params}) {
        const session = req.session;
        const id = params.id;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/admin`,
                },
            };
        }
        return {
            props: {
                user: session.user,
                id,
            },
        };
    },
    session
);
