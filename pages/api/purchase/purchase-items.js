import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import ProductModel from "../../../models/Product";

export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user) {
        const items = req.body.items;
        await db.connect();
        if (items && items !== '') {
            const promises = items.map( async (el) => {
                const product = await ProductModel.findById(el.productId).lean();
                if (product){
                    return {
                        productId: el.productId,
                        unitPrice: el.unitPrice,
                        quantity: el.quantity,
                        amount: el.amount,
                        name: product.name,
                    }
                }
            });
            const products = await Promise.all(promises);
            res.status(200).send({products});
        } else {
            res.status(400).send('Product ids is required');
        }

    } else {
        res.status(401).send('Your are not authorized')
    }
}, session);