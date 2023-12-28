const {Sequelize, DataTypes, Model} = require('sequelize');

// const sequelize = new Sequelize('sqlite::memory:')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "path/to/database.sqlite"
  });

// defining and creating the product table

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
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
    await sequelize.sync({force: true});
}

module.exports = {
    Product,
}