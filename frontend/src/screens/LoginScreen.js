import React, {useContext} from 'react';
import { Container, Row , Col , Image} from 'react-bootstrap';
import MainScreen from './MainScreen';
import LogImg from '../img/LoginBg.png';
import ErrorBg from '../img/Error.png';
import ProgressBar from '../components/ProgressBar';
import Form from '../components/Form/LoginForm';
import { Step } from '../Context';

const LoginScreen = () => {

    const { step } = useContext(Step);

    return (
        <>
            <MainScreen title="LOGIN">
                <div className="main mt-0" fluid="md">
                    <Container>
                        <Row>
                            <Col className="img" xs={6} md={4}>
                                <Image src={(step === 4)?(ErrorBg):(LogImg)} fluid  className="logImg"/>
                            </Col>
                            <Col>
                                <ProgressBar noOfSteps={3}/>
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












