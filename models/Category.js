import mongoose from 'mongoose';
const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Number,
            required: true,
            default: 1
        },
    },
    {
        timestamps: true,
        strict: false
    }
);

const CategoryModel = mongoose.models.Category || mongoose.model('Category', schema);
export default CategoryModel;
