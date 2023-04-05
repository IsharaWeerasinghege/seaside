/**
 * view crew list
 */
import User from "../models/user.js";

export const viewCrewList = async (req, res) => {
    try {
        const crewList = await User.find({role: {$nin: ['user', 'supplier']}}, {
            name: 1,
            phone: 1,
            _id: 1,
            address: 1,
            email: 1,
            branch: 1,
            role: 1,
            nic: 1
        });
        res.status(200).json(crewList);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**
 * delete crew member
 */
export const deleteCrewMember = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({message: ' deleted successfully'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**
 * update crew member
 */

export const updateCrewMember = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    const {name, phone, email, address, branch, role} = req.body;
    try {
        const crewMember = await User.findById(id);
        if (!crewMember) {
            throw new Error('crew member not found');
        }
        crewMember.name = name;
        crewMember.phone = phone;
        crewMember.email = email;
        crewMember.address = address;
        crewMember.branch = branch;
        crewMember.role = role;
        await crewMember.save();
        res.status(200).json({message: 'crew member updated successfully'});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**
 * get crew member
 */
export const getCrewMember = async (req, res) => {
    const {id} = req.params;
    try {
        const crewMember = await User.findById(id);
        if (!crewMember) {
            return res.status(404).json({ message: 'Crew member not found' });
        }
        res.status(200).json(crewMember);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
