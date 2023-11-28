//express
const express=require("express");
const app=express();


const cookieParser=require("cookie-parser");
const session=require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//routes
const userRoutes=require("./routes/user");
const authRoutes=require("./routes/auth");
const adminRoutes=require("./routes/admin");

//node modules
const path=require("path");

//custom modules
const sequelize = require("./data/db");
const dummyData=require("./data/dummy-data");
const locals=require("./middlewares/locals");


//template engine
app.set("view engine","ejs");

//configurate static files
app.use("/libs",express.static(path.join(__dirname,"node_modules")));
app.use("/static",express.static(path.join(__dirname,"public")));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(session({
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000*60*60*12 //keep it for 12 hours
    },
    store:new SequelizeStore({
        db: sequelize
    })
}));
app.use(locals)

app.use("/auth",authRoutes);
app.use("/admin",adminRoutes);
app.use(userRoutes);
app.use("*", (req,res)=>{
    res.status(404).render("error/404", {title: "not found"});
})

//database moddels
const Emails=require("./models/emails");
const Platforms=require("./models/platforms");
const Categories=require("./models/categories");
const platformCategory=require("./models/platformCategory");
const userRoles=require("./models/userRoles");
const Users=require("./models/user");
const Roles=require("./models/roles");

//associations
Platforms.belongsTo(Users);
Users.hasMany(Platforms);

Emails.belongsTo(Users);
Users.hasMany(Emails);

Categories.belongsTo(Users);
Users.hasMany(Categories);

Users.belongsToMany(Roles,{through:userRoles});
Roles.belongsToMany(Users,{through:userRoles});

Emails.hasMany(Platforms)
Platforms.belongsTo(Emails);


Platforms.belongsToMany(Categories,{through:platformCategory});
Categories.belongsToMany(Platforms,{through:platformCategory});



//database connection
(async()=>{
    // await sequelize.sync({force:true});
    // await dummyData();
})();


app.listen(3000,()=>{
    console.log("waiting for port 3000...")
})