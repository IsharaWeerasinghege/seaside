import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            min: 6
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String
        },
        role: {
            type: String,
            default: 'user'
        },
        branch: {
            type: String,
        },
        nic: {
            type: String,
        },
        city: {
            type: String,
        },
        category: {
            type: String,
        },
        location: {
            type: String,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
