import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
    {
        transactionType: {
            type: String,
            required: true
        },
        transactionId: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            default: 0
        },
        comment: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required : true
        }
    },
    {
        timestamps: false,
    }
);
const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
        },
        address: {
            type: String,
        },
        transactions: [transactionSchema]
    },
    {
        timestamps: true,
        strict: false
    }
);

const CustomerModel = mongoose.models.Customer || mongoose.model('Customer', schema);
export default CustomerModel;
