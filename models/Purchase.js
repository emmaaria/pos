import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        purchaseId: {
            type: String,
            required: true,
        },
        supplier: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Supplier',
            required: true,
        },
        amount: {
            type: String,
        },
        paid: {
            type: Number,
        },
        comment: {
            type: String,
        },
        date: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: false,
        strict: false
    }
);

const PurchaseModel = mongoose.models.Purchase || mongoose.model('Purchase', schema);
export default PurchaseModel;
