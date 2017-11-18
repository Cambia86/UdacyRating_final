import React from 'react';
import PropTypes from 'prop-types';
import {  Button } from "semantic-ui-react";
import Timestamp from 'react-timestamp';


const Comment = (props) => {
  const createdAt = new Date(props.timestamp);

  return (
    <div className="newRow marginTop10">
      <div className="floatLeft marginTop30 divider">
        <div className="floatLeft  ">
          <i onClick={() => props.deletePost(props.id, props.category)} className="fa fa-trash-o fontSize15em red"
            aria-hidden="true"></i>

          <i onClick={() => props.editPost(props.id)} className="fa fontSize15em fa-pencil paddingLeft10 blue"
            aria-hidden="true"></i>
        </div>
        <div className="floatLeft paddingLeft10">
          <Button className="circleButton red"
            attached="bottom" size="mini" icon="minus" compact
            onClick={() => props.handleVote(props.id, 'downVote')}
          />
        </div>
        <div className="floatLeft paddingLeft10">
          <p>
            {props.score}
          </p>
        </div>
        <div className="floatLeft paddingLeft10">
          <Button className="circleButton green"
            attached="top" size="mini" icon="plus" compact
            onClick={() => props.handleVote(props.id, 'upVote')}
          />
        </div>

      </div>

      <div className="bckComment">
        <div className="newRow">
          <p className="floatLeft"> Author:</p>
          <p className="floatLeft paddingLeft10">{props.author}</p>
        </div>
        <div className="newRow">
          <p className="floatLeft"> Comment:</p>
          <p>{props.body}</p>
        </div>
        <div className="newRow">
          <Timestamp time={createdAt} format="full" style={{ margin: '0' }} />
        </div>
      </div>
      <hr className="dividerSection marginBottom20"/>

    </div>
  );
};

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  handleVote: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired
};

export default Comment;
