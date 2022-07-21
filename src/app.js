const express = require("express");
const app = express();
const path = require("path");

const bcrypt = require("bcryptjs");
require("./db/conn");
const Register = require("./models/register");
const statusSchema = require("./models/status");

const { json } = require("express");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.render("index")
});


app.post("/adduser", async (req, res) => {
  try {
    const { firstname, lastname, email, password, mobilenumber } = req.body
    console.log(firstname, lastname, email, password, mobilenumber);

    if (password) {

      const registerEmployee = await new Register({

        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        mobilenumber: req.body.mobilenumber,
      })
      const registered = await registerEmployee.save();

      res.status(201).send(registered);
      console.log(registered, "this is data");

    } else {

      res.send("passworld are not matching")
    }

  } catch (error) {
    res.status(400).send(error);
  }
});



app.get("/adduser", async(req, res) => {
  
  mydatabase1.registers.find({},(err,user)=>{res.json(user)})


})
  
   

     
 



app.post("/addstatus", async (req, res) => {

  try {
    const userstatus = new statusSchema({

      title: req.body.title,
      description: req.body.description

    })
    const status = await userstatus.save()
    res.send(status);
  }


  catch (e) {
    res.send(e)

  }
});

app.get("/addstatus", (req, res) => {
  res.send("addstatus");

})







app.post("/login", async (req, res) => {

  try {

    const uemail = req.body.email;
    const upassword = req.body.password;

    const user = await Register.findOne({ email: uemail });


    const passwordmatch = await bcrypt.compare(upassword, user.password);
    console.log(passwordmatch);



    if (passwordmatch) {

      res.status(201).send(user);

    } else {
      res.send("invalid login Details");
    }

  } catch (error) {
    res.status(400).send("invalid login Details")
  }
})

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
})
module.exports = app;