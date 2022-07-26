import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Customer',
            required: true,
        },transactionId: {
            type: String,
            required: true
        },
        transactionType: {
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
const CustomerTransactionsModel = mongoose.models.CustomerTransactions || mongoose.model('CustomerTransactions', schema);
export default CustomerTransactionsModel;