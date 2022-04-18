import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import SupplierModel from "../../../models/Supplier";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const name = req.body.name;
        const all = req.body.all;
        const page = parseFloat(req.body.page);
        await db.connect();
        if (name && name !== ''){
            const total = await SupplierModel.find({$or : [
                    {name: new RegExp(name, 'i')},
                    {mobile: new RegExp(name, 'i')},
                ]}).count();
            const suppliers = await SupplierModel.find({
                $or : [
                    {name: new RegExp(name, 'i')},
                    {mobile: new RegExp(name, 'i')},
                ]
            }).lean();
            
            const totalPagesCount = Math.ceil(total / 50);
            let totalPages = [];
            for (let i = 0; i <= totalPagesCount-1; i++){
                totalPages.push(i);
            }
            res.status(200).send({suppliers, totalPages});
        }else if (all && all === true) {
            const suppliers = await SupplierModel.find({},'name');
            res.status(200).send({suppliers});
        }else {
            const total = await SupplierModel.find({}).count();
            const suppliers = await SupplierModel.find({},'name mobile address transactions').skip(50*page).limit(50);

            const totalPagesCount = Math.ceil(total / 50);
            let totalPages = [];
            for (let i = 0; i <= totalPagesCount-1; i++){
                totalPages.push(i);
            }
            res.status(200).send({suppliers, totalPages});
        }

    }else {
        res.status(401).send('Your are not authorized')
    }
}, session);