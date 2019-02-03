import React, { Component } from 'react';
import './App.css';
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import ForgotPassword from './components/Auth/ForgotPassword'
import ConfirmSignUp from './components/Auth/ConfirmSignUp'
import SelectCategory from './components/SelectCategory'
import { Provider } from 'react-redux';
import store from './store/store'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsConfig from './config/awsConfig'

Amplify.configure(awsConfig)

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
            <Route exact path="/confirm-signup" component={ConfirmSignUp} />
            <Route exact path="/select-category" component={SelectCategory} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
