/**
 * create a new package
 */
import Package from "../models/package.js";

export const createPackage = async (req, res) => {
    const { name, description, price, duration, features } = req.body;
    try {
        await new Package({
            name,
            description,
            price,
            duration,
            features: features.split(',').map(feature => feature.trim())
        }).save();
        res.status(201).json({message: 'Package created successfully'});
    } catch (err) {
        console.log(err);
        res.status(400).send({message: err.message});
    }
}

/**
 * get all packages
 */
export const getPackages = async (req, res) => {
    try {
        const packages = await Package.find({}).sort({ price: 1 }).exec();
        res.json(packages);
    } catch (err) {
        console.log(err);
    }
}

/**
 * get a single package
 */

export const readPackage = async (req, res) => {
   const id = req.params.id;
    try {
        const packages = await Package.findById(id).exec();
        res.json(packages);
    } catch (err) {
        console.log(err);
    }
}

/**
 * delete a package
 */

export const deletePackage = async (req, res) => {
    const id = req.params.id;
    try {
        await Package.findByIdAndDelete(id).exec();
        res.json({ message: 'Package deleted' });
    } catch (err) {
        res.status(400).send('Delete package failed');
    }
}