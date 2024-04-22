import React, { useContext } from 'react';
import { Step } from '../../Context';
import RegisterForm1 from './RegisterForm1';
import RegisterForm2 from './RegisterForm2';
import RegisterForm3 from './RegisterForm3';
import Confirm from './Confirm';
import RegisterSuccess from './RegisterSuccess';
import Fail from './Fail';
import RegisterContext from '../../RegisterContext';

const RegisterForm = () => {

    const { step } = useContext(Step);
    
    return (
        <>
            <RegisterContext>
                {(() => {
                    switch (step) {
                        case 1:return (<RegisterForm1 title={"Account Setup"} />)
                        case 2:return (<RegisterForm2 title={"Contact Details"}/>)
                        case 3:return (<RegisterForm3 title={"Personal Details"}/>)
                        case 4:return (<Confirm title={"Confirm Details"}/>)
                        case 5:return (<RegisterSuccess success={"Registered"} loading={"Redirecting To Login"}/>)
                        case 6:return (<Fail error={"Unable To Register"} redirect={"/register"}/>)
                        default:
                            return (<RegisterForm1/>)
                    }
                })()}
            </RegisterContext>
        </>
    )

};

export default RegisterForm;


