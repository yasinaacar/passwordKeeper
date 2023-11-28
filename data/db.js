//import config from the file named config.js 
const config=require("../config");

const Sequelize=require("sequelize");

//connecting to a database with sequelize

const sequelize=new Sequelize(config.db.database,config.db.user,config.db.password,{
    host: config.db.host,
    dialect: "mysql",
    define:{
        timestamps: false
    },
    storage: "./session.mysql"
});

//testing the database connection

let connectDb=async()=>{
    try {
        await sequelize.authenticate();
        console.log("*Database connection is complete...")
    } catch (err) {
        console.log("**Database connection is failed", err)
    }
}

connectDb();

module.exports=sequelize;