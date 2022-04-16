import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import ProductModel from "../../../models/Product";

export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user) {
        const name = req.body.name;
        const page = parseFloat(req.body.page);
        await db.connect();
        if (name && name !== '') {
            const total = await ProductModel.find({name: new RegExp(name, 'i')}).count();
            const products = await ProductModel.find({name: new RegExp(name, 'i')}, 'name purchasePrice defaultUnitPrice').lean();
            await db.disconnect();
            const totalPagesCount = Math.ceil(total / 50);
            let totalPages = [];
            for (let i = 0; i <= totalPagesCount - 1; i++) {
                totalPages.push(i);
            }
            res.status(200).send({products, totalPages});
        } else {
            const total = await ProductModel.find({}).count();
            const products = await ProductModel.find({}, 'name purchasePrice defaultUnitPrice').skip(50 * page).limit(50);
            await db.disconnect();
            const totalPagesCount = Math.ceil(total / 50);
            let totalPages = [];
            for (let i = 0; i <= totalPagesCount - 1; i++) {
                totalPages.push(i);
            }
            res.status(200).send({products, totalPages});
        }

    } else {
        res.status(401).send('Your are not authorized')
    }
}, session);