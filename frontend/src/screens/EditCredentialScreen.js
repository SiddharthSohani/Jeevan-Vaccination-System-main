import React , { useState } from 'react';
import MainScreen from './MainScreen';
import { Card , Form , Button } from 'react-bootstrap';
import { ToastContainer , toast } from 'react-toastify';
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCredentialScreen = () => {

    const navigate = useNavigate();
    const [ password , setPassword] = useState("");
    const [ secretCode , setSecretCode] = useState("");
    const [ newPassword , setNewPassword] = useState("");
    const [ newSecretCode , setNewSecretCode] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const aadhaar = userInfo.data.aadhaar;
    const accountType = userInfo.data.accountType;
    const name = userInfo.data.name;
    const editedOn = new Date().toLocaleDateString();

    const notify = (e) => {
        toast.error(e);
    }

    const success = (e) => {
        toast.success(e);
    }

    const resetFields = () => {
      setPassword("");
      setSecretCode("");
      setNewPassword("");
      setNewSecretCode("");
    }


    const onSubmit = (e) => {
        e.preventDefault();

        if( password && secretCode && newPassword && newSecretCode){
            if(password.length >= 6 && newPassword.length >= 6){
                if(secretCode.length === 4 && newSecretCode.length === 4){
                    axios
                    .post("/editcredentials",{aadhaar,password,secretCode,newPassword,newSecretCode})
                    .then((res)=>{
                        success("Successfully updated the credentials");
                        resetFields();
                        setTimeout(function () {
                        navigate(`/${accountType}`);
                        }, 2000);
                    })
                    .catch((err)=>{
                        console.log(err);
                        notify("Invalid Current Password and Secret Code")
                    })
                }else{
                    notify("Secret Code must have 4 digits only")
                }
            }else{
                notify("Password Length should be 6 or more digits")
            }

        }
        else{
            notify("Please Fill all the Fields");
        }
    }

  return (
    <>
    <MainScreen title="EDIT CREDENTIALS" className="text-white bg-dark">
        <Link to="/editprofile">
          <Button className="btn btn-light btn-sm m-2">Go Back</Button>
        </Link>
        <Card>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <ToastContainer/>
              <Form.Group className='mb-2' controlId="password">
                <Form.Label>Enter Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Current Password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-2' controlId="secretCode">
                <Form.Label>Enter Current SecretCode</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Current SecretCode"
                  name="secretCode"
                  value={secretCode}
                  onChange={(e)=>setSecretCode(e.target.value)}
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
              <Form.Group className='mb-2' controlId="Enter New Secret Code">
                <Form.Label>Enter New Secret Code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter New Secret Code"
                  name="newSecretCode"
                  value={newSecretCode}
                  onChange={(e)=>setNewSecretCode(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="success" className="m-2" >Update Credentials</Button>
              <Button className="m-2" variant="primary" onClick={resetFields}>Reset</Button>
                <Link to='/editprofile'>
                  <Button className="m-2" variant="danger">Go Back</Button>
                </Link>
            </Form>
          </Card.Body>
          <Card.Footer>
            Updating Credentials on  - <b>{editedOn}</b> by <b>{name}</b>
          </Card.Footer>
        </Card>
      </MainScreen>
    </>
  )
}

export default EditCredentialScreen;