const Role=require("../models/roles");
const User = require("../models/user");
const bcrypt=require("bcrypt");

let dummyData=async()=>{
    const roles=await Role.bulkCreate([
        {rolename: "Admin"},
        {rolename: "User"},
    ])

    const user= await User.create({fullName:"Password Keeper", email:"passwordkeeper@attempt.com", password: await bcrypt.hash("123456", 10)});

    await user.addRoles(roles[0]);
};

module.exports=dummyData;