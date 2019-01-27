import { combineEpics } from 'redux-observable';
import movieEpic from './movieEpic'

const rootEpic = combineEpics(
    movieEpic.getMovies,
    movieEpic.getFeatureMovies,
    movieEpic.searchMovies,
);

export default rootEpic;