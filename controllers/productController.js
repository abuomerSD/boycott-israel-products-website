const { Product } = require('../database/databaseHandler')

const getAllProducts =  async (req, res) => {
    res.json({
        message: 'test',
    })
}

const createProduct = async (req, res) => {
    const { name } = req.body;

    if(!name) {
        return res.status(400).json({
            message: 'Please enter the Product Name'
        });
    }

    try {
        await Product.create({name})
        .then(()=> {
            res.json({
                message: 'done'
            })
        })
        
    } catch (err) {
        res.status(400).json({
            message: err.message,
        })
    }
        
        
}



module.exports = {
    getAllProducts,
    createProduct,
}