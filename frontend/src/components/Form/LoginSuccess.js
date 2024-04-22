import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, ProgressBar } from 'react-bootstrap';
import SuccessImg from '../../img/Success.png';
import { Step } from '../../Context';
import { Login } from '../../LoginContext';

const LoginSuccess = (props) => {

  const navigate = useNavigate();
  const [progress , setProgress] = useState(0);
  const {setStep} = useContext(Step);
  const {setAadhaar,setPassword,setSecretCode} = useContext(Login);
  const data  = JSON.parse(localStorage.getItem('userInfo'));
  const accountType = data.data.accountType.toLowerCase();

  setTimeout(()=>{
    setProgress(100);
  },1000);

  useEffect(() => {
    setTimeout(() => {
    setStep(1);
    setAadhaar("");
    setPassword("");
    setSecretCode("");
    navigate(`/${accountType}`);
    } , 4000);
  });
  
  return (
      <>
        <div className="row justify-content-center">
            <div className="col-3">
                <Image className="fit-image SuccessImg ml-0" src={SuccessImg} fluid />
            </div>
        </div> 
        <br/>
        <div className="row justify-content-center">
          <div className="col-7 text-center">
            <h6>You Have Successfully {props.success}...</h6>
          </div>
          <ProgressBar striped animated now={progress} variant="success"/>
          <small>
            <b>{props.loading}....</b>
          </small>
        </div>
    </>
  )

};

export default LoginSuccess;











































//     const { values: { accountType } } = this.props;

//     return (
//         
//     );
// };

// export default Success; 