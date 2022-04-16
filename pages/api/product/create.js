import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import ProductModel from "../../../models/Product";
import uniqueNumber from 'generate-unique-id';
export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user) {
        const name = req.body.name;
        const category = req.body.category;
        const defaultUnit = req.body.defaultUnit;
        const secondaryUnit = req.body.secondaryUnit;
        const defaultUnitPrice = req.body.defaultUnitPrice;
        const purchasePrice = req.body.purchasePrice;
        const secondaryUnitPrice = req.body.secondaryUnitPrice;
        const defaultUnitValue = req.body.defaultUnitValue;
        const secondaryUnitValue = req.body.secondaryUnitValue;
        const productId = uniqueNumber({length: 10, useLetters: false});
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
        const product = new ProductModel({
            name,
            productId,
            category,
            defaultUnit,
            secondaryUnit,
            defaultUnitPrice,
            purchasePrice,
            secondaryUnitPrice,
            defaultUnitValue,
            secondaryUnitValue
        });
        await product.save();
        await db.disconnect();
        res.status(201).send('Saved')
    } else {
        res.status(401).send('Your are not authorized')
    }
}, session);