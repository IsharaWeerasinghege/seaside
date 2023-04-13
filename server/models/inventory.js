import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
        food: {
            type: Number,
        },
        beverage: {
            type: Number,
        },
        water: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);

const InventoryItem = mongoose.models.InventoryItem || mongoose.model('InventoryItem', inventoryItemSchema);

export default InventoryItem;