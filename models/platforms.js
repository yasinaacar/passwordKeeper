const DataTypes=require("sequelize");
const sequelize=require("../data/db");

const Platform=sequelize.define("platforms",{
    platformName:{
        type: DataTypes.STRING,
        allowNulls: false,
        validate:{
            notEmpty:{
                msg: "Platform Name can't be null"
            },
            len:{
                args: [2],
                msg: "Platform Name must be minimum 2 characters"
            }
        }
    },
    logo:{
        type: DataTypes.STRING,
    },
    link:{
        type: DataTypes.STRING,
    },
    userName:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
    },
    phone:{
        type: DataTypes.STRING,
    },
    recoveryMail:{
        type: DataTypes.INTEGER,
    },
    recoveryCode:{
        type: DataTypes.STRING,
    },
    isFavorite:{
        type: DataTypes.BOOLEAN,
    },
    platformCode:{
        type: DataTypes.STRING,
    }
},{
    timestamps: true
});

module.exports=Platform;