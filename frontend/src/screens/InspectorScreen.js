import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Badge} from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';

const InspectorScreen = () => {

  const [ aadhaar, setAadhaar ] = useState("");
  const [empty, setEmpty] = useState("Please search the patient for information");
  const [ vaccinationInfo, setVaccinationInfo ] = useState([]);
  const [ vaccines, setVaccines ] = useState([]);
  const [ selectedVaccine, setSelectedVaccine] = useState("All");
  const [ patientName, setPatientName] = useState("");
  const [ patientAge, setPatientAge] = useState("");
  const [ patientGender, setPatientGender] = useState("");

  const notify = (e) => {
    toast.error(e);
  }

  const resetFields = (e) => {
    e.preventDefault();
    setAadhaar("");
    setSelectedVaccine("All");
    setEmpty("Please search the patient for information");
  }

  const searchPatient = () => {
    if(aadhaar){
      if(aadhaar.length === 12){
        axios.get(`/inspector/getpatientinfo/${aadhaar}`)
        .then(res => {
          if(res.data.accountType === "Patient"){
            setEmpty("");
            setPatientName(res.data.name)
            setPatientAge(res.data.age)
            setPatientGender(res.data.gender)
            axios.get(`/inspector/${aadhaar}`)
            .then(res =>{
              if(selectedVaccine === "All"){
                setVaccinationInfo(res.data);
              }
              else{
                const resArr = res.data;
                const objectWeNeed = resArr.filter((object) => {
                  return object.vaccineName === selectedVaccine;
                })
                setVaccinationInfo(objectWeNeed);
              }
            })
            .catch(err => {
              notify("No Vaccine taken till now !!");
              console.log(err);
            })
          }
          else{
            notify("Enter Aadhaar Number is not a Patient");
          }
        })
        .catch(err => {
          notify("Invalid Aadhaar Number");
        })
      } 
      else{
        notify("Aadhaar must contain only 12 digits");
      }
    }
    else{
      notify("Please enter Aadhaar number");
    }
  }

  useEffect(() => {
    axios.get(`/inspector/vaccines`)
    .then(res => {
      var resArray = res.data;
      const blankData = {
        vaccineName: "All",
        _id: "0"
      }
      resArray.splice(0, 0, blankData);
      setVaccines(resArray);
    })
    .catch(err => {
      notify(err);
    })
  },[]);
  
  return (
    <>
    <ToastContainer/>
      <Container className='mt-4 m-auto' >
          <Button type="button" className="btn btn-light btn-sm mb-1" onClick={resetFields}>Clear</Button>
        <h4>Search The Patient</h4>
        <Form className="d-flex mt-3">
              <Form.Control type="number" className="form-control me-sm-2" 
                placeholder="Enter UIDAI number" name="aadhaar" 
                onChange={(e) => {
                  setAadhaar(e.target.value)
                  setEmpty("Please search the patient for information");
                  setVaccinationInfo("");
                }} 
                value={aadhaar} 
              />
              <select className="form-select" 
              name="vaccineName"
              value={selectedVaccine}
              onChange={(e)=>setSelectedVaccine(e.target.value)}
            >
              {
                (vaccines.length ===  0) ? 
                <>
                  <option value="">No Vaccine Found</option>
                </>
                :
                <>
                  {
                    vaccines.map(( vaccine ) => (
                      <option key={vaccine._id}>  
                        {vaccine.vaccineName}
                      </option>
                    ))
                  }
                </>
              }
              </select>
              <Button className="btn btn-success mx-1" onClick={searchPatient} >Search</Button>
        </Form>
        
        <h5 className='mt-4'>Patient Information</h5>
        {
          empty === "" ? 
          <>
            <ul className="list-group" style={{display:"flex",flexDirection:"column"}}>
              <li className="list-group-item accli">Patient Name : {patientName}</li>
              <li className="list-group-item accli">Patient Age : {patientAge}</li>
              <li className="list-group-item accli">Patient Gender : {patientGender}</li>
            </ul>
            <h5 className='mt-4'>Patient Vacccination Information</h5>
            {
            (vaccinationInfo.length === 0) ? 
              <>
                <ul className="list-group" style={{display:"flex",flexDirection:"column"}}>
                  <li className="list-group-item accli">No Vaccine Found<Badge bg="danger" className="m-1">Not Vaccinated</Badge></li>
                </ul>
              </>
              :
              <>
                {
                  vaccinationInfo.map((vaccine) => (
                    <ul className="list-group" style={{display:"flex",flexDirection:"column"}} key={vaccine._id}>
                      <li className="list-group-item accli"><Badge bg="info" className="m-1">{vaccine.vaccineName}</Badge>
                        {(vaccine.fullyVaccinated === true) ? 
                                <Badge bg="success" className="m-1"> Fully Vaccinated </Badge>
                              : <Badge bg="warning" className="m-1"> Partially Vaccinated </Badge>
                        }
                        <Badge bg="secondary" className="m-1">{vaccine.noOfDose} Dose</Badge>
                        <Badge bg="light" className="m-1">{vaccine.vaccinatedOn.slice(0,10)}</Badge>
                      </li>
                    </ul>
                ))
                }
              </>
            }
          </>
          :
          <>
            <ul className="list-group" style={{display:"flex",flexDirection:"column"}}>
              <li className="list-group-item accli">{empty}</li>
            </ul>
          </>
        }

        
        </Container>
      </>
    );
  };

  export default InspectorScreen;
















