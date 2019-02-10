import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <div>
                        <div className="container">
                            <Component {...props} />
                        </div>
                        <Footer />
                    </div>
                ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.userAuth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
