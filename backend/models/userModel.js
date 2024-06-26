const mongoose = require('mongoose');
const bcrpyt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        accountType: {
            type:String,
            required:true,
            trim:true,
        },
        name: {
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase: true
        },
        password:{
            type:String,
            min:[6,"Passwords should have atleast 6 characters"],
            required:true,
        },
        secretCode:{
            type:Number,
            min:[4,"Passwords should have atleast 6 characters"],
            required:true,
        },
        phone:{
            type:Number,
            required:true,
            trim:true,
        },
        age:{
            type:Number,
            required:true,
            trim:true,
        },
        dob:{
            type:Date,
            required:true,
            trim:true,
        },
        gender:{
            type:String,
            required:true,
            trim:true,
        },
        aadhaar:{
            type:Number,
            required:true,
            trim:true,
            unique:true, 
        }
    },
    {
        timestamps:true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrpyt.compare(enteredPassword,this.password);
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrpyt.genSalt(10);
    this.password = await bcrpyt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema);

module.exports = User;    


