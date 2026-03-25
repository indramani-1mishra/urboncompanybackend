import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (res, userId, role) => {
    const token = jwt.sign({ id: userId, role }, process.env.JWT_SECRET || 'secret', {
        expiresIn: '30d',
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        const user = await User.create({ name, email, password, role });
        if (user) {
            generateToken(res, user._id, user.role);
            res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id, user.role);
            res.json({ _id: user._id, name: user.name, email: user.email, role: user.role });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logoutUser = (req, res) => {
    res.cookie('token', '', { 
        httpOnly: true, 
        expires: new Date(0),
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getMe = async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
};
