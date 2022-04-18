import mongoose from 'mongoose';

const purchaseItemsSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 0
        },
        unitPrice: {
            type: String,
            required: true
        },
        amount: {
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
        comment: {
            type: String,
        },
        date: {
            type: String,
            required: true,
        },
        purchaseItems: [purchaseItemsSchema]
    },
    {
        timestamps: false,
        strict: false
    }
);

const PurchaseModel = mongoose.models.Purchase || mongoose.model('Purchase', schema);
export default PurchaseModel;
