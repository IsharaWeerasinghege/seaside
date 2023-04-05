import mongoose from 'mongoose';


const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    yacht: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Yacht',
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
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected'],
        default: 'pending'
    }
}, {timestamps: true});


reservationSchema.index({yacht: 1, date: 1}, {unique: true});

const Reservation = mongoose.models.Reservarion || mongoose.model('Reservation', reservationSchema);

export default Reservation;