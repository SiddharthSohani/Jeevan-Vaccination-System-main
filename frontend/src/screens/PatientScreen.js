import React, { useState } from "react";
import { Container , Row, Col, Nav} from 'react-bootstrap';
import Vaccinated from '../components/Vaccinated';
import FullyVaccinated from '../components/FullyVaccinated';
import PartiallyVaccinated from '../components/PartiallyVaccinated';

const PatientScreen = () => {

  const [ currentRoute, setCurrentRoute ] = useState(1);

    const changeRoute = (number) => {
      setCurrentRoute(number);
    }

    return (
      <>
        <Container className="mt-3 text-center">
          <div className="navlinkVaccine">
              <Row className="text-center">
                <Col>
                  <Nav.Link className="text-white p-0 m-0" onClick={()=>changeRoute(1)}>All Doses</Nav.Link>
                </Col>
                <Col>
                  <Nav.Link className="text-white p-0 m-0" onClick={()=>changeRoute(2)}>Fully Vaccinated</Nav.Link>
                </Col>
                <Col>
                  <Nav.Link className="text-white p-0 m-0" onClick={()=>changeRoute(3)}>Partially Vaccinated</Nav.Link>
                </Col>
              </Row>
            </div>
            <hr/>
            <div className="allDoses">
                {(() => {
                    switch (currentRoute) {
                        case 1:return (<Vaccinated/>)
                        case 2:return (<FullyVaccinated/>)
                        case 3:return (<PartiallyVaccinated/>)
                        default:
                            return (<Vaccinated/>)
                    }
                })()}
              </div>
        </Container>
      </>
    );
};

export default PatientScreen;



