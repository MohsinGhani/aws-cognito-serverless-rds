import React, { Component } from "react";
import TopNav from "../../components/common/TopNav";
import { InputField } from "./../MaterialUI";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { ProductAction, authAction } from "../../store/actions";
import uuidv1 from "uuid/v1";
import ReactLoading from "react-loading";
import TextModal from "./../common/TextModal";
import "./index.css";

class Feedback extends Component {
  state = {
    email: "",
    description: "",
    openTextModal: false,
    isEmailFormatValid: false,
    textModalTitle: "",
    textModalText: "",
    subject: ""
  };
  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitFeedbackForm = () => {
    const { sentFeedbackAction } = this.props;
    const { email, description, subject } = this.state;

    if (this.validateSaveButton()) {
      sentFeedbackAction({
        email: email,
        description: description,
        id: uuidv1(),
        subject
      });
    }
  };

  validateEmail = () => {
    let isEmailFormatValid = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
      this.state.email
    );
    this.setState({ isEmailFormatValid: !isEmailFormatValid });
    return isEmailFormatValid;
  };

  validateSaveButton = () => {
    const { description, subject } = this.state;

    return (
      description &&
      description.length >= 30 &&
      (subject && subject.length >= 30) &&
      this.validateEmail()
    );
  };

  closeTextModal = () => {
    this.setState({ openTextModal: false });
    this.props.history.push("/");
  };

  componentDidUpdate(prevProps, prevState) {
    const { sentFeedback, sendFeedbackLoader, sendFeedbackError } = this.props;
    // after saved product Error message if any error
    if (
      !sendFeedbackLoader &&
      prevProps.sendFeedbackError !== sendFeedbackError
    ) {
      this.setState({
        openTextModal: true,
        textModalTitle: "Error",
        textModalText: `${sendFeedbackError.error}`
      });
    }
    // after saved product Successfull message
    if (!sendFeedbackLoader && prevProps.sentFeedback !== sentFeedback) {
      this.setState({
        openTextModal: true,
        textModalTitle: "Successfull",
        textModalText: `${sentFeedback}`,
        description: "",
        email: "",
        subject: ""
      });
    }
    if (this.state.email !== prevState.email) {
      this.validateEmail();
    }
  }

  render() {
    const { sendFeedbackLoader } = this.props;
    const {
      openTextModal,
      textModalTitle,
      textModalText,
      isEmailFormatValid,
      email,
      description,
      subject
    } = this.state;

    return (
      <div className="privacy">
        <TopNav />
        <div className="privacy-content-form">
          <TextModal
            open={openTextModal}
            handleClose={this.closeTextModal}
            title={textModalTitle}
            text={textModalText}
            isTimer={true}
          />

          <h1>Contact Us</h1>
          <div>
            <p>
              Please fill out the following form for feedback or customer
              support
            </p>
            <Grid item md={12} sm={12} xs={12}>
              <InputField
                type="string"
                label={"Subject (max 300 length)"}
                variant={"outlined"}
                id={"subject"}
                fullWidth={true}
                name="subject"
                value={subject}
                fullWidth={true}
                onChange={this.handleInputs}
                maxLength={300}
              />
              {subject.length <= 30 && (
                <label
                  className={`custom-input-label`}
                  style={{ color: "red" }}
                >
                  Please enter minimum 30 characters in subject.
                </label>
              )}
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <InputField
                label={"Description"}
                variant={"outlined"}
                id={"description"}
                name="description"
                fullWidth={true}
                onChange={this.handleInputs}
                multiline={true}
                rowsMax={"8"}
                rows={"8"}
                value={description}
                maxLength={500}
              />
              {description.length <= 30 && (
                <label
                  className={`custom-input-label`}
                  style={{ color: "red" }}
                >
                  Please enter minimum 30 characters in description.
                </label>
              )}
              <p className="text-areabox-para">{description.length} of 500</p>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <InputField
                type="string"
                label={"Email (max 300 length)"}
                variant={"outlined"}
                id={"Email"}
                fullWidth={true}
                name="email"
                value={email}
                fullWidth={true}
                onChange={this.handleInputs}
                maxLength={300}
              />
              {isEmailFormatValid && (
                <label
                  className={`custom-input-label`}
                  style={{ color: "red" }}
                >
                  Email Format is not valid
                </label>
              )}
            </Grid>
          </div>
          <div className="privacy-content-form-btn-parent">
            <Button
              onClick={this.handleSubmitFeedbackForm}
              className="privacy-content-form-btn"
              style={{ height: 45 }}
            >
              {" "}
              {sendFeedbackLoader ? (
                <ReactLoading
                  type={"spin"}
                  color={"#fff"}
                  height={"40px"}
                  width={"25px"}
                />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    ProductReducer: {
      products,
      getProductsLoader,
      getProductsError,
      searchedProducts,
      searchLoader,
      searchError,
      searchedQuery,
      sentFeedback,
      sendFeedbackLoader,
      sendFeedbackError
    },
    authReducer: { user, isLoggedIn }
  } = state;
  return {
    products,
    getProductsLoader,
    getProductsError,
    searchedProducts,
    searchLoader,
    searchError,
    searchedQuery,
    user,
    isLoggedIn,
    sentFeedback,
    sendFeedbackLoader,
    sendFeedbackError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProductsAction: () => dispatch(ProductAction.getProducts()),
    isLoggedInAction: () => dispatch(authAction.isLoggedIn()),
    sentFeedbackAction: payload => dispatch(ProductAction.sendFeedback(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles({})(Feedback));
