import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import CustomerModel from "../../../models/Customer";

export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user) {
        const name = req.body.name;
        const mobile = req.body.mobile;
        const address = req.body.address;
        const due = req.body.due;
        if (name === '') {
            res.status(400).send({
                error: 'Name is required',
            });
        }
        await db.connect();
        if (due === '') {
            const customer = new CustomerModel({
                name, mobile, address
            });
            await customer.save();
        } else {
            const customer = new CustomerModel({
                name, mobile, address, transactions: {
                    transactionType: 'dv',
                    amount: due,
                    date: new Date().toISOString().slice(0, 10),
                    comment: 'Previous Due'
                }
            });
            await customer.save();
        }
        await db.disconnect();
        res.status(201).send('Saved')
    } else {
        res.status(401).send('Your are not authorized')
    }
}, session);