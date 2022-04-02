import jwt from "jsonwebtoken";

import config from "../config.js";

const genToken = (id) => (
    jwt.sign(
        { id }, // put user id into payload
        config.jwt_secret,
        { expiresIn: '30d', }
    )
);

export default genToken;