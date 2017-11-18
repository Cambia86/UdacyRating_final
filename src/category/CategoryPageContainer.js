import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import CategoryPage from "./CategoryPage";
import {
  postByCategory, postReorder, sortPostsBy, changeModalVisibility
} from "../post/functionsCreator";

class CategoryPageContainer extends Component {
  getCategory() {
    return this.props.match.params.category;
  }

  componentDidMount() {
    this.retrieveData(this.getCategory());
  }

  componentWillReceiveProps(nextProps) {
    if (this.getCategory() !== nextProps.match.params.category) {
      this.retrieveData(nextProps.match.params.category);
    }
  }

  retrieveData(path) {
    this.props.postByCategory(path);
  }


  sortByMode = (value) => {
    this.props.sortPostsBy(...value.split('/'))
  };

  render() {
    const path = this.getCategory();

    return (
      this.props.posts ?
        <CategoryPage
          name={path}
          posts={this.props.posts}
          sortedBy={this.props.sortedBy}
          sortByMode={this.sortByMode}
          modalShow={this.props.modalShow}
        />
        : null
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    postByCategory,
    sortPostsBy,
    modalShow: changeModalVisibility
  }, dispatch)
};

const mapStateToProps = (state) => ({
  posts: postReorder(state.posts),
  sortedBy: state.posts.sortBy
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryPageContainer)
);
