import React, { useContext } from 'react';
import { Col } from 'react-bootstrap';
import { Step } from '../Context';

const ProgressBar = ({noOfSteps}) => {

    const loginStep = noOfSteps;

    const {step} = useContext(Step);

    return (
        <>
            <Col>
                <h5>Please Follow The Steps For Login.</h5>
                <div className="progressBar">
                    <ul id="progressbar" className='p-0'>
                        {
                        (loginStep === 3)?(
                            <>
                                <li className={(step === 1)?"active":""} id="one"></li>
                                <li className={(step === 2)?"active":""} id="two"></li>
                                <li className={(step === 3)?"active":""} id="three"></li>
                            </>
                            ):(
                                <>
                                    <li className={(step === 1)?"active":""} id="one"></li>
                                    <li className={(step === 2)?"active":""} id="two"></li>
                                    <li className={(step === 3)?"active":""} id="three"></li>
                                    <li className={(step === 4)?"active":""} id="four"></li>
                                    <li className={(step === 5)?"active":""} id="five"></li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </Col>
        </>
    )
}

export default ProgressBar