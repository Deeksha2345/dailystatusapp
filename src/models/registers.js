const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");

const employeeSchema = new mongoose.Schema({
    firstname :{
        type:'string',
        required:true
    },
    lastname:{
        type:'string',
        isrequired: true
    },
    email:{
        type:'string',
        isrequired: true,
        // isunique:true
    },
    gender:{
        type:'string',
        isrequired: true
        
    },
      phone:{
        type:Number,
        isrequired: true,
        // isunique:true
    },
    age:{
        type:Number,
        isrequired: true
    },
    password:{
        type:'string',
        isrequired: true
    },
    confirmpassword:{
        type:'string',
        isrequired: true
    }
})

employeeSchema.pre("save", async function(next) {

  if(this.isModified("password")){

    console.log(`the current password is ${this.password}`);
    this.password= await bcrypt.hash(this.password,10);
    console.log(`the current password is ${this.password}`);
  }
  next();
})
const Register= new mongoose.model("Register",employeeSchema);

module.exports = Register;