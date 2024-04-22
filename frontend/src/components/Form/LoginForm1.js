import React, { useContext } from 'react';
import { Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Step } from '../../Context';
import axios from 'axios';
import { Login } from '../../LoginContext';

const LoginForm1 = () => {

  const { step, setStep } = useContext(Step);
  const { aadhaar, setAadhaar, password, setPassword } = useContext(Login);

  const notify = (e) =>{
    toast.error(e);
  }

  const resetFields = (e) => {
    e.preventDefault();
    setAadhaar("");
    setPassword("");
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(!aadhaar){
      notify("please enter your aadhaar ");
    }
    else if(!password){
      notify("please enter your password");
    }
    else if(aadhaar && password){
        if(aadhaar.length === 12){
            if(password.length >= 6){
              const data = { aadhaar,password };
              axios
                  .post("/login/first",data)
                  .then(res => {
                    setStep(step+1);
                  })
                  .catch(err => {
                    console.log(err);
                    notify("Invalid Credentials")
                  })
            }
            else{
              notify("password must have 6 or more than 6 characters");
            }
        }
      else{
        notify("Aadhaar no should have only 12 digits");
      }
    };
  }

  return (
    <>
    <ToastContainer/>
      <Form>
        <Row className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="aadhaar" > Enter Aadhaar Number</Form.Label>
              <Form.Control type="number" placeholder="Enter Your Aadhaar Number" value={aadhaar} name="aadhaar" onChange={(e)=>setAadhaar(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label htmlFor="password">Enter Password</Form.Label>
                <Form.Control type="password" placeholder="Enter Your Password" value={password} name="password" onChange={(e)=>setPassword(e.target.value)}/>
            </Form.Group>
            <span className="small">
                <Link to="/forgetpassword">Forget password</Link>
            </span>
        </Row>
        <div className="row">
            <div className="col">
                <button className="btn btn-danger" onClick={resetFields}>Reset</button>
            </div>
            <div className="col text-right">
                <button className="btn btn-success" onClick={onSubmit}>Next</button>
            </div>
        </div>
        <p className="mt-2">New to website <Link to="/register">Register.</Link></p>
    </Form>
    </>
  )
}

export default LoginForm1;
