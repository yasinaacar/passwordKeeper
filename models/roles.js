const sequelize=require("../data/db");
const DataTypes=require("sequelize");


const Role=sequelize.define("role",{
    rolename:{
        type: DataTypes.STRING,
        validate: {
            notEmpty:{
                msg: "Role Name can't be null"
            },
            len:{
                args: [2],
                msg: "Role Name must be minimum 2 character"
            }
        }
    }
})

module.exports=Role;