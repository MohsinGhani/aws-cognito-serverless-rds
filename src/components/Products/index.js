import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { InputField, AutoSelectInputField } from "./../MaterialUI";
import Button from "@material-ui/core/Button";
import TopNav from './../common/TopNav'
import Location from './../common/Location'
import SelectCategory from './../SelectCategory'
import Icon from '@material-ui/core/Icon';
import { Address } from "./../../services/address"
import uuidv1 from 'uuid/v1'
import { connect } from 'react-redux';
import { ProductAction } from './../../store/actions'
import "./index.css";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: '10px 0 0 0',
  }
});

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    this.props.getProductsAction()
  }

  render() {
    let { classes } = this.props;
    let { } = this.state;
    return (
      <div>
        <TopNav />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    ProductReducer: {
      categories, getCategoriesLoader, getCategoriesError,
      savedProduct, saveProductLoader, saveProductError,
    },
    authReducer: { user }
  } = state;
  return {
    categories, getCategoriesLoader, getCategoriesError,
    savedProduct, saveProductLoader, saveProductError,
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsAction: () => dispatch(ProductAction.getProducts())
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(Products));
