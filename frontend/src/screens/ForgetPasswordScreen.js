import React , { useState } from 'react';
import MainScreen from './MainScreen';
import { Card , Form , Button } from 'react-bootstrap';
import { ToastContainer , toast } from 'react-toastify';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgetPasswordScreen = () => {

    const navigate = useNavigate();
    const [ aadhaar , setAadhaar] = useState("");
    const [ email , setEmail] = useState("");
    const [ phone , setPhone] = useState("");
    const [ newPassword , setNewPassword] = useState("");
    const editedOn = new Date().toLocaleDateString();

    const notify = (e) => {
        toast.error(e);
    }

    const success = (e) => {
        toast.success(e);
    }

    const resetFields = () => {
       setAadhaar("");
       setEmail("");
       setPhone("");
       setNewPassword("");
    }


    const onSubmit = (e) => {
        e.preventDefault();

        if( aadhaar && email && phone && newPassword){
          if(aadhaar.length === 12){
            if(phone.length === 10){
              if(newPassword.length >= 6){
                  axios
                  .post("/forgetpassword",{aadhaar,email,phone,newPassword})
                  .then(res=>{
                    resetFields();
                    success("Password Reset Successfully");
                    setTimeout(function () {
                      navigate(`/login`);
                    }, 2000);
                  })
                  .catch((err) => {
                    console.log(err);
                    notify("Invalid User Information");
                  })
              }else{
                notify("Password should must have 6 characters or more");
              }
            }else{
              notify("Phone should must have only 10 digits");
            }
          }
          else{
            notify("Aadhaar Number should must have only 12 digits");
          }
        }
        else{
            notify("Please Fill all the Fields");
        }
    }

  return (
    <>
        <MainScreen title="FORGET PASSWORD" className="text-white bg-dark">
            <Link to="/login">
                <Button className="btn btn-light btn-sm m-2">Go Back</Button>
            </Link>
            <Card>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <ToastContainer/>
                        <Form.Group className='mb-2' controlId="aadhaar">
                            <Form.Label>Enter Aadhaar Number</Form.Label>
                            <Form.Control
                            type="number"
                            placeholder="Enter Aadhaar Number"
                            name="aadhaar"
                            value={aadhaar}
                            onChange={(e)=>setAadhaar(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group className='mb-2' controlId="email">
                            <Form.Label>Enter Email</Form.Label>
                            <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-2' controlId="phone">
                            <Form.Label>Enter Phone</Form.Label>
                            <Form.Control
                            type="number"
                            placeholder="Enter Phone Number"
                            name="phone"
                            value={phone}
                            onChange={(e)=>setPhone(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className='mb-2' controlId="newPassword">
                            <Form.Label>Enter New Password</Form.Label>
                            <Form.Control
                            type="password"
                            placeholder="Enter New Password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" variant="success" className="m-2" >Set New Password</Button>
                        <Button className="m-2" variant="primary" onClick={resetFields}>Reset</Button>
                            <Link to='/login'>
                            <Button className="m-2" variant="danger">Go Back</Button>
                            </Link>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Updating Password on  - {editedOn}
                </Card.Footer>
            </Card>
        </MainScreen>
    </>
  )
}

export default ForgetPasswordScreen;