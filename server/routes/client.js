import User from "../models/user.js";

export const viewProfile = async (req, res) => {
    try {
        const id = req.query.id;
        const user = await User.findById(id);

        const {name, email, phone, address} = user;
        res.status(200).json({name, email, phone, address});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}