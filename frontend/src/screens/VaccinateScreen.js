import React, { useEffect, useState } from 'react';
import { Form , Card , Button} from 'react-bootstrap';
import MainScreen from './MainScreen';
import { ToastContainer , toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VaccinateScreen = () => {

    const navigate = useNavigate();
    const [ patientName, setPatientName ] = useState("");
    const [ patientAge, setPatientAge ] = useState("");
    const [ patientGender, setPatientGender ] = useState("");
    const [ hospital, setHospital ] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const doctor = userInfo.data.name;
    const [ vaccines, setVaccines ] = useState([]);
    const [ selectedVaccine, setSelectedVaccine] = useState("");
    const [ doseArray, setDoseArray ] = useState([]);
    const [ noOfDose, setNoOfDose ] = useState("");
    const [ nextDoseOn, setNextDoseOn ] = useState("");

  const onDate = new Date().toLocaleDateString();
  const vaccinatedOn = new Date();
  const aadhaar = localStorage.getItem('aadhaar');
 
  const notify = (e) =>{
    toast.error(e);
  }

  const success = (e) =>{
    toast.success(e);
  }

  const resetFields  = (e) => {
    e.preventDefault();
    setSelectedVaccine("");
    setHospital("");
  }

  const nextVaccineDate = (diff) => {
    
        const todayDate = new Date();
        const todayDateMillis = todayDate.getTime();

        if(diff === "3 months"){
        const timeInterval ="2160:00:00"
        let parts = timeInterval.split(/:/);
        let timeIntervalMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                            (parseInt(parts[1], 10) * 60 * 1000) + 
                            (parseInt(parts[2], 10) * 1000);

        let nextDose = new Date();
        nextDose.setTime( todayDateMillis + timeIntervalMillis);
        setNextDoseOn(nextDose);
        
        }
        if(diff === "2 months"){
        const timeInterval ="1440:00:00"
            let parts = timeInterval.split(/:/);
            let timeIntervalMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                                (parseInt(parts[1], 10) * 60 * 1000) + 
                                (parseInt(parts[2], 10) * 1000);

            let nextDose = new Date();
            nextDose.setTime( todayDateMillis + timeIntervalMillis);
            setNextDoseOn(nextDose);
            
        }
        if(diff === "1 month"){
        const timeInterval ="720:00:00"
            var parts = timeInterval.split(/:/);
            var timeIntervalMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                                (parseInt(parts[1], 10) * 60 * 1000) + 
                                (parseInt(parts[2], 10) * 1000);

            var nextDose = new Date();
            nextDose.setTime( todayDateMillis + timeIntervalMillis);
            setNextDoseOn(nextDose);
            
        }

  }


  const SubmitHandler = (e) => {
    e.preventDefault();

    try{

      if( selectedVaccine.vaccineName && selectedVaccine.timeGap && noOfDose  && hospital ){

        const vaccineName = selectedVaccine.vaccineName;
        const totalNoOfDose = selectedVaccine.noOfDose;
        const doctorName = doctor;

        const data = { aadhaar , patientName , patientAge , patientGender , vaccineName , totalNoOfDose ,  nextDoseOn , noOfDose , hospital , doctorName , vaccinatedOn };
        
         axios
                 .post('/doctor/vaccinate',data)
                 .then(res => {
                  success("Vaccinated successfully");
                  setTimeout(function () {
                    navigate(`/doctor`);
                  }, 3000);
                 })
                 .catch(err => {
                     console.log(err);
                     notify("Already vaccinated or error during vaccination");
                 })

      }else{
        notify("please fill all of the vaccine details");
      }

    }catch(error){
      console.log(error);
      notify(error);
    }
    
  }

  function selectVaccine(event) {
    const valueToParse = event.target.value;
    const vaccineSelected = JSON.parse(valueToParse);
    setSelectedVaccine(vaccineSelected);
    nextVaccineDate(vaccineSelected.timeGap)
    setNoOfDose(vaccineSelected.noOfDose);
    return;
  }

  const selectDose = () => {
    const NewArr = [];
    for(var i = selectedVaccine.noOfDose ; i >= 1 ; i--){
      NewArr.push(i);
    }
    setDoseArray(NewArr);
    return;
  }


  useEffect(()=>{
    axios.get(`/doctor/vaccinate/${aadhaar}`)
    .then(res => {
      if(res.data.accountType === "Patient"){
        setPatientName(res.data.name)
        setPatientAge(res.data.age)
        setPatientGender(res.data.gender)
        axios.get(`/doctor/getvaccines`)
        .then(res => {
            var resArray = res.data;
            const blankData = {
                vaccineName: "--select--",
                _id: "0"
            }
            resArray.splice(0, 0, blankData);
            setVaccines(resArray);
        })
        .catch(err => {
        notify("Unable to fetch vaccines details");
        })
      }
      else{
        notify("Enter Aadhaar Number is not a Patient");
      }
    })
    .catch(err => {
      notify("Invalid Aadhaar Number");
    })
  },[aadhaar])

  return (
    <>
      <MainScreen title="Get Vaccinated" className="text-white bg-dark">
        <Card>
          <Card.Header>Get Vaccinated</Card.Header>
          <Card.Body>
            <Form onSubmit={SubmitHandler}>
              <ToastContainer/>
              <Form.Group className='mb-3'>
                <Form.Label>Patient Name</Form.Label>
                <Form.Control
                  type="text"
                  name="PatientName"
                  value={patientName}
                  readOnly
                />
              </Form.Group>
              <Form.Group  className='mb-3'>
                <Form.Label>Patient Age</Form.Label>
                <Form.Control
                  type="text"
                  name="PatientAge"
                  value={patientAge}
                  readOnly
                />
              </Form.Group>
              <Form.Group  className='mb-3'>
                <Form.Label>Patient Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="PatientGender"
                  value={patientGender}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label  className="form-label">Vaccine Name</Form.Label>
                <select className="form-select" 
                    name="vaccineName"
                    onChange={selectVaccine}
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
                            <option key={vaccine._id} value={JSON.stringify(vaccine)}>  
                                {vaccine.vaccineName}
                            </option>
                            ))
                        }
                        </>
                    }
                </select>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Time Interval</Form.Label>
                  <Form.Control type="text" name="timeGap"  
                   value={selectedVaccine?selectedVaccine.timeGap:"Select Vaccine"} readOnly></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label  htmlFor="noOfDose" className="form-label">Vaccine Dose</Form.Label>
                <select className="form-select" 
                   name="noOfDose"
                   onClick={selectDose}
                   onChange={(e)=>setNoOfDose(e.target.value)}
                   value={noOfDose} >
                    {
                        selectedVaccine ? 
                        (
                          doseArray.map(( dose ) => (
                            <option key={dose} >  
                              {dose}
                            </option>
                            ))
                        ) : (
                            <option value="">No doses Found</option>
                        )
                    }
                </select>
              </Form.Group>
              <Form.Group className="mb-3" >
                  <Form.Label htmlFor="hospital" >Enter Hospital Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Hospital Name" name="hospital" value={hospital} onChange={(e)=>{setHospital(e.target.value);
                    }} />
                </Form.Group>
              <Button type="submit" variant="success" className="m-2">
                Get Vaccinated
              </Button>
              <Button className="m-2" variant="primary" onClick={resetFields}>
                Reset Fields
              </Button>
              <Link to="/doctor">
                <Button className="m-2" variant="danger" >Go Back</Button>
              </Link>
            </Form>
          </Card.Body>
          <Card.Footer>
            Vaccinating by - <b>DR.{doctor}</b> on <b>{onDate}</b>
          </Card.Footer>
        </Card>
      </MainScreen>
    </>
  )
};

export default VaccinateScreen;