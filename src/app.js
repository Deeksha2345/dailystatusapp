const express = require("express");
// var MongoClient = require('mongodb').MongoClient
//Create a database named "mydb":
var url = "mongodb://localhost:27017/mydatabase1";


// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   console.log("hi")
//   db.close();
// });

const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");


require("./db/conn");
const Register = require("./models/registers");
const { json } = require("express");
const port = process.env.PORT || 3000;
const static_path= path.join(__dirname , "../public");
const template_path= path.join(__dirname , "../templates/views");
const partials_path= path.join(__dirname , "../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/" , (req,res) => {
    res.render("index")
});


app.post("/status/submit" , (req,res) => {
    var payload= req.body;
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;
    //     var dbo = db.db("mydatabase1");
        
    //     dbo.collection("status").insertOne(payload, function(err, res) {
    //       if (err) throw err;
    //       console.log("1 document inserted");
    //       db.close();
    //     });
    //   });
   
    res.json({})
});
app.get("/status" , (req,res) => {
    res.json({name:'deeksha' , location:'moradabad'})
});
app.get("/register" , (req,res) => {
    res.json({name:'deeksha' , location:'moradabad'})
});

app.get("/login" , (req,res) => {
    res.render("login")
});

app.post("/register" , async(req,res) => {
    try{
       
        // const password=req.body.password;
        // const cpassword=req.body.confirmpassword;
        const {firstname, lastname,email,gender,phone,age,password,confirmpassword}=req.body
        console.log(firstname, lastname,email,gender,phone,age,password,confirmpassword);

        if(password===confirmpassword){

            const registerEmployee= await new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:req.body.password,
               confirmpassword:req.body.confirmpassword
            })


          const registered = await registerEmployee.save();
          res.status(201).send(registered);
          console.log(registered);

        }else{
          res.send("passworld are not matching")
        }

    }catch(error){
        res.status(400).send(error);
        console.log(error,"this is error");

    }
})

app.post("/login" , async(req,res) => {

    try{
        const email =req.body.email;
        const password =req.body.password;

        const useremail = await Register.findOne({email:email});

        if(useremail.password === password){

            res.status(201).render("index");

          }else{
              res.send("invalid login Details");
          }

    }catch(error){
        res.status(400).send("invalid login Details")

    }
})






app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})