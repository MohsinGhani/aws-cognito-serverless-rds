import React, { Component } from 'react';
import TopNav from '../../components/common/TopNav'
import { InputField, AutoSelectInputField } from "./../MaterialUI";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { ProductAction, authAction } from '../../store/actions'
import uuidv1 from "uuid/v1";
import './index.css'


class Feedback extends Component {
  state = {
    email: "",
    description: "",
    reason: "",
    operatingSystem: ""
  }
  handleInputs = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      console.log(this.state.description)
    })
  }

  handleSubmitFeedbackForm = () => {
    const { sentFeedbackAction } = this.props;
    sentFeedbackAction({
      email: this.state.email,
      description: this.state.description,
      id: uuidv1,
      reason: this.state.reason,
      OperatingSystem: this.state.operatingSystem
    })
  }
  render() {
    return (
      <div className="privacy">
        <TopNav />
        <div className="privacy-content-form">
          <h1>Contact Us</h1>
          <div>
            <p>Please fill out the following form for feedback or customer support</p>
            <InputField
              placeholder="Description..."
              multiline={true}
              rows={10}
              name="description"
              rowsMax={4}
              value={this.state.description}
              maxLength={500}
              onChange={this.handleInputs}
            />
            <p className="text-areabox-para">0 of 500</p>
            <InputField
              label={"Operating System"}
              variant={"outlined"}
              color={" #f9f2ec"}
              id={"selectedCategory"}
              // value={selectedCategory ? selectedCategory.title : ""}
              fullWidth={true}
            // onClick={() => this.setState({ isSelectCatModal: true })}
            />
            <InputField
              label={"Selected Reason"}
              variant={"outlined"}
              color={" #f9f2ec"}
              id={"selectedCategory"}
              // value={selectedCategory ? selectedCategory.title : ""}
              // fullWidth={true}
              onClick={() => { }}
            />
            <InputField
              label={"Email (max 300 length)"}
              variant={"outlined"}
              color={" #f9f2ec"}
              id={"Email"}
              name="email"
              value={this.state.email}
              fullWidth={true}
              onChange={this.handleInputs}
            // onClick={() => this.setState({ isSelectCatModal: true })}
            />
          </div>
          <div className="privacy-content-form-btn-parent">
            <Button onClick={this.handleSubmitFeedbackForm} className="privacy-content-form-btn">Submit</Button>

          </div>
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    ProductReducer: {
      products, getProductsLoader, getProductsError,
      searchedProducts, searchLoader, searchError,
      searchedQuery, sentFeedback
    },
    authReducer: { user, isLoggedIn, }
  } = state;
  return {
    products, getProductsLoader, getProductsError,
    searchedProducts, searchLoader, searchError,
    searchedQuery,
    user, isLoggedIn, sentFeedback
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsAction: () => dispatch(ProductAction.getProducts()),
    isLoggedInAction: () => dispatch(authAction.isLoggedIn()),
    sentFeedbackAction: (payload) => dispatch(ProductAction.sendFeedback(payload))
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles({})(Feedback));