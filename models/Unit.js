import mongoose from 'mongoose';
const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: false,
        strict: false
    }
);

const UnitModel = mongoose.models.Unit || mongoose.model('Unit', schema);
export default UnitModel;
