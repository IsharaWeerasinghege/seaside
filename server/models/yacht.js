import mongoose from "mongoose";

const yachtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
    },
    length: {
        type: String,
    },
    price: {
        type: String,
    },
    rooms: {
        type: String,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    image: {
        type: String,
    },
    fuelType: {
        type: String,
    },
    fuelCapacity: {
        type: Number,
    },
    fuelRefill: [
        {
            timestamp: {
                type: Date,
                default: Date.now
            },
            amount: {
                type: Number,
                required: true,
            },
        }
    ],
    maintenance: [
        {
            date: {
                type: Date,
                default: Date.now,
            },
            latestDate: {
                type: Date,
                default: Date.now,
                required: true
            },
            nextDate: {
                type: Date,
            },
            description: {
                type: String,
            }
        }
    ],
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'InventoryItem'
    }
});

const Yacht = mongoose.models.Yacht || mongoose.model('Yacht', yachtSchema);

export default Yacht;
