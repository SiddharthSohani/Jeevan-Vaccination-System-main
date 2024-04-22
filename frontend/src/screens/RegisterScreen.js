import React, {useContext} from 'react';
import { Container, Row , Col , Image} from 'react-bootstrap';
import MainScreen from './MainScreen';
import RegImg from '../img/RegisterBg.png';
import ErrorBg from '../img/Error.png';
import ProgressBar from '../components/ProgressBar';
import Form from '../components/Form/RegisterForm';
import { Step } from '../Context';

const LoginScreen = () => {

    const { step } = useContext(Step);

    return (
        <>
            <MainScreen title="REGISTER">
                <div className="main mt-0" fluid="md">
                    <Container>
                        <Row>
                            <Col className="img" xs={6} md={4}>
                                <Image src={(step === 6)?(ErrorBg):(RegImg)} fluid  className="logImg"/>
                            </Col>
                            <Col>
                                <ProgressBar noOfSteps={5}/>
                                <Form/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MainScreen>
        </>   
    )
};

export default LoginScreen;












