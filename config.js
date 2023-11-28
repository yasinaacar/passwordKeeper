const config={
    db:{
        host: "localhost",
        user: "root",
        password: "<your mysql password>",
        database: "<your database schema name>"
    },
    email:{
        username: "<username>", //username of your mail account
        password: "<password>", //password of your mail account
        from: "<email>" //email of your mail account
    }
}


//exports config to for other pages
module.exports=config;