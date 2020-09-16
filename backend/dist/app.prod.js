"use strict";var createError=require("http-errors"),express=require("express"),path=require("path"),cookieParser=require("cookie-parser"),logger=require("morgan"),indexRouter=require("./routes/index"),usersRouter=require("./routes/users"),v1Router=require("./routes/v1"),app=express();app.set("views",path.join(__dirname,"views")),app.set("view engine","jade"),app.use(logger("dev")),app.use(express.json()),app.use(express.urlencoded({extended:!1})),app.use(cookieParser()),app.use(express.static(path.join(__dirname,"public"))),app.use(function(e,r,s){r.header("Access-Control-Allow-Origin","http://localhost:8080"),r.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),s()}),app.use("/",indexRouter),app.use("/users",usersRouter),app.use("/v1",v1Router),app.use(function(e,r,s){s(createError(404))}),app.use(function(e,r,s,p){s.locals.message=e.message,s.locals.error="development"===r.app.get("env")?e:{},s.status(e.status||500),s.render("error")}),module.exports=app;