const asyncHandler  = require('express-async-handler');
const Vaccinated = require('../models/vaccinatedModel');
const pdf = require('html-pdf');
const pdfTemplate = require('../documents');

const fetchVaccines = asyncHandler(async (req,res) => {
  const aadhaar = req.params.aadhaar;
  const vaccines = await Vaccinated.find({aadhaar});
  if(vaccines){
      res.json(vaccines);
  }
  else{
    res.status(400);
    res.json({
        msg:"No vaccines taken till now",
    })
  }
});

const moreInfo = asyncHandler(async (req,res) => {
  const vaccine = await Vaccinated.findById(req.params.id);
  if(vaccine){
    res.json(vaccine);
  }else{
    res.status(400);
    res.json({
        msg:"Vaccine Information not found"  
      })
  }
});

const createPdf = asyncHandler(async (req,res) => {
  pdf.create(pdfTemplate(req.body),{}).toFile('certificate.pdf',(err) => {
        if(err){
              res.send(Promise.reject());
        }
              res.send(Promise.resolve());
        });
});

const fetchPdf = asyncHandler(async (req,res) => {
  res.sendFile("C:\\projects\\avs\\certificate.pdf");
})

module.exports = { fetchVaccines , moreInfo, createPdf, fetchPdf } ;



