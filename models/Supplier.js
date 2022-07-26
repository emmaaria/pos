import mongoose from 'mongoose';
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
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

const SupplierModel = mongoose.models.Supplier || mongoose.model('Supplier', schema);
export default SupplierModel;
