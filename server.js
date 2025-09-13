require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const PORT = process.env.PORT
const {createClient} = require("@supabase/supabase-js")
const SUPABASEURL = process.env.SUPABASEURL
const SUPABASEKEY = process.env.SUPABASEKEY
const SECRETKEY = process.env.SECRETKEY
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const supabase = createClient(SUPABASEURL,SUPABASEKEY)

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))
app.use(cookieParser())


//Routes
app.get("/",(req,res)=>{
    res.render("homepage")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/register",async(req,res)=>{
    let {username,email,password} = req.body
    try{
        if(!email || !username || !password){
            res.redirect("/register")
            console.log("username ,email and password cannot be empty!")
        }
        let {data:user} = await supabase
        .from("users")
        .select("username")
        .eq("username",username)
        .single()
        if(user){
            return res.redirect("/register")
            console.log("User already Exist!")
        } 
        else{
            let salt = await bcrypt.genSalt(12)
            let hash = await bcrypt.hash(password,salt)
            let {data,err} = await supabase
            .from("users")
            .insert([{
                username:username,
                email:email,
                password:hash
            }])
            if(err){
                return res.redirect("/register")
                console.log("Something Went Wrong!")
            }
            else{
                return res.send("User Registered!")
            }
        }
    }
    catch(error){
       return res.redirect("/register")
    }
})

app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/login",async(req,res)=>{
    let {email,password} = req.body
    try{
        if(!email || !password){
            return res.redirect("/login")
        }
        let {data:user,error} = await supabase
        .from("users")
        .select("*")
        .eq("email",email)
        .single()
        if(!user || error){
            return res.redirect("/register")
        }
        else{
            let valid = await bcrypt.compare(password,user.password)
            if(!valid){
                console.log("Something Went Wrong!")
                return res.redirect("/login")
            }
            else{
                let token = jwt.sign({email},SECRETKEY)
                res.cookie("token",token)
                res.redirect("/profile")
            }
        }
    }
    catch(error){
        res.redirect("/login")
    }
})

app.get("/logout",(req,res)=>{
    res.cookie("token","")
    res.redirect("/login")
})

//Protected Middleware
function isloggedin(req,res,next){
    let token = req.cookies.token
    try{
        if(!token){
            res.redirect("/login")
        }
        else{
            let data = jwt.verify(token,SECRETKEY)
            req.user = data
            next()
        }
    }
    catch(err){
        res.redirect("/login")
    }
}

//Protected Route
app.get("/profile",isloggedin,async(req,res)=>{
    let {data:user} = await supabase
    .from("users")
    .select("*")
    .eq("email",req.user.email)
    .single()
    console.log(user)
    res.render("profile",{user})
})
app.get("/weather",isloggedin,(req,res)=>{
    res.render("weather")
})
//Listening / Hosting
app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
})