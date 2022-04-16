import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import CategoryModel from "../../../models/Category";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const name = req.body.name;
        if (name === '') {
            res.status(400).send({
                error: 'Name is required',
            });
        }
        await db.connect();
        const category = new CategoryModel({
            name
        });
        await category.save();
        res.status(201).send('Saved')
    }else {
        res.status(401).send('Your are not authorized')
    }
}, session);