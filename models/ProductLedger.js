import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        transactionId: {
            type: String,
            required: true
        },
        transactionType: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        },
        unitPrice: {
            type: Number,
            default: 0
        },
        total: {
            type: Number,
            default: 0
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        },
    },
    {
        timestamps: false,
    }
);
const ProductLedgerModel = mongoose.models.ProductLedger || mongoose.model('ProductLedger', schema);
export default ProductLedgerModel;