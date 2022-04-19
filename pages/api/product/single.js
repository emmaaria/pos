import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import ProductModel from "../../../models/Product";

export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user) {
        const id = req.body.id;
        await db.connect();
        if (id && id !== '') {
            const product = await ProductModel.findById({_id: id}).lean();
            res.status(200).send({product});
        }else {
            res.status(400).send('Product id is required');
        }

    } else {
        res.status(401).send('Your are not authorized')
    }
}, session);