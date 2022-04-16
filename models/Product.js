import mongoose from 'mongoose';

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        productId: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        defaultUnit: {
            type: String,
            required: true,
        },
        secondaryUnit: {
            type: String,
        },
        defaultUnitPrice: {
            type: String,
            required: true,
        },
        secondaryUnitPrice: {
            type: String,
        },
        purchasePrice: {
            type: String,
            required: true,
        },
        defaultUnitValue: {
            type: String,
            required: true,
        },
        secondaryUnitValue: {
            type: String,
        },
    },
    {
        timestamps: false,
        strict: false
    }
);

const ProductModel = mongoose.models.Product || mongoose.model('Product', schema);
export default ProductModel;
