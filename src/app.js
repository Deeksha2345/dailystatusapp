const express = require("express");

const app = express();
const path = require("path");

const bcrypt = require("bcryptjs");
require("./db/conn");
const Register = require("./models/register");

const { json } = require("express");
const port = process.env.PORT || 3000;




app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get("/" , (req,res) => {
    res.render("index")
});




app.post("/register" , async(req,res) => {



  try{
     const {name,email,password,phone}=req.body
      console.log(name,email,password,phone);

      if(password){
        

          const registerEmployee= await new Register({

              name:req.body.name,
              email:req.body.email,
              password:req.body.password,
              phone:req.body.phone,
             })
        const registered = await registerEmployee.save();
        
        res.status(201).send(registered);
        console.log(registered,"this is data");

      }else{
        
        res.send("passworld are not matching")
      }

  }catch(error){
      res.status(400).send(error);
     

  }
  
  
  });

  app.post("/login" , async(req,res) => {

     try{
      
        const uemail =req.body.email;
        const upassword =req.body.password;
 
        const user = await Register.findOne({email:uemail});
      

        const passwordmatch = await bcrypt.compare(upassword,user.password);
        console.log(passwordmatch);
     
      

        if(passwordmatch){

            res.status(201).send(user);

          }else{
              res.send("invalid login Details");
          }

    }catch(error){
        res.status(400).send("invalid login Details")
        console.log(error);

    }
})
    
    app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})
module.exports = app;