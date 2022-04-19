import bcrypt from 'bcryptjs'
import { errorMonitor } from 'events';
import User from "../models/User.js";
import genToken from '../utils/jwt.js';
import config from '../config.js';

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

    // Create user for the db
    let user = await User.create({
        name,
        email,
        password,
    });

    user = await User.findById(user._id).lean()

    if (user) {
        // don't return password to the client
        delete user.password

        // add token attribute to current user
        user.token = genToken(user._id)

        res.status(201).send({
            success: true,
            user,
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
    const user = await User.findOne({ email }).lean();
    // Check password
    if (user && await (bcrypt.compare(password, user.password))) {

        // don't return password to the client
        delete user.password

        // add token attribute to current user
        user.token = genToken(user._id)

        res.status(201).send({
            success: true,
            user,
        });
    } else {
        res.status(400).send({
            success: false,
            message: 'Invalid email or password'
        });
    }

}

// @desc    Get current login user info 
// @route   GET /user/me
// @access  Private
const getMe = async (req, res) => {

    try {
        const me = await User.findById(req.user._id).lean();
        delete me.password
        res.status(200).send({
            success: true,
            user: req.user});
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }

};

// @desc    Get user by user id
// @route   GET /user/:user_id
// @access  Public 
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id).lean();

        if (!user) throw Error("User not exists.")

        // not return password
        delete user.password
        // not return some private fields
        delete user.houses
        delete user.requests
        delete user.email

        res.status(200).send({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

// @desc    Update User by user id
// @route   PUT /user/:user_id
// @access  Private
const updateUserById = async (req, res) => {
    try {
        const userToUpdate = await User.findById(req.params.user_id)


        if (!userToUpdate) throw Error("User not exists.")

        // Only the current login user can update their own profiles
        if (!userToUpdate._id.equals(req.user._id)) {
            throw Error("This is not your profile.")
        }

        // If change password
        if (req.body.password) {

            // Hash password
            const salt = Number(config.bcrypt_salt)
            const hashedPwd = await bcrypt.hash(req.body.password, salt);

            req.body.password = hashedPwd
        }

        // Update
        await userToUpdate.updateOne(req.body)

        res.status(200).send({
            success: true,
            data: userToUpdate
        })
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
        })
    }
}

export {
    registerUser,
    loginUser,
    getMe,
    getUserById,
    updateUserById,
};