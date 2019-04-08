import React from 'react';
import { geolocated } from 'react-geolocated';

class Location extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.coords !== this.props.coords && this.props.coords.latitude && this.props.coords.longitude) {
      this.props.handleLocation(this.props.coords.latitude, this.props.coords.longitude)
    }

    if (prevProps.isGeolocationEnabled !== this.props.isGeolocationEnabled) {
      this.props.temp && this.props.temp(this.props.isGeolocationEnabled)
    }
  }



  componentDidMount() {
    this.props.temp && this.props.temp(this.props.isGeolocationEnabled)
  }
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div style={{ textAlign: 'center', color: 'red' }}>Geolocation is not enabled</div>
        : this.props.coords
          ? <span></span>
          : <div>Getting the location data&hellip; </div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Location);