const sequelize=require("../data/db");
const DataTypes=require("sequelize");

const Email=sequelize.define("emails",{
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:{
            args: true,
            msg: "This E-Mail already saved"
        },
        validate:{
            notEmpty:{
                msg: "E-mail can't be empty"
            },
            isEmail:{
                msg: "Please enter full email address with email type"
            }
        }
    },
    emailCode:{
        type: DataTypes.STRING,
    }
},
{timestamps: false});

module.exports=Email;

