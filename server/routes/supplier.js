/**
 * view supplier list
 */
import User from "../models/user.js";

export const viewSupplier = async (req, res) => {
    try {
        const suppliers = await User.find({role: 'supplier'}, {
            name: 1,
            phone: 1,
            _id: 1,
            address: 1,
            email: 1,
            category: 1,
            role: 1,
            location: 1,
            nic: 1,
        });
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**
 * delete supplier
 */

export const deleteSupplier = async (req, res) => {
    const {id} = req.params;
    try {
        const supplier = await User.findById(id);
        if (!supplier) {
            throw new Error('supplier not found');
        }
        await supplier.remove();
        res.status(200).json({message: 'supplier deleted successfully'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**
 * update supplier
 */

export const updateSupplier = async (req, res) => {
    const {id} = req.params;
    const {name, phone, email, address, category, role, location, nic} = req.body;
    try {
        const supplier = User.findById(id);
        if (!supplier) {
            throw new Error('supplier not found');
        }
        supplier.name = name;
        supplier.phone = phone;
        supplier.email = email;
        supplier.address = address;
        supplier.category = category;
        supplier.role = role;
        supplier.location = location;
        supplier.nic = nic;

        await supplier.save();
        res.status(200).json({message: 'supplier updated successfully'});

    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**
 * get supplier count
 */
export const getSupplierCount = async (req, res) => {
    try {
        const count = await User.countDocuments({role: 'supplier'});
        res.status(200).json({count});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

