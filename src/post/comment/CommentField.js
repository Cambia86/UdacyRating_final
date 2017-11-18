import React  from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from "semantic-ui-react";
import { combineValidators, isRequired } from 'revalidate';
import SemanticFormField from "../../shared/SemanticFormField";


const validate = combineValidators({
  body: isRequired('body'),
  author: isRequired('author')
});

let CommentField = ({ submitForm }) => {
  return (
    <Form onSubmit={submitForm}>
      <Field required name="body"  label="Body"   component={SemanticFormField} as={Form.TextArea}   placeholder="New Comment" />
      <Field required name="author"  label="Author" component={SemanticFormField} as={Form.Input}    placeholder="Author" />
    </Form>
  )
};

CommentField = reduxForm({
  form: 'comment',
  fields: ['body', 'author'],
  validate
})(CommentField);


export default CommentField;
