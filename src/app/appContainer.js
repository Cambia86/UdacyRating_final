import React, { Component } from 'react'
import {  withRouter } from "react-router-dom";
import {Link} from 'react-router-dom'
import { retrieveAll } from "../category/reducer";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

  import ReduxToastr from 'react-redux-toastr'

class AppContainer extends Component {
  componentDidMount() {
    this.props.retrieveAll();
  }

  render() {
    return (
      <div className="App">
     
        <ul className="flexBox topMenu">
        <Link className="floatLeft marginLeft20 btn" to={`/`}  ><p >Home</p></Link>
          {this.props.categories && this.props.categories.map(category =>
             <Link className="floatLeft marginLeft20 btn" key={category.name} to={`/${category.path}`} >   <p >{category.name}</p></Link>
          )}
        </ul>

        <div className="newRow centeritem "> {this.props.children}</div>

        <ReduxToastr
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ retrieveAll }, dispatch)
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));
