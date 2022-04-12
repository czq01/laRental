import bcrypt from 'bcryptjs'
import { errorMonitor } from 'events';
import User from "../models/User.js";
import genToken from '../utils/jwt.js';

// @desc    Register new user
// @route   POST /user
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // check form
    if (!name || !email || !password) {
        res.status(400).send({
            succuss: false,
            message: 'Please add all fields'
        })
    }

    // check user existence by email
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).send({
            succuss: false,
            message: 'User already exists'
        });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    // Create user for the db
    const user = await User.create({
        name,
        email,
        password: hashedPwd
    });

    if (user) {
        res.status(201).send({
            success: true,
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: genToken(user._id),
            }
        });
    } else {
        res.status(400).send({
            success: false,
            message: 'Invalid user data'
        });
    }
};

// @desc    User login
// @route   POST /user/login
// @access  Public
const loginUser = async (req, res) => {
    // Get form
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({email});
    // Check password
    if (user && await (bcrypt.compare(password, user.password))) {
        res.status(201).send({
            success: true,
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: genToken(user._id)
            },
        });
    } else {
        res.status(400).send({
            success: false,
            message: 'Invalid email or password'
        });
    }

}

// @desc    Get User info (test jwt auth)
// @route   GET /user/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).send(req.user);
};

// @desc    Get user by user id
// @route   GET /user/:user_id
// @access  Public 
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);
        res.status(200).send({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

export {
    registerUser, 
    loginUser, 
    getMe,
    getUserById
};