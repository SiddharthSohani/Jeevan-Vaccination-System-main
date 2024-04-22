import React , { useEffect, useState } from 'react';
import { Container , Row, Button, Badge , Col} from 'react-bootstrap';
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


const VaccineInfoScreen = () => {

  const navigate = useNavigate();
  const [ vaccines, setVaccines ] = useState([]);

  const notify = (e) => {
    toast.error(e);
  }

  const deleteVaccine = (id) => {

    if (window.confirm("Are you sure you want to delete the vaccine?")) {
        axios.delete(`/doctor/deletevaccine/${id}`)
        .then(res => {
          console.log("deleted")
        })
        .catch((err) => {
            console.log(err);
            notify("Not Able to Delete");
        })
    }
}

  const editVaccine = (id) => {
    localStorage.setItem("id",id);
    navigate(`/doctor/vaccine/edit/${id}`);
  }

  useEffect(()=>{
    axios.get('/doctor/getvaccines')
      .then(res => {
        setVaccines(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  },[vaccines])


  return (
    <>
    <Container className='mt-4 m-auto'>
      <ToastContainer/>
        <Row>
            <Col>
                <Link to='/doctor/addvaccine'>
                    <button type="button" className="btn btn-outline-success m-2"> + Add Vaccine</button>
                </Link>
                <Link to='/doctor'>
                    <button type="button" className="btn btn-outline-danger m-2"> Go Back</button>
                </Link>
            </Col>
        </Row>
        <hr/>
            <h5>Vaccine Information</h5>
        <hr/>
        {
          (vaccines.length === 0) ?
          <>
            <ul className="list-group">
                <li className="list-group-item text-center">
                    <Badge className="bg-danger">No Vaccine Found</Badge>
                </li>
            </ul>
          </> 
          :
          <ul className="list-group">
            {
              vaccines.map((vaccine) => (
                  <li className="list-group-item d-flex" key={vaccine._id}>
                      <h5><Badge className="bg-info">{vaccine.vaccineName}</Badge></h5>
                      <Button className="btn btn-light" onClick={()=>{editVaccine(vaccine._id)}}><BiEdit className='edit'/></Button>
                      <Button className="btn btn-light" onClick={() => deleteVaccine(vaccine._id)} ><AiOutlineDelete className='delete'/></Button>
                  </li>
              ))
            }
          </ul>
        }
    </Container>
    </>
  )
}

export default VaccineInfoScreen;