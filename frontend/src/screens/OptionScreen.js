import React from "react";
import { Container, Row , Col, Button , Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import OptionImg from '../img/OptionImg.png';

const OptionScreen = () => {

    return (
        <>
                <div className="main mt-0" fluid="md">
                    <Container>
                    <Row>
                        <Col xs={6} md={4} className="imgCls m-auto">
                            <Image src={OptionImg} fluid />
                        </Col>
                        <Col xs={12} md={8} className="align-self-center">
                            <Row className='m-auto text-center'>
                                <div className="intro-text mt-2">
                                    <h4 className="title">Get Started To Vaccinated</h4>
                                    <p className="subtitle">Vaccine Ensured , Life Secured</p>
                                </div>
                                <div className="buttonContainer mt-2">
                                    <div className="registerBtn">
                                        <Link to="/register">
                                            <Button className=" btn-success" >
                                                New to website
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="loginBtn">
                                        <Link to="/login">
                                            <Button className="btn-success" >
                                                Already a User
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Row>
                        </Col>
                        </Row>
                    </Container>
                </div>
        </>   
    )
};

export default OptionScreen;












