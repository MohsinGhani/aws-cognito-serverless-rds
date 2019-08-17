import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import { ProductAction } from './../../store/actions'
import "./index.css";
import Button from '@material-ui/core/Button';
import ReactMapboxGl from "react-mapbox-gl";
import credentials from '../../config/credentials'
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const Map = ReactMapboxGl({
    accessToken: credentials.MAP_ACCESS_TOCKEN
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    margin: {
        margin: '5px 0 0 0',
        backgroundColor: '#946638	',
        color: 'white',
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '15px'
    },
    signinBtn: {
        margin: '5px',
        backgroundColor: '#946638	',
        color: 'white',
        width: '38vh',
        justifyContent: 'inherit',
    },
    appBar: {
        position: 'relative',
        backgroundColor: '#9e7339'
    },
    flex: {
        flex: 1,
    },
});

class MapToSelectLocation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            address: null,
            latitude: null,
            longitude: null,
            zoom: null
        }
    }

    goto = path => this.props.history.push(path)

    setLocation = (event) => {
        this.setState({ zoom: [event.point.x, event.point.y] })
        this.props.reverseGeoCodingAction(event.lngLat)
    }

    render() {
        let { handleClose, open, position, location } = this.props;
        const { classes } = this.props;

        return (

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
                            Pick Location
                        </Typography>
                        <Typography variant="h6" color="inherit" className={classes.flex} style={{ fontSize: "12px" }}>
                            {location}
                        </Typography>
                        <Button color="inherit" onClick={handleClose}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>
                <div>
                    <Map
                        style="mapbox://styles/mapbox/streets-v9"
                        containerStyle={{
                            height: "89vh",
                            width: "100%",

                        }}
                        movingMethod={'jumpTo'}
                        center={[position.lng, position.lat]}
                        zoom={[12]}
                        onClick={(map, e) => this.setLocation(e)}
                    >

                    </Map>
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        ProductReducer: {
            reversedGeoCoding, reverseGeoCodingLoader, reverseGeoCodingError
        },
        authReducer: { user, isLoggedIn }
    } = state;
    return {
        reversedGeoCoding, reverseGeoCodingLoader, reverseGeoCodingError,
        user, isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reverseGeoCodingAction: (payload) => dispatch(ProductAction.reverseGeoCoding(payload)),
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(withStyles(styles)(MapToSelectLocation));
console.clear();