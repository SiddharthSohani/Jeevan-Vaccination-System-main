import React, { useContext } from 'react';
import { Form } from 'react-bootstrap' ;
import { ToastContainer, toast } from 'react-toastify';
import { Step } from '../../Context';
import { Register } from '../../RegisterContext';

const RegisterForm3 = (props) => {

  const { step, setStep } = useContext(Step);
  const { age, setAge, dob, setDob, gender, setGender} = useContext(Register);

    const notify= (e) =>{
        toast.error(e);
    }

    const next = (e) => {
        e.preventDefault();
        if(!age){
          notify("Please select date of birth for age");
        }
         if(!dob){
          notify("Please select your Date of Birth")
        }
        else if(!gender){
          notify("Please select your Gender");
        }
        else if(age && dob && gender){  
          setStep(step + 1 );
        }
    };

    const getAge = (dateBirth) => {
      var today = new Date();
      var birthDate = new Date(dateBirth);
      var year = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
        setAge(year);
      }
      return setAge(year);
    }

    const previous = e => {
        e.preventDefault();
        setStep(step - 1);
    };


    return (
        <div className="form-container">
            <ToastContainer/>
            <h6 className="mb-1">{step}. {props.title} </h6>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="dob" >Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Enter Date of Birth" name="dob" onChange={(e)=>{setDob(e.target.value);getAge(e.target.value)}} value={dob} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <label htmlFor="accountType" className="form-label">Gender</label>
                    <select className="form-select" name="gender" onChange={(e)=>setGender(e.target.value)} value={gender} >
                        <option value={""}>--select--</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>others</option>
                    </select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="age" >Age</Form.Label>
                    <Form.Control type="number" placeholder="Enter age" name="age" value={age} readOnly/>
                </Form.Group>
            </Form>
            <br />
            <div className="row">
                <div className="col">
                    <button className="btn btn-danger" onClick={previous}>Previous</button>
                </div>
                <div className="col text-right">
                    <button className="btn btn-success" onClick={next}>Continue</button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm3;






