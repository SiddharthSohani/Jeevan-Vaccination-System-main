import React , { useState } from 'react';
import { Form , Card , Button} from 'react-bootstrap';
import MainScreen from './MainScreen';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddVaccineScreen = () => {

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addedBy = userInfo.data.name;
  const addedOn = new Date();

  const [ vaccineName, setVaccineName ] = useState("");
  const [ noOfDose, setnoOfDose ] = useState("");
  const [ timeGap, setTimeGap ] = useState("");

  const notify = (e) =>{
    toast.error(e);
  }

  const success = (e) =>{
    toast.success(e);
  }

  const resetFields = () => {
    setVaccineName("");
    setnoOfDose("");
    setTimeGap("");
  }

  const submitHandler = (e) => {
    e.preventDefault();

    try{

      if(vaccineName && noOfDose && timeGap){

        const data = { vaccineName , noOfDose , timeGap , addedBy , addedOn };
        
        axios
            .post("/doctor/addvaccine",data)
            .then(res => {
                success("New Vaccine Added Successfully");
                resetFields();
                setTimeout(function () {
                    navigate(`/doctor/vaccines/information`);
                }, 2000);
            })
            .catch(err => {
                console.log(err);
            })
      }else{
        notify("please fill all of the vaccine details");
      }

    }catch(error){
      console.log(error);
      notify(error);
    }

  }

  return (
    <>
      <MainScreen title="Add New Vaccine" className="text-white bg-dark">
        <Card>
          <Card.Body>
            <Form onSubmit={submitHandler}>
              <ToastContainer/>
              <Form.Group controlId="vaccineName">
                <Form.Label>Enter Vaccine Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Vaccine Name"
                  name="vaccineName"
                  onChange={(e) => setVaccineName(e.target.value)}
                  value={vaccineName}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label  htmlFor="noOfDose" className="form-label">No of Dose</Form.Label>
                <select className="form-select" 
                  name="noOfDose"
                  type="number"
                  onChange={(e) => setnoOfDose(e.target.value)}
                  value={noOfDose}
                >
                    <option value={""}>--select--</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Label  htmlFor="timeGap" className="form-label">Time interval between each doses</Form.Label>
                <select className="form-select" 
                  name="timeGap" 
                  type="text"
                  onChange={(e) => setTimeGap(e.target.value)}
                  value={timeGap}
                >
                    <option value={""}>--select--</option>
                    <option>1 month</option>
                    <option>2 months</option>
                    <option>3 months</option>
                </select>
              </Form.Group>
              <div className="mt-2">
                <Button type="submit" variant="success" className="m-2">
                    Add Vaccine
                </Button>
                <Button className="m-2" variant="primary" onClick={resetFields}>
                    Reset Feilds
                </Button>
                <Button className="m-2" variant="danger" onClick={()=>{
                    navigate(`/doctor/vaccines/information`);
                }}>
                    Go Back
                </Button>
              </div>
            </Form>
          </Card.Body>
          <Card.Footer>
            Vaccine Adding on  - <b>{addedOn.toLocaleDateString()}</b> by <b>Dr.{addedBy}</b>
          </Card.Footer>
        </Card>
      </MainScreen>
    </>
  )
};

export default AddVaccineScreen;
