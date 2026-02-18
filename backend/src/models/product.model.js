import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';

const Product = sequelize.define(
    'Product',
    {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: DataTypes.TEXT,
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {min: 0}
        }
    },
    {timestamps: true}
);

export default Product;
