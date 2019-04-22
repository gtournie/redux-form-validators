import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { reduxForm, Field, FormSection } from 'redux-form'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import {
  acceptance,
  date,
  required,
  email,
  length,
  numericality,
  confirmation,
  validateForm,
} from 'redux-form-validators'

import { Col, Row, Button, Input, Form, FormFeedback, FormGroup, FormText, Label } from 'reactstrap'

let FIELD_INDEX = 0

function renderInputField({ hint, input, label, type, meta: { touched, error } = {}, ...inputProps }) {
  inputProps = { ...input, ...inputProps }
  let feedback = touched && error
  let invalid = !!(touched && error)
  let htmlId = 'general-validation-form' + ++FIELD_INDEX

  return (
    <FormGroup>
      <Label className="form-control-label" for={htmlId}>
        {label}
      </Label>
      <Input invalid={invalid} type={type || 'text'} id={htmlId} autoComplete="off" {...inputProps} />
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}

function renderCheckField({ hint, input, label, type, meta: { touched, error, warning } = {}, ...inputProps }) {
  inputProps = { ...input, ...inputProps }
  let feedback = touched && error
  let invalid = !!(touched && error)
  let htmlId = 'general-validation-form' + ++FIELD_INDEX

  return (
    <FormGroup>
      <Label check className="form-control-label" for={htmlId}>
        <Input invalid={invalid} type={type || 'text'} id={htmlId} autoComplete="off" {...inputProps} />
        {` ${label}`}
      </Label>
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}

let twentyYearsAgo = function() {
  let d = new Date()
  d.setFullYear(d.getFullYear() - 20)
  return d
}

const TOO_YOUNG_ERROR = (
  <FormattedMessage id="form.errors.tooYoung" defaultMessage="Sorry, you must be at least 18 years old" />
)

let validate = validateForm({
  name: [required(), length({ in: [6, 20] })],
  email: [required(), email()],
  pass: {
    password: [required(), length({ min: 8 })],
    password_confirmation: [confirmation({ field: 'pass.password', fieldLabel: 'Password' })],
  },
  bday: [
    date({ format: 'mm/dd/yy' }),
    date({
      format: 'mm/dd/yy',
      '<=': twentyYearsAgo,
      msg: 'Sorry, you must be at least 20 years old',
      allowBlank: true,
    }),
  ],
  date: [
    date({
      format: 'YYYY-MM-DD',
      ymd: 'YMD',
      '>': new Date(2000, 0, 1),
      '<': 'today',
      allowBlank: true,
    }),
  ],
  age: [required(), numericality({ int: true, msg: 'int only' }), numericality({ '>=': 18, msg: TOO_YOUNG_ERROR })],
})

class GeneralValidationForm extends Component {
  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Row>
            <Col sm="6">
              <Field name="name" type="text" label="Name" component={renderInputField} />
            </Col>
            <Col sm="6">
              <Field name="email" type="email" label="Email" component={renderInputField} />
            </Col>
          </Row>
          <FormSection name="pass">
            <Row>
              <Col sm="6">
                <Field name="password" type="password" label="Password" component={renderInputField} />
              </Col>
              <Col sm="6">
                <Field
                  name="password_confirmation"
                  type="password"
                  label="Password confirmation"
                  component={renderInputField}
                />
              </Col>
            </Row>
          </FormSection>
          <Row>
            <Col sm="6">
              <Field name="bday" type="text" label="Birthday" component={renderInputField} placeholder="mm/dd/yy" />
            </Col>
            <Col sm="6">
              <Field name="date" type="text" label="Date" component={renderInputField} placeholder="YYYY-MM-DD" />
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <Field name="age" type="text" label="Age" component={renderInputField} />
            </Col>
          </Row>
          {/*<Button type="submit">Submit</Button>*/}
        </Form>
      </div>
    )
  }
}

GeneralValidationForm = reduxForm({ form: 'generalValidationForm', validate })(GeneralValidationForm)

export default GeneralValidationForm
