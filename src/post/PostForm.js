import React  from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { combineValidators, isRequired } from 'revalidate';

import { Form } from "semantic-ui-react";

import SemanticFormField from "../shared/SemanticFormField";

const validate = combineValidators({
  category: isRequired('category'),
  title: isRequired('title'),
  body: isRequired('body'),
  author: isRequired('author')
});

let PostForm = (props) => {
  const categoryList = props.categories.reduce((categories, category) => {
    return categories.concat({
      key: category.path,
      value: category.path,
      text: category.name
    })
  }, []);

  return (
    <Form onSubmit={props.submitForm}>
      <Field
        name="category" component={SemanticFormField} as={Form.Select}
        options={categoryList}
        label="Category" placeholder="Select category" required
      />

      <Field
        name="title" component={SemanticFormField} as={Form.Input}
        label="Title" placeholder="Title" required
      />

      <Field
        name="body" component={SemanticFormField} as={Form.TextArea}
        label="Body" placeholder="Body" required
      />

      <Field
        name="author" component={SemanticFormField} as={Form.Input}
        label="Author" placeholder="Author" required
      />
    </Form>
  )
};

PostForm.propTypes = {
  categories: PropTypes.array.isRequired
};

PostForm = reduxForm({
  form: 'post',
  fields: ['category', 'title', 'body', 'author'],
  validate
})(PostForm);

export default PostForm;
