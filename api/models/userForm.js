const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db_sequelize');

const UserForm = sequelize.define('user_form', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'user_form', 
    timestamps: false, 
});

module.exports = UserForm;
