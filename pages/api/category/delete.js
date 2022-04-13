import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import CategoryModel from "../../../models/Category";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const id = req.body.id;
        await db.connect();
        const category = await CategoryModel.findByIdAndDelete(id);
        await db.disconnect();
        if (category) {
            res.status(201).send({
                success: 'Updated',
            });
        } else {
            res.status(400).send({ error: 'Something went wrong' });
        }
    }else {
        res.status(401).send('Your are not authorized')
    }
}, session);