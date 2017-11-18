import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer} from 'react-redux-toastr'

import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from "react-router-redux";

import AppContainer from "./appContainer";
import CategoryPageContainer from "../category/CategoryPageContainer";
import PostPageContainer from "../post/PostPageContainer";

import categories from '../category/reducer.js';
import posts from '../post/reducer.js';
import comments from '../post/comment/reducer.js';



import './App.css'

// Set up redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Set up react-router-redux
const history = createHistory();
const middleware = routerMiddleware(history);

// Set up reducers and enhancers
const reducers = combineReducers({
  categories,
  posts,
  comments ,
  router: routerReducer,
  toastr: toastrReducer,
  form: formReducer
});

const enhancers = composeEnhancers(
  applyMiddleware(thunk),
  applyMiddleware(middleware)
);

const store = createStore(reducers, enhancers);

// Set up app

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <AppContainer>
          <Switch>
            <Route exact path='/' component={CategoryPageContainer} />
            <Route exact path='/:category' component={CategoryPageContainer} />
            <Route exact path='/:category/:postId' component={PostPageContainer} />
          </Switch>
        </AppContainer>
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
