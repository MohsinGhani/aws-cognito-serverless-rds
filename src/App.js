import React, { Component } from 'react';
import './App.css';
import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import ForgotPassword from './components/Auth/ForgotPassword'
import ConfirmSignUp from './components/Auth/ConfirmSignUp'
import SelectCategory from './components/SelectCategory'
import AddProduct from './components/AddProduct'
import Products from './components/Products'
import Product from './components/Product'
import { Provider } from 'react-redux';
import store from './store/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Amplify from 'aws-amplify';
import awsConfig from './config/awsConfig'
import credentials from './config/credentials'
import PrivateRoute from './components/common/PrivateRoute';

Amplify.configure(awsConfig)

class App extends Component {

  componentDidMount() {
    this.loadFacebookSDK();
  }

  loadFacebookSDK() {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: credentials.FB_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.1'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Products} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/confirm-signup" component={ConfirmSignUp} />
            <Route exact path="/product/:product_id" component={Product} />
            <Switch>
              {/* <PrivateRoute exact path="/" component={Products} /> */}
              <PrivateRoute exact path="/select-category" component={SelectCategory} />
              <PrivateRoute exact path="/add-product" component={AddProduct} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
