import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import UnitModel from "../../../models/Unit";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const name = req.body.name;
        const page = parseFloat(req.body.page);
        await db.connect();
        if (name && name !== ''){
            const total = await UnitModel.find({name: new RegExp(name, 'i') }).count();
            const units = await UnitModel.find({name: new RegExp(name, 'i') }).lean();
            await db.disconnect();
            const totalPagesCount = Math.ceil(total / 50);
            let totalPages = [];
            for (let i = 0; i <= totalPagesCount-1; i++){
                totalPages.push(i);
            }
            res.status(200).send({units, totalPages});
        }else {
            const total = await UnitModel.find({}).count();
            const units = await UnitModel.find({}).skip(50*page).limit(50);
            await db.disconnect();
            const totalPagesCount = Math.ceil(total / 50);
            let totalPages = [];
            for (let i = 0; i <= totalPagesCount-1; i++){
                totalPages.push(i);
            }
            res.status(200).send({units, totalPages});
        }

    }else {
        res.status(401).send('Your are not authorized')
    }
}, session);