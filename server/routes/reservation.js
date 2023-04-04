import Reservation from "../models/reservation.js";

/**
 * create reservation
 */
export const createReservation = async (req, res) => {
    const {yacht, checkIn, guests, user} = req.body;

    const reservation = new Reservation({
        user,
        yacht,
        date: new Date(checkIn),
        guests: parseInt(guests)
    });

    try {
        const founded = await Reservation.find({yacht: yacht, date: checkIn});

        if (founded.length > 0) {
            throw new Error('This yacht is already booked on this date');
            return;
        }

        await reservation.save();
        res.status(201).json({message: 'reservation created successfully. we will notify you reservation is confirmed'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * get reservation list
 */
export const getReservationList = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate({
            path: 'yacht',
            select: 'name location'
        }).populate({path: 'user', select: 'name email phone address'}).sort({date: -1});

        console.log(reservations)
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error.message)
    }
}

/**
 * update reservation status
 */

export const updateReservationStatus = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    try {
        const reservation = await Reservation.findById(id);
        if (!reservation) {
            throw new Error('reservation not found');
        }

        reservation.status = status;
        await reservation.save();

        res.status(200).json({message: 'reservation status updated successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error.message)
    }
}


/**
 * get reservation list by user
 */

export const getReservationListByUser = async (req, res) => {
    try {
        const {id} = req.params;
        const reservations = await Reservation.find({user: id}).populate({
            path: 'yacht',
            select: 'name location price'
        }).sort({date: -1}).limit(10);

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error.message)
    }
}


