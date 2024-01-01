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

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({where: {username: username}})
            .then((user)=> {
                if(user === null){
                    return res.status(404).json({
                        message: 'user not found',
                    });
                }
                else{
                    bcrypt.compare(password, user.password, (error, result) => {
                        if (error) {
                            return res.json({
                                error: error.message,
                                message: error.stack,
                            });
                        }
                        else {
                            if (!result) {
                                return res.status(401).json({
                                    message: 'Please Enter correct password',
                                });
                            }
                            else{
                                const maxAge = 60 * 60;
                                const token = jwt.sign({id: user.id, username, role: user.role},
                                    JWT_SECRET,
                                    {
                                        expiresIn: maxAge,
                                    });

                                res.cookie('jwt', token, {
                                    httpOnly: true,
                                    maxAge: maxAge * 1000,
                                    secure: false,
                                    sameSite: 'None'
                                });
                                res.status(201).json({
                                    message: 'username and password is correct',
                                    data: user,
                                })
                            }
                        }
                    })
                }
            })
        
    } catch (error) {
        res.json({
            error: error.message,
            message: error.stack,
        })
    }

}

module.exports = {
    registerUser,
    getAllUsers,
    login,
}