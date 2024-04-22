const mongoose = require('mongoose');

const VaccinatedSchema = mongoose.Schema(
    
    {
        aadhaar:{
            type:Number,
            required:true,
            trim:true,
        },
        patientName:{
            type:String,
            required:true,
        },
        patientAge:{
            type:Number,
            required:true,
            trim:true,
        },
        patientGender:{
            type:String,
            required:true,
            trim:true,
        },
        vaccineName: {
            type:String,
            required:true,
            trim:true,
        },
        totalNoOfDose: {
            type:Number,
            required:true,
        },
        nextDoseOn: {
            type:Date,
            required:true,
        },
        noOfDose: {
            type:Number,
            required:true,
        },
        hospital:{
            type:String,
            required:true,
        },
        doctorName:{
            type:String,
            required:true,
        },
        vaccinatedOn:{
            type:Date,
            required:true,
            trim:true,
        },
        partiallyVaccinated:{
            type:Boolean,
            required:true,
            trim:true,
        },
        fullyVaccinated:{
            type:Boolean,
            required:true,
            trim:true,
        },
        remainedNoOfDose:{
            type:Number,
            required:true,
            trim:true,
        }
    },
    {
        timestamps:true,
    }
);

const Vaccinated = mongoose.model("Vaccinated", VaccinatedSchema);

module.exports = Vaccinated;    


