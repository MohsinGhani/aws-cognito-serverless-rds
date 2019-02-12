import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./index.css";
import Category from './Category'
import TopNav from './../common/TopNav'

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
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
    this.state = {
      categories: [
        { img: require('./../../assets/img/c1.png'), id: '1', title: 'Category 1' },
        { img: require('./../../assets/img/c2.jpg'), id: '2', title: 'Category 2' },
        { img: require('./../../assets/img/c3.jpg'), id: '3', title: 'Category 3' },
        { img: require('./../../assets/img/c4.jpg'), id: '4', title: 'Category 4' },
        { img: require('./../../assets/img/c5.jpg'), id: '5', title: 'Category 5' },
        { img: require('./../../assets/img/c6.jpg'), id: '6', title: 'Category 6' },
        { img: require('./../../assets/img/c7.jpg'), id: '7', title: 'Category 7' },
        { img: require('./../../assets/img/c8.jpg'), id: '8', title: 'Category 8' },
        { img: require('./../../assets/img/c9.jpg'), id: '9', title: 'Category 9' },
        { img: require('./../../assets/img/c10.jpg'), id: '10', title: 'Category 10' },
        { img: require('./../../assets/img/c11.jpg'), id: '11', title: 'Category 11' },
        { img: require('./../../assets/img/c12.jpg'), id: '12', title: 'Category 12' },
        { img: require('./../../assets/img/c13.jpg'), id: '13', title: 'Category 13' },
        { img: require('./../../assets/img/c14.jpg'), id: '14', title: 'Category 14' },
        { img: require('./../../assets/img/c15.jpg'), id: '15', title: 'Category 15' },
      ]
    }
  }

  render() {
    let { classes, open, handleClose } = this.props;
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
                this.state.categories.map((category, index) => {
                  return (
                    <Grid key={index} className={'p5'} item xs={6} md={2} sm={4}>
                      <Category title={category.title} img={category.img} />
                    </Grid>
                  )
                })
              }
            </Grid>
          </div>
        </Dialog>
      </div >
    );
  }
}

export default withStyles(styles)(SelectCategory);
