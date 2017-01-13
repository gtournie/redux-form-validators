import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { acceptance, required, email, length, numericality, confirmation } from 'redux-form-validators';

import { Button, Input, Form, FormFeedback, FormGroup, FormText, Label } from 'reactstrap';


function renderInputField({ hint, input, label, type, meta: { touched, error }={}, ...inputProps }) {
  inputProps = {...input, ...inputProps };
  let feedback = touched && error;
  let status   = touched && error ? 'danger' :  '';
  let htmlId   = inputProps.id || inputProps.name;

  return (
    <FormGroup color={status}>
      <Label className="form-control-label" for={htmlId}>{label}</Label>
      <Input type={type || 'text'} id={htmlId} autoComplete="off" state={status} {...inputProps} />
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}

function renderCheckField({ hint, input, label, type, meta: { touched, error, warning }={}, ...inputProps }) {
  inputProps = {...input, ...inputProps };
  let feedback = touched && error;
  let status   = touched && error ? 'danger' :  '';
  let htmlId   = inputProps.id || inputProps.name;

  return (
    <FormGroup color={status}>
      <Label check className="form-control-label" for={htmlId}>
        <Input type={type || 'text'} id={htmlId} autoComplete="off" state={status} {...inputProps} />
        {` ${label}`}
      </Label>
      {feedback ? <FormFeedback>{feedback}</FormFeedback> : ''}
      {hint ? <FormText color="muted">{hint}</FormText> : ''}
    </FormGroup>
  )
}



class FieldValidationForm extends Component {
  static contextTypes = {
    intl: React.PropTypes.object.isRequired
  };

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} noValidate>
          <Field name="email" type="email" label="Email" component={renderInputField}
            validate={[required(), email()]} />

          <Field name="password" type="password" label="Password" component={renderInputField}
            validate={[required(), length({ min: 8 })]} />

          <Field name="password_confirmation" type="password" label="Password confirmation" component={renderInputField}
            validate={[confirmation({ field: 'password', fieldLabel: 'Password' })]} />

          <Field name="age" type="text" label="Age" component={renderInputField}
            validate={[numericality({ int: true, '>': 0, '<': 100, allowBlank: true })]} />

          {/*<Button type="submit">Submit</Button>*/}
        </Form>
      </div>
    )
  }
}


FieldValidationForm = reduxForm({ form: 'fieldValidationForm' })(FieldValidationForm);

export default FieldValidationForm;








// var validations = {
//   email: {
//     validateOnBlur: true,
//     required: true,
//     minLength: 5,
//     email: true,
//     promise: function(fieldName, fieldValue, dispatch) {
//       return new Promise((resolve, reject) => {
//         setTimeout(function() {
//           if (fieldValue == 'example@example.com') {
//             resolve()
//           } else {
//             reject('The mail must be example@example.com, "' + (fieldValue || 'none') + '" given!')
//           }
//         }, 1000)
//       })
//     }
//   },
//   retryEmail: {
//     required: true,
//     matchField: 'email',
//   },
//   name: {
//     required: true
//   },
//   subject: {
//     required: true,
//     minLength: 5
//   },
//   message: {
//     required: true,
//     minLength: 10
//   }
// };
//
//
// const submit = (values, dispatch) => {
//   console.log('sending mail to contact', values);
// };
//
// @connect()
// @reduxForm({
//   form: 'contact',
//   ...generateValidation(validations)
// })
// export default class ContactForm extends Component {
//   render() {
//     const {
//         fields: { name, subject, email, retryEmail, message },
//         handleSubmit,
//         submitting,
//         valid,
//         pristine,
//         asyncValidating,
//     } = this.props;
//     var submitLabel = "Send";
//
//     if (pristine) {
//       submitLabel = "Fill in your message";
//     } else if (asyncValidating) {
//       submitLabel = "Validating...";
//     } else if (submitting) {
//       submitLabel = "Sending...";
//     } else if (!valid) {
//       submitLabel = "Please fill all fields correctly";
//     }
//     return (
//         <form onSubmit={handleSubmit(submit)}>
//           <div>
//             <label>Email</label>
//             <input type="email" required="required" placeholder="Email" {...email}/>
//             <FormMessages tagName="ul" errorCount="2" field={email}>
//               <li when="promise">
//                 {email.error && email.error.promise}
//               </li>
//               <li when="required">
//                 this field is required
//               </li>
//               <li when="email">
//                 please insert a valid email
//               </li>
//               <li when="minLength">
//                 this field must have at least 5 characters
//               </li>
//             </FormMessages>
//           </div>
//           <div>
//             <label>Retry email</label>
//             <input type="email" required="required" placeholder="Retry email" {...retryEmail}/>
//             <FormMessages tagName="ul" field={retryEmail}>
//               <li when="required">
//                 this field is required
//               </li>
//               <li when="matchField">
//                 the retry email must be the same as the email
//               </li>
//             </FormMessages>
//           </div>
//           <div>
//             <label>Name</label>
//             <input type="text" required="required" placeholder="Name" {...name}/>
//             <FormMessages tagName="ul" field={name}>
//               <li when="required">
//                 this field is required
//               </li>
//             </FormMessages>
//           </div>
//           <div>
//             <label>Subject</label>
//             <input type="text" required="required" placeholder="Subject" {...subject}/>
//             <FormMessages tagName="ul" errorCount="1" field={subject}>
//               <li when="required">
//                 this field is required
//               </li>
//               <li when="email">
//                 please insert a valid email
//               </li>
//               <li when="minLength">
//                 this field must have at least 5 characters
//               </li>
//             </FormMessages>
//           </div>
//           <div>
//             <label>Message</label>
//             <textarea type="text" required="required" placeholder="Subject" {...message}/>
//             <FormMessages tagName="ul" field={message}>
//               <li when="required">
//                 this field is required
//               </li>
//               <li when="minLength">
//                 this field must have at least 10 characters
//               </li>
//             </FormMessages>
//           </div>
//           <button disabled={!valid || pristine || asyncValidating} onClick={handleSubmit(submit)}>
//             {submitLabel}
//           </button>
//         </form>
//     );
//   }
// }