import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./index.css";
import Category from './Category'
import { connect } from 'react-redux';
import { ProductAction } from './../../store/actions'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SelectCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.getCategoriesAction()
  }

  render() {
    let { classes, open, handleClose, categories, getCategoriesLoader, getCategoriesError, selectCategory } = this.props;
    return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Select Category
              </Typography>
              <Button color="inherit" onClick={handleClose}>
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <div className="container">
            <br />
            <Grid container className={classes.root} spacing={16}>
              {
                !getCategoriesLoader && categories && categories.map((category, index) => {
                  return (
                    <Grid key={index} className={'p5'} item xs={6} md={2} sm={4}>
                      <Category category={category} selectCategory={selectCategory}/>
                    </Grid>
                  )
                })
              }
              {
                getCategoriesLoader ? '...loading' : ''
              }
              {
                !getCategoriesLoader && getCategoriesError ? <p>{getCategoriesError}</p> : ''
              }
            </Grid>
          </div>
        </Dialog>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  const { ProductReducer: { categories, getCategoriesLoader, getCategoriesError } } = state;
  return {
    categories, getCategoriesLoader, getCategoriesError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoriesAction: (payload) => dispatch(ProductAction.getCategories(payload))
  };
};

export default connect(
  mapStateToProps, mapDispatchToProps
)(withStyles(styles)(SelectCategory));
