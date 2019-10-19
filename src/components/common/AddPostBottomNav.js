import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import TextModal from "./../common/TextModal";
import "./index.css";

const styles = () => ({
  root: {
    position: "fixed",
    left: "0",
    zIndex: 1001,
    bottom: "0",
    width: "100%",
    height: "auto",
    paddingTop: "10px",
    paddingBottom: "10px"
  },
  margin: {
    backgroundColor: "#9e7339",
    color: "white"
  }
});

class AddPostBottomNav extends React.Component {
  state = {
    openTextModal: false
  };

  handleAddPostClick = () => {
    const { user } = this.props;
    if (user) {
      this.props.history.push("/add-product");
    } else {
      this.setState({ openTextModal: true });
    }
  };
  closeTextModal = () => {
    this.setState({ openTextModal: false });
  };

  render() {
    const { classes } = this.props;
    const { openTextModal } = this.state;
    return (
      <div className={`${classes.root} product-modal-footer`}>
        <div>
          <Fab
            aria-label="Add"
            className={classes.margin}
            id="add-product-fabbtn"
            onClick={this.handleAddPostClick}
          >
            <AddIcon />
          </Fab>
        </div>
        <TextModal
          open={openTextModal}
          handleClose={this.closeTextModal}
          title={"Login Required!"}
          text={"You must login to perform this action"}
          isTimer={true}
          btnAction={() => {
            this.props.history.push("/signin");
          }}
          btnTitle={"Login"}
          strickedAction={() => {
            this.props.history.push("/signin");
          }}
        />
      </div>
    );
  }
}
AddPostBottomNav.propTypes = {
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  const {
    authReducer: { user }
  } = state;
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddPostBottomNav));
