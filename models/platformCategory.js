const { DataTypes } = require("sequelize");
const sequelize=require("../data/db");

const platformCategory=sequelize.define("platformCategory",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNulls: false,
    }
});

module.exports=platformCategory;