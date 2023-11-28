const { DataTypes } = require("sequelize");
const sequelize=require("../data/db");

const userRoles=sequelize.define("userRoles",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNulls: false,
    }
});

module.exports=userRoles;