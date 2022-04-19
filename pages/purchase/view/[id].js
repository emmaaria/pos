import Layout from "../../../components/layout/Layout";
import Head from "next/head";
import {withIronSessionSsr} from 'iron-session/next';
import session from "../../../lib/session";
import db from "../../../lib/db";
import PurchaseModel from "../../../models/Purchase";
import SupplierModel from "../../../models/Supplier";
import axios from "axios";
import {useEffect, useState} from "react";
export default function Details({user, purchase, supplier}) {
    const [products,setProducts] = useState();
    useEffect(()=> {
        const getPurchaseProducts = async () => {
            try {
                const res = await axios.post('/api/purchase/purchase-items',{items : purchase.purchaseItems});
                if (res.status === 200){
                    setProducts(res.data.products)
                }
            }catch (e) {
                console.log(e.response.data);
            }
        }
        getPurchaseProducts();
    },[setProducts]);
    console.log(products);
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
                        <p>
                            <strong>Supplier Name</strong> : {supplier.name}
                        </p>
                        <p>
                            <strong>Purchase ID</strong> : {purchase.purchaseId}
                        </p>
                        <p>
                            <strong>Purchase Date</strong> : {purchase.date}
                        </p>
                        <hr/>
                        <table className={`table table-bordered table-hover`}>
                            <thead>
                            <tr>
                                <th width={`5%`}>
                                    SL
                                </th>
                                <th width={`45%`}>
                                    Product Name
                                </th>
                                <th width={`15%`}>
                                    Purchase Price
                                </th>
                                <th width={`15%`}>
                                    Quantity
                                </th>
                                <th className={`text-end`} width={`20%`}>
                                    Subtotal
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products && (
                                    products.map((el, index) => (
                                        <tr key={el.productId}>
                                            <td>{index+1}</td>
                                            <td>
                                                {el.name}
                                            </td>
                                            <td>{el.unitPrice} Tk.</td>
                                            <td>{el.quantity}</td>
                                            <td className={`text-end`}>{el.amount} Tk.</td>
                                        </tr>
                                    ))
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </>
    )
}
export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({req, params}) {
        const session = req.session;
        const purchaseId = params.id;
        if (!session.user) {
            return {
                redirect: {
                    destination: `/`,
                },
            };
        }
        await db.connect();
        const purchaseObject = await PurchaseModel.findById({_id: purchaseId}).lean();
        const supplierObject = await SupplierModel.findById({_id: purchaseObject.supplier}, 'name').lean();
        const purchase = JSON.stringify(purchaseObject);
        const supplier = JSON.stringify(supplierObject);
        return {
            props: {
                user: session.user,
                purchase: JSON.parse(purchase),
                supplier: JSON.parse(supplier),
            },
        };
    },
    session
);