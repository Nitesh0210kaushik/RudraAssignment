const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
dotenv.config({ path: '../config.env' })

const secret_key = process.env.JWT_SECRET_KEY || 'NITESHKAUSHIK!@#$%^&*';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, secret_key, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
module.exports = verifyToken