import Reservation from "../models/reservation.js";
import partyReservation from "../models/partyReservation.js";

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
            res.status(400).json({message: 'this yacht is already reserved on this date'});
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
            res.status(404).json({message: 'reservation not found'});
               return;
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


/**
 * booking
 */
export const createBooking = async (req, res) => {
    const { packageId, date, guests, location,  user} = req.body;

    const reservation = new partyReservation({
        user,
        package: packageId,
        date: new Date(date),
        guests: parseInt(guests),
        location
    });

    try {
        const founded = await partyReservation.find({package: packageId, date: date});

        if (founded.length > 0) {
            res.status(400).json({message: 'this yacht is already reserved on this date'});
            return;
        }

        await reservation.save();
        res.status(201).json({message: 'reservation created successfully. we will notify you reservation is confirmed'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * get booking list
 */
export const getBookingList = async (req, res) => {
    try {
        const reservations = await partyReservation.find().populate({
            path: 'package',
            select: 'name'
        }).populate({path: 'user', select: 'name email phone address'}).sort({date: -1});

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error.message)
    }
}

/**
 * update booking status
 */
export const updateBookingStatus = async (req, res) => {
    const {id} = req.params;
    const {status} = req.body;

    try {
        const reservation = await partyReservation.findById(id);
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
 * get booking list by user
 */
export const getBookingListByUser = async (req, res) => {
    try {
        const {id} = req.params;
        const reservations = await partyReservation.find({user: id}).populate({
            path: 'package',
            select: 'name'
        }).sort({date: -1}).limit(10);

        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({message: error.message});
        console.log(error.message)
    }
}