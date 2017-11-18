import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown,  Icon, Button } from "semantic-ui-react";

import PostsPreviewContainer from "../post/PostsPreviewContainer";
const CategoryPage = (props) => {
  const SORT_BY_OPTIONS = [
       { key: 'timestamp/asc', text: 'Date creation (asc)', value: 'timestamp/asc' },
    { key: 'voteScore/desc', text: 'Vote (desc)', value: 'voteScore/desc' },

  ];
  return (
    <div>
      <div className="floatLeft"> {props.name ?
        <h2>Categoria: {props.name}</h2> :
        <h2>Tutte le categorie</h2>
      }</div>
      <div className="newRow">
        <Icon name='sort' />
        Sort by:
        {' '}
        <Dropdown
          inline header='Sort by'
          options={SORT_BY_OPTIONS} defaultValue={`${props.sortedBy.key}/${props.sortedBy.order}`}
          onChange={(event, data) => props.sortByMode(data.value)}
        />
      </div>
      <div className="newRow">
        <p>
          <Button
            content="New post" icon="add" size="small" color="green"
            onClick={()=> props.modalShow(true)}
          />.
        </p>
      </div>
      <div className="newRow marginTop10">
        <PostsPreviewContainer posts={props.posts} />
        {props.posts.length === 0 && <h3>There are no posts in this category yet. Start by creating your own!</h3>}
      </div>

    </div>
  );
};

CategoryPage.propTypes = {
  name: PropTypes.string,
  posts: PropTypes.array.isRequired,
  sortedBy: PropTypes.object.isRequired,
  sortByMode: PropTypes.func.isRequired,
  modalShow: PropTypes.func.isRequired
};

export default CategoryPage;
