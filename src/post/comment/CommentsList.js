import React from 'react';
import PropTypes from 'prop-types';
import {  Dropdown, Button } from "semantic-ui-react";



import Comment from "./Comment";
import CommentFormModal from "./CommentFormModal";

const CommentsList = (props) => {
  const SORT_BY_OPTIONS = [
    { key: 'timestamp/asc', text: 'Created at (asc)', value: 'timestamp/asc' },
    { key: 'voteScore/desc', text: 'Vote Score (desc)', value: 'voteScore/desc' },

  ];
  return (
    <section>
      <div className="newRow marginTop10">
        <h2>Comment ({props.comments.length})</h2>
      </div>
      <div className="newRow marginTop10">
        Ordina <Dropdown
          inline header='Sorting criteria'
          options={SORT_BY_OPTIONS} defaultValue={`${props.sortedBy.key}/${props.sortedBy.order}`}
          onChange={(event, data) => props.sortByMode(data.value)}
        />
      </div>



      <div className="floatLeft paddingLeft20 ">
        <Button
          content="New" icon="add" basic
          onClick={() => props.modalShow(true)}
        />
      </div>


      <CommentFormModal
        isOpen={props.isModalOpen}
        comment={props.editingComment}
        postId={props.postId}
        submitForm={props.submitForm}
        modalShow={props.modalShow}
      />

      <div className="newRow ">
        {props.comments.length ? props.comments.map((comment) => (
          <Comment
            key={comment.id} id={comment.id} body={comment.body}
            author={comment.author} timestamp={comment.timestamp}
            score={comment.voteScore} handleVote={props.handleVote}
            deletePost={props.deletePost} editPost={props.editPost}
          />
        )) :
          <h3>No comment available</h3>}
      </div>
    </section>
  );
};

CommentsList.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  sortedBy: PropTypes.object.isRequired,
  sortByMode: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  handleVote: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  editingComment: PropTypes.object,
  editPost: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  modalShow: PropTypes.func.isRequired
};

export default CommentsList;
