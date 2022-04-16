import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import CategoryModel from "../../../models/Category";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const name = req.body.name;
        const id = req.body.id;
        if (name === '') {
            res.status(400).send({
                error: 'Name is required',
            });
        }
        await db.connect();
        const category = await CategoryModel.findByIdAndUpdate(id, {
            name: name
        });
        
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