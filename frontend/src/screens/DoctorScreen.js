import React, { useState } from 'react';
import { Button, Container, Form, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const InspectorScreen = () => {

  const navigate = useNavigate();
  const [empty, setEmpty] = useState("Please search the patient for information");
  const [ aadhaar, setAadhaar ] = useState("");
  const [ patientName, setPatientName] = useState("");
  const [ patientAge, setPatientAge] = useState("");
  const [ patientGender, setPatientGender] = useState("");

  const notify = (e) => {
    toast.error(e);
  }

  const resetFields = (e) => {
    e.preventDefault();
    setAadhaar("");
    setEmpty("Please search the patient for information");
  }

  const vaccinate = ( aadhaar ) => {
    localStorage.setItem("aadhaar", aadhaar);
    navigate(`/doctor/vaccinate/${aadhaar}`);
  }

  const searchPatient = () => {
    if(aadhaar){
      if(aadhaar.length === 12){
        axios.get(`/doctor/getpatientinfo/${aadhaar}`)
        .then(res => {
          if(res.data.accountType === "Patient"){
            setEmpty("");
            setPatientName(res.data.name)
            setPatientAge(res.data.age)
            setPatientGender(res.data.gender)
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
  
  return (
    <>
    <ToastContainer/>
      <Container className='mt-4 m-auto' >
      <Row className="text-center">
        <Col className="text-white p-0 m-0">
            Vaccinate Patient
        </Col>
        <Col>
        <Link to="/doctor/vaccines/information">
          <Button className="btn btn-success m-0" >Vaccines Information</Button>
        </Link>
        </Col>
      </Row>
      <hr />
          <Button type="button" className="btn btn-light btn-sm mb-1" onClick={resetFields}>Clear</Button>
        <h4>Search The Patient</h4>
        <Form className="d-flex mt-3">
              <Form.Control type="number" className="form-control me-sm-2" 
                placeholder="Enter UIDAI number" name="aadhaar" 
                onChange={(e) => {
                  setAadhaar(e.target.value)
                  setEmpty("Please search the patient for information");
                }} 
                value={aadhaar} 
              />
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
              <div className="row mt-3">
                <div className="col">
                    <Button className="btn btn-danger m-2" onClick={resetFields}>Find Another</Button>
                    <Button className="btn btn-success m-2" onClick={()=>vaccinate(aadhaar)}>Vaccinate {patientName.substr(0,patientName.indexOf(' '))}</Button>
                </div>
              </div>
            </ul>
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
















