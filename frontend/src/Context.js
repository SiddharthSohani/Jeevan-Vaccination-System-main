import React, { useState, createContext } from "react";
import { saveAs } from 'file-saver';
import axios from 'axios';

export const Step = createContext();

const Context = ({children}) => {

    const [step, setStep] = useState(1);

    const download = (id,vaccineName,noOfDose) => {
      axios.get(`/patient/moreinfo/${id}`)
      .then(res => {
        axios.post('/create-pdf',{
          'Vacccine_Name': res.data.vaccineName,
          'Vaccinated_To' : res.data.patientName,
          'Vaccinated_By' : res.data.doctorName,
          'Aadhaar_No': res.data.aadhaar,
          'Vaccination_Status': ( res.data.fullyVaccinated === true ) ? " Fully Vaccinated" : "Partially Vaccinated ",
          'Dose_Number': res.data.noOfDose,
          'Date_of_Dose' : res.data.vaccinatedOn,
          'Age' : res.data.patientAge,
          'Gender' : res.data.patientGender,
          'Vaccinated_At' : res.data.hospital,
          'Remaining_Number_of_Dose' : res.data.remainedNoOfDose,
          'NextDose_On' : res.data.nextDoseOn
        })
        .then(() => axios.get('/fetch-pdf',{ responseType:'blob'}))
        .then((res) => {
        const pdfBlob = new Blob([res.data],{ type: 'application/pdf' })
        saveAs(pdfBlob,`${vaccineName}Dose${noOfDose}`);
      })
      })
      .catch(err => {
        console.log(err);
      })
    }

  return (
    <Step.Provider value={{step, setStep, download}}>{children}</Step.Provider>
  )
}

export default Context;