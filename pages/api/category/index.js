import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import CategoryModel from "../../../models/Category";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const name = req.body.name;
        await db.connect();
        if (name && name !== ''){
            const categories = await CategoryModel.find({name: new RegExp(name, 'i') }).lean();
            await db.disconnect();
            res.status(200).send(categories);
        }else {
            const categories = await CategoryModel.find({}).skip(0).limit(50).lean();
            await db.disconnect();
            res.status(200).send(categories);
        }

    }else {
        res.status(401).send('Your are not authorized')
    }
}, session);