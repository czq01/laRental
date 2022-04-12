import jwt from 'jsonwebtoken';
import config from '../config.js';

import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;

    if ((req.headers.authorization) && 
    (req.headers.authorization.startsWith('Bearer'))) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, config.jwt_secret);

            // Get user from the token but not password
            req.user = await User.findById(decoded.id).select('-password');

            next();
            
        } catch (error) {
            res.status(401).send({
                success: false,
                message: 'Not authorized',
            })
        }
    } else {
        res.status(401).send({
            success: false,
            message: 'Not authorized, no token',
        });
    }
}

export { protect };