import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TimeAgo from "timeago-react";
import { RemoveRedEye } from '@material-ui/icons'

const styles = theme => ({
    card: {
        display: 'flex',
        margin: 20,
        [theme.breakpoints.down('sm')]: {
            margin: 10,
        },
        cursor: "pointer",
        boxShadow: "none",
        border: "1px solid #ccc"
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
        padding: 0,
        paddingLeft: 10
    },
    cover: {
        width: 120,
        maxWidth: 120,
        minWidth: 120,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

function ProductCard(props) {
    const { classes, product, handleClick } = props;
    console.log(product)
    return (
        <Card className={classes.card} onClick={() => handleClick(product)}>
            <CardMedia
                className={classes.cover}
                image={product.product_img}
                title={product.title}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6" title={product.description}>
                        {product.description && product.description.length >= 30 ? product.description.split('').splice(0, 30).join('') + "..." : product.description}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {/* <RemoveRedEye />  */}
                        Actions: {product._action}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        <TimeAgo datetime={product.created_date} />
                    </Typography>
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