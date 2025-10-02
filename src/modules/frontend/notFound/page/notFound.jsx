import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for is not valid.</p>
          {/* <Button href="/" variant="primary">Go Back to Dashboard</Button> */}
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
