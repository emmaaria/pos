import {withIronSessionApiRoute} from 'iron-session/next';
import session from '../../../lib/session';

export default withIronSessionApiRoute(async (req, res) => {
    req.session.user = {
        id: req.body.id,
        name: req.body.name,
        token: req.body.token,
        discountType: req.body.discountType,
        customerBasedPrice: req.body.customerBasedPrice,
        role: req.body.role,
        companyName: req.body.companyName,
        stockOverSelling: req.body.stockOverSelling,
        paddingLeft: req.body.paddingLeft,
        paddingRight: req.body.paddingRight,
        paddingTop: req.body.paddingTop,
        perRow: req.body.perRow,
        companyAddress: req.body.companyAddress,
        companyMobile: req.body.companyMobile,
        companyVatNumber: req.body.companyVatNumber,
        companyMushokNumber: req.body.companyMushokNumber,
    };
    await req.session.save();
    res.send({ok: true});
}, session);
