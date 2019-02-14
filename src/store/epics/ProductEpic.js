import {
    GET_CATEGORIES,
    SAVE_PRODUCT
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

    static saveProduct = (action$) =>
        action$.ofType(SAVE_PRODUCT)
            .switchMap(({ payload }) => {
                return HttpService.post(path.SAVE_PRODUCT, payload)
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                ProductAction.saveProductSuccess(response.data)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(ProductAction.saveProductFailure({ error: err.message }))
                    })
            })
}