const { DataTypes } = require("sequelize");
const sequelize=require("../data/db");

const Category=sequelize.define("categories",{
    categoryName:{
        type: DataTypes.STRING,
        allowNulls: false,
        unique:{
            args: true,
            msg: "This category name is already on your list"
        },
        validate:{
            notEmpty:{
                msg: "Category Name can't be empty"
            },
            len:{
                args:[2, 25],
                msg: "Category Name must be between 2 and 25 characters"
            }
        }
    },
    categoryCode:{
        type: DataTypes.STRING,
    }
},
{timestamps: false})

module.exports=Category;