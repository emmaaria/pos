import {withIronSessionApiRoute} from 'iron-session/next';
import session from '../../../lib/session';

export default withIronSessionApiRoute(async (req, res) => {
    req.session.user = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        token: req.body.token,
    };
    await req.session.save();
    res.send({ok: true});
}, session);