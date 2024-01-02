const { Product } = require('../database/databaseHandler')
const jimp = require('jimp');

const getAllProducts =  async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(404).json({
            error: error.message,
            message: error.stack,
        })
    }
}

const createProduct = async (req, res) => {
    const { name, imagePath } = req.body;

    if(!name || !imagePath) {
        return res.status(400).json({
            message: 'Please enter the Product Name and Image',
        });
    }

    try {
        const jimpImageToBuffer = await jimp.read(imagePath).then((ele)=> {
            const mimeForImage = ele._originalMime;
            return ele.getBufferAsync(mimeForImage);
            
        });

        // console.log(`image in buffer : ${jimpImageToBuffer}`)

        const product = 
        await Product.create({name, image: jimpImageToBuffer})
            .then((product)=> {
                res.json(product)
            })
        
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: err.stack,
        })
    }
        
        
}

const getSingleProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findOne({where:{id}});
        res.json(product)
    } catch (error) {
        res.status(404).json({
            error: error.message,
            message: error.stack,
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const { name, imagePath } = req.body;
        const oldProduct = await Product.findOne({where:{id}});
        oldProduct.name = name;
        const jimpImageToBuffer = 
            await jimp.read(imagePath)
                        .then((ele)=> {
                            mimeForImage = ele._originalMime;
                            return ele.getBufferAsync(mimeForImage);
                        });
        
        oldProduct.image = jimpImageToBuffer;
        oldProduct.save();
        res.json(oldProduct);
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: error.stack,
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedRows = await Product.destroy({where:{id}});
        if(deletedRows > 0 ){
            res.json({
                message: 'Product Deleted Successfully'
            })
        }
        else{
            res.json({
                message: "can/'t delete this product",
            })
        }
    } catch (error) {
        res.status(400).json({
            error: error.message,
            message: error.stack,
        })
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}