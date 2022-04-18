import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import SupplierModel from "../../../models/Supplier";
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
        const supplier = await SupplierModel.findByIdAndUpdate(id, {
            name: name,
            mobile: mobile,
            address: address,
        });
        
        if (supplier) {
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