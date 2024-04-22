import React , { useState } from 'react';
import MainScreen from './MainScreen';
import { Form , Card , Button} from 'react-bootstrap';
import { ToastContainer , toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteProfileScreen = () => {

  const navigate = useNavigate();
  const [ aadhaar, setAadhaar ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ secretCode, setSecretCode ] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const addedBy = userInfo.data.name;
  const accountType = userInfo.data.accountType;
  const addedOn = new Date().toLocaleDateString();

  const notify = (e) => {
    toast.error(e);
  }

  const success = (e) => {
    toast.success(e);
  }

  const SubmitHandler = (e) => {
    e.preventDefault();
    
      if( aadhaar && password && secretCode ){
        if(aadhaar.length === 12){
          if(password.length >= 6){
            if(secretCode.length === 4){
              if (window.confirm("Are you sure you want DELETE Profile?")) {
                axios
              .get(`/deleteprofile/${aadhaar}`)
              .then( res => {
                axios
                .post('/deleteprofile',{ aadhaar , password, secretCode })
                .then( res => {
                  setAadhaar("");
                  setPassword("");
                  setSecretCode("");
                  success("Deleted User Successfully");
                  setTimeout(function () {
                    localStorage.removeItem("userInfo");
                    navigate('/');
                  }, 2000);
                })
                .catch(err => {
                  console.log("Invalid Credentails");
                  notify("Invalid  Credentials");
                })
              })
              .catch(err => {
                console.log(err);
                notify("Invalid Aadhaar Number");
              })
              }
            }
            else{
              notify("Secret Code should only have 4 digits");
            }
          }
          else{
            notify("Password should have 6 digits or more ");
          }
        }
        else{
          notify("Aadhaar should have 12 digits only");
        }
      }
      else{
        notify("Please Fill all the Fields");
      }
  }

  const resetFields = () => {
    setAadhaar("");
    setPassword("");
    setSecretCode("");
  }


  return (
    <>
      <MainScreen title="DELETE USER PROFILE" className="text-white bg-dark">
        <Card>
          <Card.Body>
            <Form>
              <ToastContainer/>
              <Form.Group controlId="aadhaar" className='mb-2'>
                <Form.Label>Enter aadhaar No</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your Aadhaar No"
                  name="aadhaar"
                  value={aadhaar}
                  onChange={(e)=>setAadhaar(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className='mb-2'>
                <Form.Label>Enter Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="secretCode" className='mb-2'>
                <Form.Label>Enter Secret Code</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your Secret Code"
                  name="secretCode"
                  value={secretCode}
                  onChange={(e)=>setSecretCode(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" className="m-2" onClick={()=> navigate(`/${accountType}`)}>Back</Button>
              <Button className="m-2" variant="danger" onClick={SubmitHandler}>Delete Profile</Button>
              <Button className="m-2" variant="primary" onClick={resetFields}>Reset Feilds</Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            Deleting Profile on  - <b>{addedOn}</b> by <b>{addedBy}</b>
          </Card.Footer>
        </Card>
      </MainScreen>
    </>
  )
}

export default DeleteProfileScreen;