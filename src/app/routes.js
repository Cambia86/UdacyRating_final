import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from "react-router-redux";

import AppContainer from "./appContainer";
import CategoryPageContainer from "../category/CategoryPageContainer";
import PostPageContainer from "../post/PostPageContainer";

class Routes extends Component {
  render() {
    return (
      <ConnectedRouter history={this.props.history} >
        <AppContainer>
          <Switch>
            <Route exact path='/' component={CategoryPageContainer} />
            <Route exact path='/:category' component={CategoryPageContainer} />
            <Route exact path='/:category/:postId' component={PostPageContainer} />
          </Switch>
        </AppContainer>
      </ConnectedRouter>
    );
  }
}

export default Routes;
