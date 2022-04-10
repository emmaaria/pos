import mongoose from 'mongoose';

async function connect() {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

async function disconnect() {
    await mongoose.connection.close();
}

const db = {connect, disconnect};
export default db;
