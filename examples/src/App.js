import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';

import FieldValidationForm from './field-validation-form';
// import GeneralValidationForm from './general-validation-form';

export default class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={{ size: 8, offset: 2 }}>
            <h2>Field validation example</h2>
            <FieldValidationForm />
          </Col>
        </Row>
      </Container>
    );
  }
}
