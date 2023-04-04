/**
 * Register a new user
 */
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req, res) => {
    try {
        const {name, email, password, phone, address, role, branch, nic, city, category, location } = req.body;

        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({message: 'Please enter all fields'});
        }

        const user = await User.findOne({email});

        if (user) {
            return res.status(400).json({message: 'This email already exists'});
        }


        if (password.length < 6) {
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const newUser = new User({name, email, password: passwordHash, phone, address, role, branch, nic, city, category, location });
        const userAdded = await newUser.save();

        res.status(201).json({message: 'User created successfully'});


    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message});
    }
}

/**
 * Login a user
 */

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        const loggedUser = {
            token,
            id: user._id,
            name: user.name,
            role: user.role,
        };

        res.status(200).json({ user: loggedUser });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
