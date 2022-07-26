import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Supplier',
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
const SupplierTransactionsModel = mongoose.models.SupplierTransactions || mongoose.model('SupplierTransactions', schema);
export default SupplierTransactionsModel;