import React , { useState } from 'react';
import { Container , Card , Form , Button } from 'react-bootstrap';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer , toast } from 'react-toastify';

const EditProfileScreen = () => {

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
 
  const [accountType, setAccountType] = useState(userInfo.data.accountType);
  const [name, setName] = useState(userInfo.data.name);
  const [aadhaar, setAadhaar] = useState(userInfo.data.aadhaar);
  const [age, setAge] = useState(userInfo.data.age);
  const [dob, setDob] = useState(userInfo.data.dob.slice(0,10));
  const [gender, setGender] = useState(userInfo.data.gender);
  const [email, setEmail] = useState(userInfo.data.email);
  const [phone, setPhone] = useState(userInfo.data.phone);
  const addedOn = new Date().toLocaleDateString();

  const onSubmit = (e) => {
    e.preventDefault();

      try{
        axios
        .put("/editprofile",{accountType, name, aadhaar, age, dob , gender, email, phone})
        .then(res => {
            localStorage.setItem("userInfo",JSON.stringify(res));
            success("Edited User Successfully");
            setTimeout(function () {
              navigate(`/`);
            }, 3000);
        })
        .catch(err => {
          console.log(err);
          notify("Unable To Edit User");
        })
      }catch(error){
        notify("Unable To Edit User");
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
    setAccountType(userInfo.data.accountType);
    setName(userInfo.data.name);
    setAadhaar(userInfo.data.aadhaar);
    setAge(userInfo.data.age);
    setDob(userInfo.data.dob.slice(0,10));
    setGender(userInfo.data.gender);
    setEmail(userInfo.data.email);
    setPhone(userInfo.data.phone);
  }

  return (
    <>
      <Container>
            <h5 className='mt-2'>Edit Profile</h5>  
            <Link to="/deleteprofile">
              <Button className="btn btn-danger btn-sm m-2">Delete Profile</Button>
            </Link>
            <Link to="/editcredentials">
              <Button className="btn btn-info btn-sm m-2">Edit Credentials</Button>
            </Link>
            <Link to="/">
              <Button className="btn btn-light btn-sm m-2">Go Back</Button>
            </Link>
        <hr/>
        <Card>
          <Card.Body>
            <Form onSubmit={onSubmit}>
            <ToastContainer/>
            <Form.Group controlId="accountType">
                <Form.Label>Edit AccountType</Form.Label>
                  <select className="form-select" name="accountType" value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  >
                      <option>Patient</option>
                      <option>Doctor</option>
                      <option>Inspector</option>
                      <option>Admin</option>
                  </select>
              </Form.Group>
              <Form.Group controlId="vaccineName">
                <Form.Label   className='mt-2'>Edit User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Edit User Name"
                  name="vaccineName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group >
              <Form.Group controlId="aadhaar">
                <Form.Label className='mt-2'>Edit Aadhaar</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Edit Aadhaar"
                  name="aadhaar"
                  value={aadhaar}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="age">
                  <Form.Label  className='mt-2'>Edit Age</Form.Label>
                  <Form.Control type="number" placeholder="Enter age" name="age" value={age}
                  onChange={(e) => setAge(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="dob">
                  <Form.Label  className='mt-2'>Edit Date of Birth</Form.Label>
                  <Form.Control type="date" placeholder="Enter Date of Birth" name="dob" value={dob}
                  onChange={(e) => setDob(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="gender">
                <Form.Label  className='mt-2'>Edit gender</Form.Label>
                  <select className="form-select" name="gender" value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  >
                      <option>Male</option>
                      <option>Female</option>
                      <option>others</option>
                  </select>
              </Form.Group>
              <Form.Group controlId="email">
                  <Form.Label  className='mt-2'>Edit Email address</Form.Label>
                  <Form.Control type="email" placeholder="Edit Enter email" name="email" value={email} 
                  onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="phone">
                  <Form.Label className='mt-2'>Edit Phone Number</Form.Label>
                  <Form.Control type="number" placeholder="Edit Enter Phone Number" name="phone" value={phone}
                  onChange={(e) => setPhone(e.target.value)}/>
              </Form.Group>
              <Button type="submit" variant="success" className="mt-2">
                Update User
              </Button>
              <Button className="m-2" variant="primary" onClick={resetFields}>
                Reset Feilds
              </Button>
              <Button className="m-2" variant="danger" onClick={()=>{
                navigate(`/${accountType}`);
              }}>
                Go Back
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            Updating By - <b>{name}</b> on <b>{addedOn}</b>
          </Card.Footer>
        </Card>

      </Container>
    </>
  )
}

export default EditProfileScreen