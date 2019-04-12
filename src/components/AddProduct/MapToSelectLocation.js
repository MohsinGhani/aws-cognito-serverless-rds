import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TopNav from './../common/TopNav'
import { connect } from 'react-redux';
import { ProductAction, authAction } from './../../store/actions'
import "./index.css";
import Button from '@material-ui/core/Button';
import ReactMapboxGl from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";
import credentials from '../../config/credentials'
import Location from './../common/Location'
// import green from '@material-ui/core/colors/green';
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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.reversedGeoCoding !== this.props.reversedGeoCoding && this.props.reversedGeoCoding) {
            this.props.selectedLocation(this.props.reversedGeoCoding)
        }
    }

    goto = path => this.props.history.push(path)

    setLocation = (event) => {
        this.setState({longitude: event.lngLat.lng, latitude: event.lngLat.lat, zoom: [event.point.x, event.point.y]})
        this.props.reverseGeoCodingAction(event.lngLat)
    }

    render() {
        let { handleClose, open, position, location } = this.props;
        let { address, latitude, longitude } = this.state;
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
                        <Typography variant="h6" color="inherit" className={classes.flex} style={{fontSize: "12px"}}>
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
                            height: "100vh",
                            width: "100%",
                        }}
                        movingMethod={'jumpTo'}
                        center={[longitude ? longitude : position.lng, latitude ? latitude : position.lat]}
                        zoom={this.state.zoom ? this.state.zoom : [position.zoom]}
                        onClick={(map, e) => this.setLocation(e) }
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
