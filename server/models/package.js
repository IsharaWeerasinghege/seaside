import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    features: {
        type: Array,
        required: true,
    }
}, { timestamps: true })

const Package = mongoose.models.Package || mongoose.model('Package', packageSchema);

export default Package;