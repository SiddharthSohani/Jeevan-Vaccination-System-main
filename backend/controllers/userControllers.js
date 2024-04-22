const asyncHandler  = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require("../utils/generateToken");

const checkAadhaar =  asyncHandler(async (req,res) => {

    const {  aadhaar } = req.body;
    const aadhaarExists = await User.findOne({ aadhaar });

    if(aadhaarExists){
        res.status(400);
        res.json({
            msg:"Aadhaar Already exist",
        })
    }
    else{
        res.json({msg:"New Aadhaar"});
    }
})

const registerUser = asyncHandler(async (req,res) => {

    const { accountType, name, aadhaar, email, password, secretCode, phone, age, dob, gender } = req.body;
    const user = await User.create({
        accountType, name, email, password,secretCode, phone, age, dob, gender, aadhaar
    });

    if(user) {
        res.status(201).json({
            _id:user._id,
            accountType:user.accountType,
            name:user.name,
            aadhaar:user.aadhaar,
            email:user.email,
            phone:user.phone,
            age:user.age,
            dob:user.dob,
            gender:user.gender,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        res.json({
            msg:"Error Occured During Register",
        })
    }
});

const loginFirst = asyncHandler(async (req,res) => {
    const { aadhaar, password } = req.body;

    const user = await User.findOne({aadhaar});

    if(user && (await user.matchPassword(password))){
        res.json({msg:"Correct Aadhaar number and password"});
    }
    else{
        res.status(400);
        res.json({
            msg:"Invalid Credentials",
        })
    }
});

const authUser = asyncHandler(async (req,res) => {
    const { aadhaar, password , secretCode } = req.body;

    const user = await User.findOne({aadhaar});

    if(user && (await user.matchPassword(password))){
            if(user.secretCode ==  secretCode){
                res.json({
                    _id:user._id,
                    accountType:user.accountType,
                    name:user.name,
                    email:user.email,
                    phone:user.phone,
                    age:user.age,
                    dob:user.dob,
                    gender:user.gender,
                    aadhaar:user.aadhaar,
                    token:generateToken(user._id),
                })
            }
            else{
                res.status(400);
                res.json({
                    msg:"Incorrect Secret Code",
                })
                } 
    }
    else{
        res.json({
            msg:"Invalid Credentials",
        })
        res.Error("Invalid Credentials");
    }
});

const editprofile = asyncHandler(async (req,res) => {

    const {accountType, name, aadhaar, age, dob , gender, email, phone} = req.body;

    const user = await User.findOne({ aadhaar });

    if(user){

        user.accountType = accountType || user.accountType ;
        user.name = name || user.name ;
        user.aadhaar = aadhaar || user.aadhaar ;
        user.age = age || user.age ;
        user.dob = dob || user.dob ;
        user.gender = gender || user.gender ;
        user.email = email || user.email ;
        user.phone = phone || user.phone ;
    }
    else{
        res.status(400);
            res.json({
                msg:"Error Occured During updating",
            })
    }

    const updatedUser = await user.save();

    res.json(updatedUser);

});

const editCredentials =  asyncHandler(async (req,res) => {

    const { aadhaar , password , secretCode , newPassword , newSecretCode } = req.body;
    
    const user = await User.findOne({ aadhaar });

    if(user && (await user.matchPassword(password))){
        if(user.secretCode == secretCode){
            user.password = newPassword;
            user.secretCode = newSecretCode;
            const updatedUser = await user.save();

        res.json({
            msg:"Credentials updated successfully",
        });
        }else{
            res.status(400);
            res.json({
                msg:"Invalid Secret Code",
            })
            res.Error("Invalid Secret Code");
        }
    }
    else{
        res.status(400);
        res.json({
            msg:"Invalid Credentials",
        })
        res.Error("Invalid Credentials");
    }


});

const deleteProfile =  asyncHandler(async (req,res) => {

    const { aadhaar, password, secretCode } = req.body;
    
    const user = await User.findOne({ aadhaar });

    if(user && (await user.matchPassword(password))){
        if(user.secretCode ==  secretCode){
            await user.remove();
            res.json({message:"Deleted User Successfully"});
        }
        else{
            res.status(400);
            res.json({
                msg:"Secret Code doesnot matches",
            })
        }
    }
    else{
        res.status(400);
        res.json({
            msg:"User doesnot Exists or error during deleting user",
        })
    }
});

const userExists =  asyncHandler(async (req,res) => {

    const aadhaar = req.params.aadhaar;

    const user = await User.findOne({ aadhaar });

    if(user){
        res.json(user);
    }
    else{
        res.status(400);
        res.json({msg:"User Doesnot Exist"});
    }
})

const forgetPassword =  asyncHandler(async (req,res) => {

    const { aadhaar , email , phone , newPassword } = req.body;
    
    const user = await User.findOne({ aadhaar });

    if(user){
        if(user.email == email && user.phone == phone){
            user.password = newPassword;
            const updatedUser = await user.save();
            res.json({
                msg:"Reset Password Successfully",
            });
        }else{
            res.status(400);
            res.json({
                msg:"Invalid Email or phone number",
            });
        }
    }
    else{
        res.status(400);
        res.json({
            msg:"Invalid User Info",
        })
    }
});

const forgetSecretCode =  asyncHandler(async (req,res) => {

    const { aadhaar , email , phone , newSecretCode } = req.body;
    
    const user = await User.findOne({ aadhaar });

    if(user){
        if(user.email == email && user.phone == phone){
            user.secretCode = newSecretCode;
            const updatedUser = await user.save();
            res.json({
                msg:"Reset SecretCode Successfully",
            });
        }else{
            res.status(400);
            res.json({
                msg:"Invalid Email or phone number",
            });
        }
    }
    else{
        res.status(400);
        res.json({
            msg:"Invalid User Info",
        })
    }
});


module.exports = { registerUser, checkAadhaar , loginFirst, authUser, editprofile, editCredentials, userExists, deleteProfile, forgetPassword, forgetSecretCode } ;


