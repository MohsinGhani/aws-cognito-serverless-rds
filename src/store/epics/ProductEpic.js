import {
    GET_CATEGORIES
} from './../constants'
import { Observable } from 'rxjs/Rx';
import { ProductAction } from './../actions/index'
import { HttpService } from '../../services/http';
import path from './../../config/path'

export default class ProductEpic {
    static getCategories = (action$) =>
        action$.ofType(GET_CATEGORIES)
            .switchMap(({ payload }) => {
                return HttpService.get(path.GET_CATEGORIES)
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                ProductAction.getCategoriesSuccess(response.data)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(ProductAction.getCategoriesFailure({ error: err.message }))
                    })
            })
}