import React , { useState , useEffect } from 'react';
import { Form , Card , Button} from 'react-bootstrap';
import MainScreen from './MainScreen';
import { ToastContainer , toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditVaccineScreen = () => {

  const navigate = useNavigate();
  const [ vaccineName ,setVaccineName ] = useState("");
  const [ vaccineInfo , setVaccineInfo ] = useState("");
  const [ noOfDose , setNoOfDose ] = useState("");
  const [ timeGap, setTimeGap ] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const id = localStorage.getItem("id");
  const addedBy = userInfo.data.name;
  const addedOn = new Date();

  const updateVaccine = (e) => {

    e.preventDefault();
    try{

        const data = { vaccineName , noOfDose , timeGap , addedBy };

        axios
        .put(`/doctor/editvaccine/${id}`,data)
        .then(res => {
            success("Edited Vaccine Successfully");
            setTimeout(function () {
              navigate(`/doctor/vaccines/information`);
            }, 2000);
        })
        .catch(err => {
            console.log(err);
            notify("Unable To Edit Vaccine");
        })

    }
    catch(error){
      notify("Unable To Edit Vaccine");
      console.log(error);
    }

  }

  const success = (e) => {
    toast.success(e);
  }

  const notify = (e) => {
    toast.error(e);
  }


  const resetFields = () => {
    setVaccineName(vaccineInfo.vaccineName);
    setNoOfDose(vaccineInfo.noOfDose);
    setTimeGap(vaccineInfo.timeGap);
  }
  
  useEffect(() => {
      axios.get(`/doctor/getvaccine/${id}`)
      .then(res => {
          setVaccineInfo(res.data)
        setVaccineName(res.data.vaccineName);
        setNoOfDose(res.data.noOfDose);
        setTimeGap(res.data.timeGap);
        })
      .catch(err => {
        notify("Unable To Fetch Vaccine details");
        console.log(err);
      })
    },[id])

    return (
      <>
      <MainScreen title="EDIT VACCINE" className="text-white bg-dark">
        <Card>
          <Card.Header>Edit Vaccine</Card.Header>
          <Card.Body>
            <Form>
              <ToastContainer/>
              <Form.Group controlId="vaccineName">
                <Form.Label>Edit Vaccine Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit Vaccine Name"
                  name="vaccineName"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label  htmlFor="noOfDose" className="form-label mt-4">No of Dose</Form.Label>
                <select className="form-select" 
                  name="noOfDose"
                  type="number"
                  onChange={(e) => setNoOfDose(e.target.value)}
                  value={noOfDose}
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label  htmlFor="timeGap" className="form-label mt-4">Time interval between each doses</Form.Label>
                <select className="form-select" 
                  name="timeGap" 
                  type="text"
                  onChange={(e) => setTimeGap(e.target.value)}
                  value={timeGap}
                >
                    <option>1 month</option>
                    <option>2 months</option>
                    <option>3 months</option>
                    <option>4 months</option>
                </select>
              </Form.Group>
              <Button type="submit" variant="success" className="m-2" onClick={updateVaccine}>
                Update Vaccine
              </Button>
              <Button className="m-2" variant="primary" onClick={resetFields}>
                Reset Feilds
              </Button>
              <Button className="m-2" variant="danger" onClick={()=>{
                navigate(`/doctor/vaccines/information`);
              }}>
                Go Back
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            Updating on  - <b>{addedOn.toLocaleDateString()}</b> by <b>Dr.{addedBy}</b>
          </Card.Footer>
        </Card>
      </MainScreen>
    </>  
    )
}

export default EditVaccineScreen;













