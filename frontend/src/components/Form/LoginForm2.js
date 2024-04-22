import React , { useContext } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Step } from '../../Context';
import { Login } from '../../LoginContext';
import axios from 'axios';

const LoginForm2 = () => {

  const { step, setStep } = useContext(Step);
  const { aadhaar, password, secretCode,setSecretCode } = useContext(Login);

    const notify = (e) =>{
        toast.error(e);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        try{
    
            if(secretCode.length === 4){
    
                const data = { aadhaar, password, secretCode};

                axios
                    .post("/login",data)
                    .then(res => {
                        localStorage.setItem("userInfo",JSON.stringify(res));
                        setStep(step + 1);
                    })
                    .catch(err => {
                        console.log(err);
                        notify("Incorrect Secret code");
                    })
                
            }else{
                notify("Secret code should only have 4 digit numbers");
            }

        }catch(error){
            notify(error);
        }

    }

    const resetFields = (e) => {
      e.preventDefault();
      setSecretCode("");
    };

    const previous = (e) => {
      e.preventDefault();
      setStep(step - 1);
    };

    return (
      <>
          <Form>
              <ToastContainer/>
              <Row className='mb-3'>
                  <Form.Group className='mb-1' controlId="formBasicOTP">
                      <Form.Label>Enter Secret Code</Form.Label>
                      <Form.Control type="password" placeholder="Enter Secret Code" onChange={(e)=>setSecretCode(e.target.value)} value={secretCode} />
                  </Form.Group>
                  <span className="small">
                      <Link to="/forgetsecretcode">Forget Secretcode</Link>
                  </span>
              </Row>
              <div className="row">
                  <div className="col">
                      <Button className="m-1" variant="warning" onClick={previous}>Previous</Button>
                  </div>
                  <div className="col text-right">
                      <Button className="m-1" variant="danger"  onClick={resetFields}>Reset</Button>
                  </div>
                  <div className="col text-right">
                      <Button className="m-1" variant="success" onClick={onSubmit}>Continue</Button>
                  </div>
              </div>
          </Form>  
      </>
  )

}

export default LoginForm2;
