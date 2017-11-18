import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from "semantic-ui-react";

import PostForm from "./PostForm";

class PostFormModal extends Component {
  // Submit button is outside <Form /> (because of Modal markup)
  // This method programmatically submits the form.
  submitForm = () => {
    this.form.submit();
  };

  handleModalClose = () => {
    this.props.modalShow(false)
  };

  renderForm = () => {
    let initialValues;

    if (this.props.post) {
      initialValues = this.props.post
    } else {
      initialValues = { category: this.props.category };
    }

    return (
      <PostForm
        ref={form => { this.form = form }}
        onSubmit={this.props.submitForm}
        onSubmitSuccess={this.handleModalClose}
        categories={this.props.categories}
        initialValues={initialValues}
      />
    )
  };

  render() {
    if (!this.props.show) return null;

    return (
      <Modal
        open={this.props.show} size="tiny"
        onClose={this.handleModalClose}
      >
        <Modal.Header>
          {this.props.post ?
            'Edit Post' :
            'Create Post'}
        </Modal.Header>
        <Modal.Content>
          {this.renderForm()}
        </Modal.Content>
        <Modal.Actions>
          <Button content='back' onClick={this.handleModalClose} />
          <Button content='OK' positive onClick={() => this.submitForm()} />
        </Modal.Actions>
      </Modal>
    );
  }
}

PostFormModal.propTypes = {
  show: PropTypes.bool.isRequired,
  categories: PropTypes.array.isRequired,
  post: PropTypes.object,
  modalShow: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default PostFormModal;
