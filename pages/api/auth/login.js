import db from '../../../lib/db';
import {withIronSessionApiRoute} from 'iron-session/next';
import session from '../../../lib/session';
import User from "../../../models/User";
import bcryptjs from "bcryptjs";

export default withIronSessionApiRoute(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    await db.connect();
    const user = await User.findOne({ email: email });
    console.log(email);
    if (
        user &&
        bcryptjs.compareSync(password, user.password)
    ) {
        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        await req.session.save();
        res.status(201).send('Logged In');
    } else {
        res.status(401).send('Invalid credentials');
    }
}, session);