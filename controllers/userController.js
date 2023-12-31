const { User } = require('../database/databaseHandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    const { username, password, role } = req.body;

    if(!username || !password || !role) {
        return res.json({
            message: 'Please Enter all user details',
        })
    }
 
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ username, password: hashedPassword, role })
            .then((user)=> {
                const maxAge = 60*60;
                const token = jwt.sign({id:user.id, username, role}, JWT_SECRET, { expiresIn: maxAge});
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
                res.status(201).json({
                    message:'user created successfully',
                    user: {username, password: hashedPassword, role},
                })
            })
            
        
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: error.stack,
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: error.stack,
        })
    }
}
module.exports = {
    registerUser,
    getAllUsers,
}