import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { reduxForm, Field, FormSection } from 'redux-form'
import { FormattedMessage } from 'react-intl'
import Validators, {
  acceptance,
  date,
  required,
  email,
  file,
  length,
  numericality,
  confirmation,
  url,
  addValidator,
} from 'redux-form-validators'

import { Col, Row, Button, Input, Form, FormFeedback, FormGroup, FormText, Label } from 'reactstrap'

let FIELD_INDEX = 0

function renderFileField({ hint, input, label, type, meta: { touched, error } = {}, ...inputProps }) {
  inputProps = { ...input, ...inputProps }
  delete inputProps.value
  let feedback = touched && error
  let invalid = !!(touched && error)
  let htmlId = 'field-validation-form' + ++FIELD_INDEX

  return (
    <FormGroup color={status}>
      <Label className="form-control-label" for={htmlId}>
        {label}
      </Label>
      <Input invalid={invalid} type="file" multiple="multiple" id={htmlId} {...inputProps} />
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}

function renderInputField({ hint, input, label, type, meta: { touched, error } = {}, ...inputProps }) {
  inputProps = { ...input, ...inputProps }
  let feedback = touched && error
  let invalid = !!(touched && error)
  let htmlId = 'field-validation-form' + ++FIELD_INDEX

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
  let htmlId = 'field-validation-form' + ++FIELD_INDEX

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

class FieldValidationForm extends Component {
  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Row>
            <Col sm="6">
              <Field
                name="name"
                type="text"
                label="Name"
                component={renderInputField}
                validate={[required(), length({ in: [6, 20] })]}
              />
            </Col>
            <Col sm="6">
              <Field
                name="email"
                type="email"
                label="Email"
                component={renderInputField}
                validate={[required(), email()]}
              />
            </Col>
          </Row>
          <FormSection name="pass">
            <Row>
              <Col sm="6">
                <Field
                  name="password"
                  type="password"
                  label="Password"
                  component={renderInputField}
                  validate={[required(), length({ min: 8 })]}
                />
              </Col>
              <Col sm="6">
                <Field
                  name="password_confirmation"
                  type="password"
                  label="Password confirmation"
                  component={renderInputField}
                  validate={[confirmation({ field: 'pass.password', fieldLabel: 'Password' })]}
                />
              </Col>
            </Row>
          </FormSection>
          <Row>
            <Col sm="6">
              <Field
                name="bday"
                type="text"
                label="Birthday"
                component={renderInputField}
                placeholder="mm/dd/yy"
                validate={[
                  date({
                    format: 'mm/dd/yy',
                    '<=': twentyYearsAgo,
                    msg: 'Sorry, you must be at least 20 years old',
                    allowBlank: true,
                  }),
                ]}
              />
            </Col>
            <Col sm="6">
              <Field
                name="date"
                type="text"
                label="Date"
                component={renderInputField}
                placeholder="YYYY-MM-DD"
                validate={[
                  date({
                    format: 'YYYY-MM-DD',
                    ymd: 'YMD',
                    '>': new Date(2000, 0, 1),
                    '<': 'today',
                    allowBlank: true,
                  }),
                ]}
              />
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <Field
                name="age"
                type="text"
                label="Age"
                component={renderInputField}
                validate={numericality({ int: true, '>': 0, '<': 100, msg: 'form.errors.invalid', allowBlank: true })}
              />
            </Col>
            <Col sm="6">
              <Field
                name="url"
                type="text"
                label="URL"
                component={renderInputField}
                validate={url({ allowBlank: true })}
              />
            </Col>
          </Row>
          <Row>
            <Col sm="12">
              <Field
                name="file"
                label="File"
                component={renderFileField}
                validate={[required(), file({ minSize: '0.2MB', maxSize: '1MB' })]}
              />
            </Col>
          </Row>
          {/*<Button type="submit">Submit</Button>*/}
        </Form>
      </div>
    )
  }
}

FieldValidationForm = reduxForm({ form: 'fieldValidationForm' })(FieldValidationForm)

export default FieldValidationForm
