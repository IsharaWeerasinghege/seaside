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
    }

});

const Yacht = mongoose.models.Yacht || mongoose.model('Yacht', yachtSchema);

export default Yacht;
