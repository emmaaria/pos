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
            unique: true
        },
        category: {
            type: String,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        purchasePrice: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: false,
        strict: false
    }
);

const ProductModel = mongoose.models.Product || mongoose.model('Product', schema);
export default ProductModel;
