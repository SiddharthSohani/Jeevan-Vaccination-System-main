import React , { useEffect, useContext, useState } from 'react';
import { Badge , Button } from 'react-bootstrap';
import MainScreen from './MainScreen.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Step } from '../Context.js';
import { FaDownload } from "react-icons/fa";

const MoreInfo = () => {

    const { download } = useContext(Step);
    const [ vaccineInfo, setVaccineInfo ] = useState("");
    const id = localStorage.getItem("id");

    useEffect(() => {
        axios.get(`http://localhost:3000/patient/moreinfo/${id}`)
        .then(res => {
            setVaccineInfo(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[id])


  return (
    <>
        <MainScreen title="Full Vaccination Info">
        {
            (vaccineInfo.length === 0) ?
                <>
                    <ul className="list-group">
                        <li className="list-group-item accli">No Information Found</li>
                    </ul>
                </>
                :
                <>
                    <ul className="list-group">
                        <li className="list-group-item accli">Vaccine Name : {vaccineInfo.vaccineName}</li>
                        <li className="list-group-item accli">Vaccinated To : {vaccineInfo.patientName}</li>
                        <li className="list-group-item accli">Vaccinated by : Dr.{vaccineInfo.doctorName} </li>
                        <li className="list-group-item accli">Patient Aadhaar No : {vaccineInfo.aadhaar}</li>
                        <li className="list-group-item accli">Dose Number : {vaccineInfo.noOfDose}</li>
                        <li className="list-group-item accli" >Date of Dose : {vaccineInfo.vaccinatedOn.slice(0,10)}</li>
                        <li className="list-group-item accli">Patient Age : {vaccineInfo.patientAge} </li>
                        <li className="list-group-item accli">Patient Gender : {vaccineInfo.patientGender}</li>
                        {(vaccineInfo.fullyVaccinated === true) ? 
                            <>
                                <li className="list-group-item accli" >Vaccinated Status : 
                                    <Badge bg="success" className="m-1"> Fully Vaccinated </Badge>
                                </li>
                            </>
                        :
                        <>
                            <li className="list-group-item accli" >Vaccinated Status : 
                                <Badge bg="warning" className="m-1"> Partially Vaccinated </Badge>
                            </li>
                            <li className="list-group-item accli">Remaining Number of Dose : {vaccineInfo.remainedNoOfDose}</li>
                            <li className="list-group-item accli" >NextDose On : {vaccineInfo.nextDoseOn.slice(0,10)}</li>
                        </>
                        }
                        <li className="list-group-item accli">Vaccinated At : {vaccineInfo.hospital}</li>
                        <li className="list-group-item accli">
                            <Button className="btn btn-info btn-sm m-1" onClick={()=>download(vaccineInfo._id,vaccineInfo.vaccineName,vaccineInfo.noOfDose)}><FaDownload/> PDF</Button>
                        </li>
                    </ul>
                </>
        }
        <Link to="/patient">
            <Button className="btn-success m-2">Go Back</Button>
        </Link>
        </MainScreen>
    </> 
  )
};

export default MoreInfo;
