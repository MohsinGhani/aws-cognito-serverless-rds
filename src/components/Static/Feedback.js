import React, { Component } from 'react';
import TopNav from '../../components/common/TopNav'
import { InputField, AutoSelectInputField } from "./../MaterialUI";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { ProductAction, authAction } from '../../store/actions'
import uuidv1 from "uuid/v1";
import ReactLoading from "react-loading";
import TextModal from './../common/TextModal'
import './index.css'


class Feedback extends Component {
  state = {
    email: "",
    description: "",
    isSaveButtonDisable: true,
    openTextModal: false,
    textModalTitle: '',
    textModalText: '',
  }
  handleInputs = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmitFeedbackForm = () => {
    const { sentFeedbackAction } = this.props;
    sentFeedbackAction({
      email: this.state.email,
      description: this.state.description,
      id: uuidv1()
    })
    this.setState({ description: "", email: "" })
  }
  validateEmail = () => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.email)
  }
  validateSaveButton = () => {
    const {
      description,
    } = this.state;
    return (
      (description && description.length >= 3) &&
      this.validateEmail()

    );
  };

  closeTextModal = () => {
    this.setState({ openTextModal: false })
    // if (this.props.savedProduct) {
    //   this.setState({ isOpenDetailDialog: true })
    // }
  }


  componentDidUpdate(prevProps, prevState) {
    const { sentFeedback, sendFeedbackLoader, sendFeedbackError } = this.props

    // after saved product Error message if any error
    if (
      !sendFeedbackLoader && prevProps.sendFeedbackError !== sendFeedbackError) {
      this.setState({
        openTextModal: true,
        textModalTitle: "Error",
        textModalText: `${sendFeedbackError.error}`
      })
    }
    // after saved product Successfull message
    if (
      !sendFeedbackLoader && prevProps.sentFeedback !== sentFeedback) {
      this.setState({
        openTextModal: true,
        textModalTitle: "Successfull",
        textModalText: `${sentFeedback}`
      })
    }


    if (
      (prevState.description !== this.state.description && this.state.description === "") ||
      (prevState.email !== this.state.email && !this.validateEmail())
    ) {
      this.setState({ isSaveButtonDisable: true });
    }

    if (this.state && this.state.isSaveButtonDisable) {
      if (this.validateSaveButton())
        this.setState({ isSaveButtonDisable: false });
    }

  }

  render() {
    const { sendFeedbackLoader } = this.props
    const { isSaveButtonDisable, openTextModal, textModalTitle, textModalText, } = this.state

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
            <p>Please fill out the following form for feedback or customer support</p>
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
                value={this.state.description}
                maxLength={500}
              />
              <p className="text-areabox-para">0 of 500</p>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
              <InputField
                type="string"
                label={"Email (max 300 length)"}
                variant={"outlined"}
                id={"Email"}
                fullWidth={true}
                name="email"
                value={this.state.email}
                fullWidth={true}
                onChange={this.handleInputs}
              />
            </Grid>
          </div>
          <div className="privacy-content-form-btn-parent">
            <Button
              onClick={this.handleSubmitFeedbackForm}
              className="privacy-content-form-btn"
              style={{ opacity: isSaveButtonDisable ? 0.6 : 1, height: 45 }}
              disabled={isSaveButtonDisable}
            > {sendFeedbackLoader ? (
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
const mapStateToProps = (state) => {
  const {
    ProductReducer: {
      products, getProductsLoader, getProductsError,
      searchedProducts, searchLoader, searchError,
      searchedQuery, sentFeedback, sendFeedbackLoader, sendFeedbackError,
    },
    authReducer: { user, isLoggedIn, }
  } = state;
  return {
    products, getProductsLoader, getProductsError,
    searchedProducts, searchLoader, searchError,
    searchedQuery, user, isLoggedIn, sentFeedback, sendFeedbackLoader, sendFeedbackError
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