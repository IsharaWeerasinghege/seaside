import mongoose from 'mongoose';


const partyReservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected'],
        default: 'pending'
    }
}, {timestamps: true});


partyReservationSchema.index({package: 1, date: 1}, {unique: true});

const PartyReservation = mongoose.models.PartyReservarion || mongoose.model('PartyReservation', partyReservationSchema);

export default PartyReservation;