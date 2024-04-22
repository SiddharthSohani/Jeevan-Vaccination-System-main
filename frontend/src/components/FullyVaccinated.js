import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col , Accordion , Badge , Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { FaDownload } from "react-icons/fa";
import axios from 'axios';
import { Step } from '../Context';

const FullyVaccinated = () => {

  const { download } = useContext(Step);
  const navigate = useNavigate(); 

  const [ vaccinationInfo , setVaccinationInfo ] = useState([]);
  const [ fullyVaccinationInfo , setFullyVaccinationInfo ] = useState([]);
    
    const userInfo  = JSON.parse(localStorage.getItem('userInfo'));
    const aadhaar = userInfo.data.aadhaar;
    const name = userInfo.data.name;

    const style = {
      border:"none",
    }

    const moreInfo = ( id ) => {
      localStorage.setItem("id",id);
      navigate(`/patient/moreinfo/${id}`);
    }

    const notify = (e) =>{
      toast.error(e);
    }

    useEffect(() => {
      axios.get(`/patient/${aadhaar}`)
      .then(res => {
        setVaccinationInfo(res.data);
      })
      .catch(err => {
        notify(err);
      })
    },[aadhaar]);

    useEffect(()=>{
      const objectWeNeed = vaccinationInfo.filter((object) => {
        return object.fullyVaccinated === true;
      });
      setFullyVaccinationInfo(objectWeNeed);
    },[vaccinationInfo])


    return (
      <>
        <div className="heading">
          <h6>List of FullyVaccinated vaccines taken by {name}.</h6>
        </div>
        <div className="vaccines">
        <ToastContainer/>
        {
          fullyVaccinationInfo.length === 0 ?
          <>
            <ul className="list-group">
              <li className="list-group-item mt-3" >No Vaccine Taken Till Now</li>
            </ul>
          </>
          :
          <>
          {
          fullyVaccinationInfo.map((vaccine) => (
            <Accordion key={vaccine._id} style={{ backgroundColor: "#060606" }}>
              <Accordion.Item eventKey="0">
                <Accordion.Header className="accordion-header"> 
                  <h6>{vaccine.vaccineName}</h6>
                  {(vaccine.fullyVaccinated === true) ? 
                    <h6>
                      <Badge bg="success" className="m-1"> Fully Vaccinated </Badge>
                    </h6> 
                    : 
                    <h6>
                      <Badge bg="warning" className="m-1"> Partially Vaccinated </Badge>
                    </h6> 
                  } 
                </Accordion.Header>
                <Accordion.Body className="accordion-toggle" style={{ backgroundColor:"rgb(6,6,6)"}} >
                  <ul className="list-group" style={style}>
                      <li className="list-group-item accli" style={{ backgroundColor:"rgb(6,6,6)"}} >Vaccine Name : {vaccine.vaccineName} </li>
                      <li className="list-group-item accli" style={{ backgroundColor:"rgb(6,6,6)"}} >Dose Number : {vaccine.noOfDose} </li>
                      <li className="list-group-item accli" style={{ backgroundColor:"rgb(6,6,6)"}} >Date of Dose : {vaccine.vaccinatedOn.slice(0,10)} </li>
                          {(vaccine.fullyVaccinated === true) ? 
                            <li className="list-group-item accli" style={{ backgroundColor:"rgb(6,6,6)"}} >
                              Vaccinated Status : 
                              <Badge bg="success" className="m-1"> Fully Vaccinated </Badge> 
                            </li>
                            : 
                            <>
                              <li className="list-group-item accli" style={{ backgroundColor:"rgb(6,6,6)"}} >
                              Vaccinated Status : 
                              <Badge bg="warning" className="m-1"> Partially Vaccinated </Badge> 
                              </li>
                              <li className="list-group-item accli" style={{ backgroundColor:"rgb(6,6,6)"}} >No of Dose remained : {vaccine.remainedNoOfDose}</li>
                              <li className="list-group-item accli" style={{ backgroundColor:"rgb(6,6,6)"}} >NextDose On : {vaccine.nextDoseOn.slice(0,10)}</li>
                            </>
                          }
                      <li className="list-group-item accli" style={{ backgroundColor:"rgb(6,6,6)"}} >
                        <Row>
                          <Col> 
                            <Button className="btn btn-warning btn-sm m-1" onClick={()=>moreInfo(vaccine._id)} >MoreInfo</Button>
                          </Col>
                          <Col>
                            <Button className="btn btn-info btn-sm m-1" onClick={()=>download(vaccine._id,vaccine.vaccineName,vaccine.noOfDose)}><FaDownload/> PDF</Button>
                          </Col>
                        </Row>
                      </li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            ))
          }
        </>
        }
        </div>
      </>
    );
};

export default FullyVaccinated;



