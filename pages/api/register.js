import db from '../../lib/db';
import User from './../../models/User';
import bcryptjs from 'bcryptjs';
export default async function handler(req, res) {
    const data = {
        name: 'Shourov',
        email: 'sheikhshourov420@gmail.com',
        role: 'admin',
        password: bcryptjs.hashSync('123456'),
    };
    await db.connect();
    const user = new User(data);
    await user.save();
    res.status(200).json({ name: 'Emma' });
}
