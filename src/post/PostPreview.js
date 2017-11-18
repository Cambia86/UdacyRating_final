import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Item, Button, Label, Icon, Header} from "semantic-ui-react";
import Timestamp from 'react-timestamp';

const PostPreview = (props) => {
  const createdAt = new Date(props.post.timestamp);


  return (

    <div className="newRow cardShadow width100">
      <div className="newRow marginTop10 ">
        <i onClick={() => props.bindDeletePost(props.post.id, props.post.category)} className="fa fa-trash-o fontSize15em red" aria-hidden="true"></i>
        <i onClick={() => props.bindStartEditingPost(props.post.id)}  
            className="fa fontSize15em fa-pencil paddingLeft10"
            aria-hidden="true"></i>
      </div>
      <div className="floatLeft newRow">

        <div className="floatLeft">

          <Button className="circleButton red"
            attached="bottom" size="mini" icon="minus" compact
            onClick={() => props.bindPostUpDown(props.post.id, 'downVote')}
          />
         
        </div>
        <div className="floatLeft paddingLeft10">
          <p>
            {props.post.voteScore}
          </p>
        </div>
        <div className="floatLeft paddingLeft10">
          <Button  className="circleButton green"
            attached="top" size="mini" icon="plus" compact
            onClick={() => props.bindPostUpDown(props.post.id, 'upVote')}
          />
        </div>

      </div>
      <div className="newRow">
        {props.path ?
          <Item.Header as={Link} to={`/${props.path}`}><Header>{props.post.title}</Header></Item.Header> :
          <Item.Header>{props.post.title}</Item.Header>
        }
      </div>
      <div className="newRow">
       <Item.Description>{props.post.body}</Item.Description>
      </div>
      <div className="newRow">
        {!props.showBody &&
        <Label>
          <Icon name='comment'/> &nbsp; {props.post.commentsCount}
        </Label>
        }
      </div>
      <div className="newRow">
        <p> Autore: {props.post.author}</p>
      </div>
      <div className="floatLeft paddingLeft30">
        <p><Timestamp time={createdAt} format="full" style={{margin: '0'}}/></p>
      </div>
    </div>
  );
};

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  bindPostUpDown: PropTypes.func.isRequired,
  bindDeletePost: PropTypes.func.isRequired,
  bindStartEditingPost: PropTypes.func.isRequired,
  path: PropTypes.string
};

PostPreview.defaultProps = {
  showBody: false
};

export default PostPreview;
