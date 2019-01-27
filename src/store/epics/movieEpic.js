import { GET_MOVIES, GET_FEATURE_MOVIES, SEARCH_MOVIES } from './../constants'
import { Observable } from 'rxjs/Rx';
import { movieAction } from './../actions/index'
import { HttpService } from '../../services/http';

export default class movieEpic {
    static getMovies = (action$) =>
        action$.ofType(GET_MOVIES)
            .switchMap(({ payload }) => {
                return HttpService.get(`https://api.themoviedb.org/4/list/${payload.page ? payload.page : 1}?page=1&api_key=076a53fa7bc6b10b9acb699197c2c70f&sort_by=title.asc`)
                    .switchMap((response) => {
                        if (response.status === 200) {
                            return Observable.of(
                                movieAction.getMoviesSuccess(response.response.results)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(movieAction.getMoviesFailure(`Error in Getting Movies!`))
                    })
            })

    static getFeatureMovies = (action$) =>
        action$.ofType(GET_FEATURE_MOVIES)
            .switchMap(({ payload }) => {
                return HttpService.get(`https://api.themoviedb.org/3/movie/${payload.feature}?api_key=076a53fa7bc6b10b9acb699197c2c70f&language=en-US&page=${payload.page ? payload.page : 1}`)
                    .switchMap((response) => {
                        if (response.status === 200) {
                            return Observable.of(
                                movieAction.getFeatureMoviesSuccess(response.response.results)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(movieAction.getFeatureMoviesFailure(`Error in Getting Movies!`))
                    })
            })

    static searchMovies = (action$) =>
        action$.ofType(SEARCH_MOVIES)
            .switchMap(({ payload }) => {
                return HttpService.get(`https://api.themoviedb.org/3/search/movie?api_key=076a53fa7bc6b10b9acb699197c2c70f&language=en-US&query=${payload.query}&page=1&include_adult=false`)
                    .switchMap((response) => {
                        if (response.status === 200) {
                            return Observable.of(
                                movieAction.searchMoviesSuccess(response.response.results)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(movieAction.searchMoviesFailure(`Error in Getting Movies! ${err}`))
                    })
            })
}