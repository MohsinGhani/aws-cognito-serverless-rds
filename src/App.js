import React, { Component } from 'react';
import './App.css';
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import ForgotPassword from './components/Auth/ForgotPassword'
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
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
