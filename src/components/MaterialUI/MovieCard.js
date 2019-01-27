import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        margin: '0 auto',
        marginTop: '15px',
        height: '280px',
        width: '97%'
    },
    media: {
        objectFit: 'cover',
    },
    title: {
        fontSize: '13px',
        fontWeight: 'bold',
        color: '#333'
    },
    desc: {
        fontSize: '11px'
    }
};

class MovieCard extends React.Component {
    render() {
        const { classes, movie, showMovieDetail } = this.props;
        return (
            <Card className={classes.card} onClick={() => showMovieDetail(movie)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        className={classes.media}
                        height="140"
                        image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                            {movie.title}
                        </Typography>
                        <Typography className={classes.desc} component="p">
                            {movie.overview.split('').splice(0, 250).join('')}...
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        )
    }
}


MovieCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MovieCard);