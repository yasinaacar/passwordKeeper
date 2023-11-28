const { DataTypes } = require("sequelize");
const sequelize=require("../data/db");

const User=sequelize.define("user",{
    fullName:{
        type: DataTypes.STRING,
        allowNulls: false,
        validate:{
            notEmpty:{
                msg:"Full Name can't be empty"
            },
            isFullname(value){
                if(value.split(" ").length<2){
                    throw new Error("Please enter your name and surname. And be sure leave of space between")
                }
            }
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNulls: false,
        unique:{
            args: true,
            msg: "This E-Mail is already taken"
        },
        validate:{
            notEmpty:{
                msg: "E-Mail can't be null"
            },
            isEmail:{
                msg: "Please enter your full email address"
            }
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNulls: false,
        validate:{
            notEmpty:{
                msg: "Password can't be null"
            }
        }
    },
    token:{
        type: DataTypes.STRING,
        allowNulls: true
    },
    tokenExpirations:{
        type: DataTypes.DATE,
        allowNulls: true
    }
});

module.exports=User;