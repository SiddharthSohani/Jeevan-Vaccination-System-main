import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import MainScreen from './MainScreen';
import AboutImg from '../img/AboutBg.png';

const AboutScreen = () => {
    return (
        <>
            <MainScreen title="ABOUT US">
                <div className="main mt-0" fluid="md">
                    <Container>
                        <Row>
                            <Col className="img" xs={6} md={4}>
                            <Image src={AboutImg} fluid  />
                            </Col>
                            <Col xs={12} md={8}>
                                <p><b>Welcome To Jeevan Vaccination System.</b></p>
                                <span>Hii. I am Siddharth Sohani (Full Stack Web Developer).</span>
                                <ul>
                                    <li>We provide vaccination services.</li>
                                    <li>Accurate and secured vaccination facility.</li>
                                    <li>High validation for proper vaccination.</li>
                                    <li>Ensuring your health safety by providing value in your life</li>
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MainScreen>   
        </>
    )
}

export default AboutScreen;
