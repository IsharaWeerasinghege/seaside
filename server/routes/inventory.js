import Yacht from "../models/yacht.js";
import InventoryItem from "../models/inventory.js";

/**
 * get inventory by id
 */
export const addInventoryItems = async (req, res) => {
    const { yachtId, food, beverage, water } = req.body;

    try {
        const yacht = await Yacht.findById(yachtId);

        if (!yacht) {
            res.status(404).json({ message: 'Yacht not found' });
            return;
        }

        const inventoryItem = new InventoryItem({
            food,
            beverage,
            water
        });

        await inventoryItem.save();

        yacht.items.push(inventoryItem._id);

        await yacht.save();

        res.status(201).json({ message: 'Inventory item added to yacht' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


/**
 * get all inventory
 */

export const getInventory = async (req, res) => {
    try {
        const yachts = await Yacht.find().populate('items');

        const yachtData = yachts.map(yacht => ({
            id: yacht._id,
            name: yacht.name,
            location: yacht.location,
            inventory: yacht.items.map(item => ({
                food: item.food,
                beverage: item.beverage,
                water: item.water
            }))
        }));

        res.status(200).json(yachtData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * get inventory by id
 */

export const getInventoryById = async (req, res) => {
    try {
        const yacht = await Yacht.findById(req.params.id).populate({path: 'items', options:{
                sort: {createdAt: -1}
            }});

        const yachtData = {
            name: yacht.name,
            inventory: yacht.items
        };

        res.status(200).json(yachtData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
