import React from 'react';
import PropTypes from 'prop-types';

import PostsPreviewContainer from "./PostsPreviewContainer";
import CommentsListContainer from "./comment/CommentsListContainer";

const PostPage = (props) => {
  return (
    <div>
      <div className="newRow marginTop10 shadowUp">
        <h2>Post</h2>
      </div>
      <div className="newRow ">
        <PostsPreviewContainer posts={[props.post]} showBody={true} />
      </div>
      <div className="newRow marginTop10 cardShadow">
        <CommentsListContainer postId={props.post.id} />
      </div>

    </div>
  );
};

PostPage.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostPage;
