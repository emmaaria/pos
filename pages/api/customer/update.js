import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import CustomerModel from "../../../models/Customer";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const name = req.body.name;
        const mobile = req.body.mobile;
        const address = req.body.address;
        const id = req.body.id;
        if (name === '') {
            res.status(400).send({
                error: 'Name is required',
            });
        }
        await db.connect();
        const customer = await CustomerModel.findByIdAndUpdate(id, {
            name: name,
            mobile: mobile,
            address: address,
        });
        
        if (customer) {
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