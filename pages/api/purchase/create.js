import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import PurchaseModel from "../../../models/Purchase";
import SupplierModel from "../../../models/Supplier";
import uniqueNumber from "generate-unique-id";

export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user) {
        const supplier = req.body.supplier;
        const productIds = req.body.productIds;
        const productQuantities = req.body.productQuantities;
        const productPrices = req.body.productPrices;
        const paid = req.body.paid;
        const comment = req.body.comment;
        const date = req.body.date;
        const purchaseId = uniqueNumber({length: 15, useLetters: true});
        if (supplier === '') {
            res.status(400).send({
                error: 'Supplier is required',
            });
        }
        if (productIds.length <= 0) {
            res.status(400).send({
                error: 'Product is required',
            });
        }
        await db.connect();
        let purchaseItems = [];
        let total = 0;
        for (let i =0; i < productIds.length; i++){
            purchaseItems.push({
                productId: productIds[i],
                quantity : productQuantities[i],
                unitPrice : productPrices[i],
                amount : parseFloat(productQuantities[i])*parseFloat(productPrices[i])
            });
            total+= parseFloat(productQuantities[i])*parseFloat(productPrices[i]);
        }
        const purchase = new PurchaseModel({
            purchaseId,
            supplier,
            comment,
            date,
            purchaseItems,
            amount:total,
        });
        await purchase.save();
        const transactions = [
            {
                transactionId : purchaseId,
                transactionType: 'cr',
                amount: total,
                date: date,
                comment: `Supplier debit for purchase id (${purchaseId})`
            },
            {
                transactionId : purchaseId,
                transactionType: 'dv',
                amount: paid,
                date: date,
                comment: `Supplier credit for purchase id (${purchaseId})`
            }
        ]
        const supplierTransaction = await SupplierModel.findByIdAndUpdate(supplier, {
            $push : {transactions : transactions}
        });
        if (supplierTransaction){
            res.status(201).send('Saved')
        }else {
            res.status(400).send('Something went wrong')
        }
    } else {
        res.status(401).send('Your are not authorized')
    }
}, session);