import React, { Component } from 'react';
import './App.css';
import SignUp from './components/Auth/SignUp'
import { Provider } from 'react-redux';
import store from './store/store'
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={SignUp} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
