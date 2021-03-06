import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import UnitModel from "../../../models/Unit";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const id = req.body.id;
        await db.connect();
        const unit = await UnitModel.findByIdAndDelete(id);
        
        if (unit) {
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