import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './reducers/index';
import rootEpic from './epics/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(epicMiddleware)
      )
  );

  epicMiddleware.run(rootEpic);

  export default store