import React, { useContext }  from 'react';
import { Form } from 'react-bootstrap' ;
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Step } from '../../Context';
import { Register } from '../../RegisterContext';

const RegisterForm2 = (props) => {

  const { step, setStep} = useContext(Step);
  const { email, setEmail, password, setPassword, secretCode, setSecretCode, phone, setPhone } = useContext(Register);

    const notify= (e) =>{
        toast.error(e);
    }

    const next = e => {
        e.preventDefault();
        if(!email){
          notify("please enter email");
        }
        else if(!password){
          notify("please fill the password");  
        }
        else if(!secretCode){
          notify("please fill the secretcode");  
        }
        else if(!phone){
          notify("please fill the phone");
        }
        else if(email && password && secretCode && phone){
            if(password.length >= 6){
                if(secretCode.length === 4){
                    if(phone.length === 10){
                      setStep(step + 1);
                    }
                    else{
                      notify("Phone number should only have 10 Numbers");
                    }
                }
                else{
                  notify("Secretcode should only have 4 Numbers");
                }
            }
            else{
              notify("passwords should be more than 6 characters");
            }
        }

        
    };

    const previous = e => {
        e.preventDefault();
        setStep(step - 1);
    };

    return (
        <div className="form-container">
            <ToastContainer/>
            <h3 className="mb-1">{step}. {props.title} </h3>
            <Form className='mt-3'>
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="email">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"  onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </Form.Group>  
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Create New Password</Form.Label>
                    <Form.Control type="password" placeholder="Create New Password" name="password" onChange={(e)=>setPassword(e.target.value)} value={password} />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="secretCode">Create Secret Code</Form.Label>
                    <Form.Control type="number" placeholder="Create Secret Code" name="secretCode" onChange={(e)=>setSecretCode(e.target.value)} value={secretCode}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label htmlFor="phone">Phone Number</Form.Label>
                    <Form.Control type="number" placeholder="Enter Phone Number" name="phone" onChange={(e)=>setPhone(e.target.value)} value={phone}/>
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
    )
};

export default RegisterForm2;






