import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TimeAgo from "timeago-react";

const styles = theme => ({
    card: {
        display: 'flex',
        margin: 20,
        [theme.breakpoints.down('sm')]: {
            margin: 10,
        },
        cursor: "pointer",
        boxShadow: "none",
        background: '#f8f3ec',
        padding: 8
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    content: {
        flex: '1 0 auto',
        padding: 0,
        paddingLeft: 10
    },
});

const makeDateFormat = (time) => {
    return (
        new Date(time).getUTCFullYear() + "-" + new Date(time).getUTCMonth()+1 + "-" + new Date(time).getUTCDate() + "T" + new Date(time).getHours() + ":" + new Date(time).getUTCMinutes() + ":" + new Date(time).getUTCSeconds() + "." + new Date(time).getUTCMilliseconds() + "Z"
    )
}

function ProductCard(props) {
    const { classes, product, handleClick } = props;
    console.log(product.created_date, '2019-10-01 06:16:26.192108')
    return (
        <Card className={classes.card} onClick={() => handleClick(product)}>
            <div className="product-card-image-wrapper">
                <img alt={product.title} title={product.title} src={product.product_img} className="product-card-image" />
            </div>
            <div className={classes.details}>
                <CardContent className={classes.content + " product-card-bottom-wrapper"}>
                    <Typography component="h6" variant="h6" title={product.description} className={'product-card-title'}>
                        {product.description}
                    </Typography>

                    <div className="product-card-bottom-section">
                        <Typography variant="subtitle1">
                            <TimeAgo style={{ color: '#5e4422', fontWeigth: 'bold' }} datetime={product.created_date} />
                        </Typography>
                        <img src={require("./../../assets/img/more.svg")} className="product-card-more-image-icon" />
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

ProductCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ProductCard);