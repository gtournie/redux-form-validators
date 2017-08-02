import React, { Component } from 'react'
import { Container, Col, Row } from 'reactstrap'

import FieldValidationForm from './field-validation-form'
import GeneralValidationForm from './general-validation-form'

export default class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm={{ size: 6 }}>
            <h2>Field validation example</h2>
            <FieldValidationForm />
          </Col>
          <Col sm={{ size: 6 }}>
            <h2>General validation example</h2>
            <GeneralValidationForm />
          </Col>
        </Row>
      </Container>
    )
  }
}
