import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Modal, Button } from "semantic-ui-react";

import CommentField from "./CommentField";

class CommentFormModal extends Component {
  showCommentForm = () => {
    let commentvalues;

    if (this.props.comment) {
      commentvalues = this.props.comment
    } else {
      commentvalues = { postId: this.props.postId };
    }

    return (
      <CommentField
        ref={form => { this.form = form }}
        onSubmit={this.props.submitForm}
        onSubmitSuccess={this.closeModal}
        initialValues={commentvalues}
      />
    )
  };
  
  closeModal = () => {
    this.props.modalShow(false)
  };

  
  submitForm = () => {
    this.form.submit();
  };

  render() {
    return (
      <Modal
        open={this.props.isOpen} size="tiny"
        onClose={this.closeModal}
      >
        <Modal.Header>{this.props.comment ?'Edit Comment' :'New Comment'}</Modal.Header>
          <Modal.Content>{this.showCommentForm()} </Modal.Content>
          <Modal.Actions>
            <Button content='back' onClick={this.closeModal} />
            <Button content='OK' positive onClick={() => this.submitForm()} />
          </Modal.Actions>
      </Modal>
    );
  }
}

CommentFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object,
  modalShow: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired
};

export default CommentFormModal;
