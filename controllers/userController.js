const { User } = require('../database/databaseHandler');
const bcrypt = require('bcrypt');

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
            .then(()=> {
                res.status(201).json({
                    message:'user created successfully',
                    user: {username, password: hashedPassword, role},
                })
            })
        
    } catch (error) {
        res.status(400).json({
            message: error.stack,
        })
    }
}

const getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}
module.exports = {
    registerUser,
    getAllUsers,
}