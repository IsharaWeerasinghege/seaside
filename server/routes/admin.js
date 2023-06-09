import Yacht from "../models/yacht.js";
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";
import Reservation from "../models/reservation.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * fleet management
 */
export const createYacht = async (req, res) => {
    const {fleetName, length, capacity, price, rooms, location, type, description, fuelType, fuelCapacity} = req.body;
    const yacht = new Yacht({
        name: fleetName,
        length,
        capacity,
        price,
        rooms,
        location,
        type,
        description,
        fuelType,
        fuelCapacity,
        image: req.file.filename
    });

    try {
        await yacht.save();
        res.status(201).json({message: 'yacht created successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

}

/**
 * yacht list
 */

export const viewYachtList = async (req, res) => {
    try {
        const yachts = await Yacht.aggregate([
            {
                $addFields: {
                    totalFuelRefillAmount: {$sum: "$fuelRefill.amount"}
                }
            }
        ]);

        res.status(200).json(yachts);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message});
    }
}

/**
 * delete yacht
 */
export const deleteYacht = async (req, res) => {
    const {id} = req.params;
    try {
        const deleted = await Yacht.findByIdAndDelete(id);
        if (deleted.image) {
            fs.unlinkSync(path.join(__dirname, `../public/assets/${deleted.image}`));
        }
        res.status(200).json({message: 'yacht deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * view yacht
 */

export const viewYacht = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const yacht = await Yacht.findById(id);
        res.status(200).json(yacht);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * filter yacht
 */

export const filterYacht = async (req, res) => {
    const {type, location, date, search} = req.body;
    try {
        let filter = {};

        if (type) {
            filter.type = type;
        }

        if (location) {
            filter.location = location;
        }

        if (search) {
            filter.name = {$regex: search, $options: 'i'};
        }

        if (date) {
            const reservations = await Reservation.find({date: new Date(date)});
            filter._id = {$nin: reservations.map(r => r.yacht)};
        }

        const yachts = await Yacht.find(filter);

        res.json(yachts);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * update yacht
 */

export const updateYacht = async (req, res) => {
    const {id} = req.params;
    const {fleetName, length, capacity, price, rooms, location, type, description, fuelType, fuelCapacity} = req.body;
    try {
        const yacht = await Yacht.findById(id);
        if (yacht) {
            yacht.name = fleetName;
            yacht.length = length;
            yacht.capacity = capacity;
            yacht.price = price;
            yacht.rooms = rooms;
            yacht.location = location;
            yacht.type = type;
            yacht.description = description;
            yacht.fuelType = fuelType;
            yacht.fuelCapacity = fuelCapacity;
            if (req.file) {
                yacht.image = req.file.filename;
            }
            await yacht.save();
            res.status(200).json({message: 'yacht updated successfully'});
        } else {
            throw new Error('yacht not found');
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * fuel refill
 */

export const fuelRefill = async (req, res) => {
    const {id, amount} = req.body;


    try {
        const yacht = await Yacht.findById(id);
        if (yacht) {
            yacht.fuelRefill.push({amount});
            await yacht.save();
            res.status(200).json({message: 'fuel refill successfully'});
        } else {
            throw new Error('yacht not found');
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * add maintenance
 */
export const addMaintenance = async (req, res) => {
    const {id, latestDate, nextDate, description} = req.body;

    try {
        const yacht = await Yacht.findById(id);
        if (yacht) {
            yacht.maintenance.push({latestDate, nextDate, description});
            await yacht.save();
            res.status(200).json({message: 'maintenance added successfully'});
        } else {
            throw new Error('yacht not found');
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * get maintenance
 */
export const getAllYachtMaintenanceDetails = async (req, res) => {
    try {
        const yachts = await Yacht.find();

        const yachtMaintenanceDetails = yachts.map((yacht) => {
            const latestMaintenanceRecord =
                yacht.maintenance.length > 0
                    ? yacht.maintenance.sort(
                        (a, b) => b.latestDate - a.latestDate
                    )[0]
                    : null;
            const latestDate = latestMaintenanceRecord?.latestDate?.toISOString().slice(0, 10);
            const nextDate = latestMaintenanceRecord?.nextDate?.toISOString().slice(0, 10);
            const description = latestMaintenanceRecord?.description;
            return {
                _id: yacht._id,
                Name: yacht.name,
                latestMaintenanceDate: latestDate,
                nextMaintenanceDate: nextDate,
                maintenanceDescription: description,
            };
        });

        // Return the array of yacht maintenance details to the client
        res.json(yachtMaintenanceDetails);
    } catch (error) {
        // Handle errors
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};

