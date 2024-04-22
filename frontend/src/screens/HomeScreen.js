import React, { useEffect  } from "react";
import { Container, Row , Col, Button, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import HomeImg from '../img/HomeBg.png';

const HomeScreen = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      const accountType = userInfo.data.accountType.toLowerCase();
      navigate(`/${accountType}`);
    }
  }, [navigate]);

  return (
    <div className="main" fluid="md">
      <Container className="container">
        <Row>
          <Col xs={6} md={4} className="imgCls m-auto">
            <Image src={HomeImg} fluid  />
          </Col>
          <Col xs={12} md={8} className="align-self-center">
            <div className="intro-text">
              <h4 className="title">Welcome To Jeevan Vaccination System</h4>
              <p className="subtitle">Vaccine Ensured , Life Secured</p>
            </div>
            <div className="buttonContainer">
              <Link to="/options">
                <Button size="lg" className="landingbutton btn-success" >
                  Enter JVS
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeScreen;