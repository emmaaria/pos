import db from "../../../lib/db";
import session from "../../../lib/session";
import {withIronSessionApiRoute} from 'iron-session/next';
import PurchaseModel from "../../../models/Purchase";

export default withIronSessionApiRoute(async (req, res) => {
    if (req.session.user) {
        const page = parseFloat(req.body.page);
        await db.connect();
        const total = await PurchaseModel.find({}).count();
        const purchases = await PurchaseModel.aggregate([
            {
                $lookup: {
                    from: 'suppliers',
                    localField: 'supplier',
                    foreignField: '_id',
                    as: 'supplier',
                    pipeline: [
                        {
                            $project: {
                                name: 1,
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    _id: 1,
                    purchaseId: 1,
                    amount: 1,
                    comment: 1,
                    supplier : 1
                }
            }
        ]).skip(50 * page).limit(50);
        const totalPagesCount = Math.ceil(total / 50);
        let totalPages = [];
        for (let i = 0; i <= totalPagesCount - 1; i++) {
            totalPages.push(i);
        }
        res.status(200).send({purchases, totalPages});

    } else {
        res.status(401).send('Your are not authorized')
    }
}, session);