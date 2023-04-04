import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    food: {
        type: Number,
    },
    beverage: {
        type: Number,
    },
    fuel: {
        type: Number,
    },
    water: {
        type: Number,
    },
    yachtId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Yacht'
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const InventoryItem = mongoose.models.InventoryItem || mongoose.model('InventoryItem', inventoryItemSchema);

export default InventoryItem;