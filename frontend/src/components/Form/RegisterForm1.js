import React,{ useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register } from '../../RegisterContext';
import { Step } from '../../Context';
import axios from 'axios';

const RegisterForm1 = (props) => {

  const {accountType, setAccountType, name , setName, aadhaar, setAadhaar} = useContext(Register);
  const {step, setStep} = useContext(Step);

  const notify = (e) =>{
    toast.error(e);
  }

  const next = (e) => {
    e.preventDefault();
    if(!accountType){
        notify("please fill the account type");
    }
    else if(!name){
        notify("please fill the name");
    }
    else if(!aadhaar){
        notify("please enter your aadhaar no");
    }
    else if( accountType && name && aadhaar){
        if(aadhaar.length === 12){
          const data = { aadhaar };
          axios.post("/register/checkaadhaar",data)
          .then(res => {
            setStep(step + 1);
          })
          .catch(err => {
              console.log(err);
              notify("Aadhaar is already in use");
          })
        }
        else{
            notify("Aadhaar Number should must have 12 digits");
        }
    }
  };

  return (
    <div className="form-container">
        <ToastContainer/>
        <h3 className="mb-2">{step}. {props.title}</h3>
        <Form.Group className="mb-3">
            <Form.Label  htmlFor="accountType" className="form-label mt-4">You Are ?</Form.Label>
            <select className="form-select" name="accountType" onChange={(e)=>setAccountType(e.target.value)} value={accountType} required>
                <option value={""}>--select--</option>
                <option>Patient</option>
                <option>Doctor</option>
                <option>Inspector</option>
            </select>
        </Form.Group>
        <Form.Group className="mb-3" autoComplete="none" >
            <Form.Label htmlFor="name" >Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" name="name" onChange={(e)=>setName(e.target.value)} value={name}  id="validationCustom01" required/>
        </Form.Group>
        <Form.Group className="mb-3">
                <Form.Label htmlFor="aadhaar" >Aadhaar Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Your Aadhaar Number" name="aadhaar" onChange={(e)=>setAadhaar(e.target.value)} value={aadhaar} />
        </Form.Group>  
        <br />
        <div className="text-right">
            <button className="btn btn-success" onClick={next} >Continue</button>
            <p className="mt-2">Already Registered <Link to="/login">Login.</Link></p>
        </div>
    </div>
  )
}

export default RegisterForm1;