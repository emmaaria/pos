import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import CategoryModel from "../../../models/Category";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const name = req.body.name;
        const page = parseFloat(req.body.page);
        await db.connect();
        if (name && name !== ''){
            const total = await CategoryModel.find({name: new RegExp(name, 'i') }).count();
            const categories = await CategoryModel.find({name: new RegExp(name, 'i') }).lean();
            await db.disconnect();
            const totalPagesCount = Math.ceil(total / 5);
            let totalPages = [];
            for (let i = 0; i <= totalPagesCount-1; i++){
                totalPages.push(i);
            }
            res.status(200).send({categories, totalPages});
        }else {
            const total = await CategoryModel.find({}).count();
            const categories = await CategoryModel.find({}).skip(5*page).limit(5);
            await db.disconnect();
            const totalPagesCount = Math.ceil(total / 5);
            let totalPages = [];
            for (let i = 0; i <= totalPagesCount-1; i++){
                totalPages.push(i);
            }
            res.status(200).send({categories, totalPages});
        }

    }else {
        res.status(401).send('Your are not authorized')
    }
}, session);