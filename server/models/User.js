import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

import config from '../config.js'

const UserSchema = mongoose.Schema({
    // Account Info
    name: {
        type: String,
        required: [true, "User Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        immutable: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    avatar: {
        type: String,
        default: ''
    },

    // Personal Info
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    age: {
        type: Number,
    },
    occupation: {
        type: String
    },
    desc: {
        type: String,
        maxLength: 120
    },

    // Relationships

    // List of house resources that this user likes
    houses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
    }],

    // List of requests that this user sent
    requests: [{
        request: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Request'
        },
        // Normalize post id here
        post_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    }],

    // List of posts that this user publish
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        // Hash password
        const salt = Number(config.bcrypt_salt)
        const hashedPwd = await bcrypt.hash(this.password, salt);
        this.password = hashedPwd
    }
    next()
})


export default mongoose.model("User", UserSchema);