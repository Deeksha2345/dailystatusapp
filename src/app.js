const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const cors = require("cors");
require("./db/conn");
const User = require("./models/register");
// const Status = require("./models/status");

const { json } = require("express");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.render("index")
});


app.post("/adduser", async (req, res) => {
  try {
    const { firstname, lastname, email, password, mobilenumber } = req.body
    console.log(firstname, lastname, email, password, mobilenumber);

    if (password) {

      const registerEmployee = await new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        mobilenumber: req.body.mobilenumber,
        userType: "Intern"
      })

      const registered = await registerEmployee.save();
      res.status(201).send(registered);
      console.log(registered, "this is data");
    }
    else {
      res.send("passworld are not matching")
    }

  } catch (error) {
    res.status(400).send(error);
  }
});


app.get("/users", async (req, res) => {
  User.find({})
    .select('firstname lastname email mobilenumber')
    .then(result => {
      // console.log("No erroe yet");
      res.status(200).json({ userData: result })
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ err: error });
    })

  // try{
  //   // const user = await Register.find({}, (error)=>{
  //   //   if(error){
  //   //     res.status(400).send("Database Error");
  //   //   }
  //   // })
  //   // res.json(user);
  //   Register.find()
  //   .then(result => {
  //     res.status(200).json({ userData: result })
  //   });

  // }catch(error){
  //   console.log(error);
  //   res.status(500).json({err:error});
  // }
  // console.log("Get Request");
})


app.post("/addstatus", async (req, res) => {

  try {
    const userEmail = req.body.email;
    const userstatus = {
      title: req.body.title,
      description: req.body.description,
      timestamp: req.body.timestamp
    }

    const user = await User.findOne({email:userEmail});
    user.statuses.push(userstatus);  
    user.save();
    res.json({user:user});
      // (err,foundUser)=>{}
      // foundUser.statuses.push(userstatus);
      // foundUser.save`();
      
      // res.json({ user: foundUser, status: userstatus });
    
    // const status = await userstatus.save()
  }
  catch (e) {
    res.status(400).json({error:e});
  }
});

// app.post("/addstatus", async (req, res) => {

//   try {
//     const userstatus = new Status({
//       title: req.body.title,
//       description: req.body.description,
//       timestamp: req.body.timestamp
//     })
//     const status = await userstatus.save()
//     res.json({ Status: status });
//   }
//   catch (e) {
//     res.send(e)
//   }
// });

app.get("/statuses", async (req, res) => {

  User.find({})
    .select('email statuses')
    .then(result => {
      res.status(200).json({ userDetail: result })
    })
    .catch(err => {
      console.log(error);
      res.status(500).json({ err: error });
    })
})

app.post("/statuses", async function (req,res){
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  res.status(200).json({user:user});

});


app.post("/login", async (req, res) => {
  try {
    const uemail = req.body.email;
    const upassword = req.body.password;
    const user = await User.findOne({ email: uemail });
    const passwordmatch = await bcrypt.compare(upassword, user.password);
    console.log("Password match status "+passwordmatch);

    if (passwordmatch) {
      res.status(201).json({status:"success", user:user});
    }
    else {
      res.json("invalid login Details");
    }
  } catch (error) {
    res.status(400).json("Try and Catch error");  
  }
})


app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
})
module.exports = app;