const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:')

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.BLOB('long'),
    }
},
{
    sequelize,
    modelName: 'Product'
});

function init() {
    createProductTable();
}

init();

async function createProductTable() {
    await Product.sync();
}