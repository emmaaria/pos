import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import CustomerModel from "../../../models/Customer";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const id = req.body.id;
        await db.connect();
        const customer = await CustomerModel.findByIdAndDelete(id);
        
        if (customer) {
            res.status(201).send({
                success: 'Deleted',
            });
        } else {
            res.status(400).send({ error: 'Something went wrong' });
        }
    }else {
        res.status(401).send('Your are not authorized')
    }
}, session);