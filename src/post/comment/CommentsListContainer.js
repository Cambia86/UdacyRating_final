import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";


import{getAllComments, voteComment,  sortCommentsBy,upsertComment, changeModalVisibility,  deleteComment, startEditingComment,commentsReorder,editingCommentSelector} from './functionsCreator'

import CommentsList from "./CommentsList";

class CommentsListContainer extends Component {
  componentDidMount() {
    this.props.getAllComments(this.props.postId);
  }

  sortByMode = (value) => {
    this.props.sortByMode(...value.split('/'))
  };

  render() {
    return (
      <CommentsList
        postId={this.props.postId}
        comments={this.props.comments}
        sortedBy={this.props.sortedBy}
        sortByMode={this.sortByMode}
        handleVote={this.props.handleVote}
        submitForm={this.props.submitForm}
        deletePost={this.props.deletePost}
        isModalOpen={this.props.isModalOpen}
        modalShow={this.props.modalShow}
        editPost={this.props.editPost}
        editingComment={this.props.editingComment}
      />
    )
  }
}

CommentsListContainer.propTypes = {
  postId: PropTypes.string.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAllComments,
    handleVote: voteComment,
    sortByMode: sortCommentsBy,
    submitForm: upsertComment,
    modalShow: changeModalVisibility,
    deletePost: deleteComment,
    editPost: startEditingComment
  }, dispatch)
};

const mapStateToProps = (state, ownProps) => ({
  comments: commentsReorder(state.comments),
  sortedBy: state.comments.sortBy,
  isModalOpen: state.comments.isModalOpen,
  editingComment: editingCommentSelector(state.comments)
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsListContainer);
