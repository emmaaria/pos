import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import SupplierModel from "../../../models/Supplier";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const id = req.body.id;
        await db.connect();
        const supplier = await SupplierModel.findByIdAndDelete(id);
        
        if (supplier) {
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