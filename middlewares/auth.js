const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const userAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if(err) {
                return res.status(401).json({ message: 'Not authorized' })
            }
            else{
                if (decodedToken.role !== 'admin') {
                    return res.status(401).json({ message: 'Not authorized user, not admin' });
                } else {
                    next();
                }
            }
        })
    } else {
        return res.status(401).json({
            message: 'Not authorized, token not found'
        })
    }
}


module.exports = { userAuth };