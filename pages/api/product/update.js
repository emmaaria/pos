import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import ProductModel from "../../../models/Product";
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user){
        const name = req.body.name;
        const category = req.body.category;
        const defaultUnit = req.body.defaultUnit;
        const secondaryUnit = req.body.secondaryUnit;
        const defaultUnitPrice = req.body.defaultUnitPrice;
        const purchasePrice = req.body.purchasePrice;
        const secondaryUnitPrice = req.body.secondaryUnitPrice;
        const defaultUnitValue = req.body.defaultUnitValue;
        const secondaryUnitValue = req.body.secondaryUnitValue;
        const id = req.body.id;
        if (name === '') {
            res.status(400).send({
                error: 'Name is required',
            });
        }
        if (defaultUnit === '') {
            res.status(400).send({
                error: 'Default unit is required',
            });
        }
        await db.connect();
        const product = await ProductModel.findByIdAndUpdate(id, {
            name,
            category,
            defaultUnit,
            secondaryUnit,
            defaultUnitPrice,
            purchasePrice,
            secondaryUnitPrice,
            defaultUnitValue,
            secondaryUnitValue
        });
        
        if (product) {
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