const {Sequelize, DataTypes, Model, UUIDV4} = require('sequelize');

// const sequelize = new Sequelize('sqlite::memory:')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "database/path/to/database.sqlite"
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

class User extends Model {}

User.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
    }
},
{
    sequelize,
    modelName: 'User',
})

function init() {
    createProductTable();
}

// init();

async function createProductTable() {
    await sequelize.sync({force: true});
    // await sequelize.sync();
}

module.exports = {
    Product,
    User,
    init,
}