import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import {
  votePost, postTOedit, changeModalVisibility, handlePostForm, deletePost, startEditingPost
} from "../post/functionsCreator";
import PostPreview from "./PostPreview";
import PostFormModal from "../post/PostFormModal";
import { withRouter } from "react-router-dom";


class PostsPreviewContainer extends Component {

  render() {
    if (!this.props.isModalOpen && !this.props.posts.length)
      return null;

    return (
      <div>

        {this.props.posts.map(post =>

          <PostPreview
          post={post}
          key={post.id}
          path={`${post.category}/${post.id}`}
          showBody={this.props.showBody}
          bindPostUpDown={this.props.bindPostUpDown}
          bindDeletePost={this.props.bindDeletePost}
          bindStartEditingPost={this.props.bindStartEditingPost} 
          />
        )}

        <PostFormModal
          show={this.props.isModalOpen}
          post={this.props.editingPost}
          submitForm={this.props.submitForm}
          modalShow={this.props.modalShow}
          categories={this.props.categories}
          category={this.props.match.params.category}
        />
      </div>
    )
  }
}

PostsPreviewContainer.propTypes = {
  posts: PropTypes.array.isRequired,
  showBody: PropTypes.bool.isRequired
};

PostsPreviewContainer.defaultProps = {
  showBody: false
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    bindPostUpDown: votePost,
    modalShow: changeModalVisibility,
    submitForm: handlePostForm,
    bindDeletePost: deletePost,
    bindStartEditingPost: startEditingPost
  }, dispatch)
};

const mapStateToProps = (state, ownProps) => ({
  isModalOpen: state.posts.isModalOpen,
  editingPost: postTOedit(state.posts),
  categories: state.categories
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostsPreviewContainer)
);
