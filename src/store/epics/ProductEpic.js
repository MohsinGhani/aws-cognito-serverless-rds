import {
    GET_CATEGORIES,
    SAVE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID
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

    static getProducts = (action$) =>
        action$.ofType(GET_PRODUCTS)
            .switchMap(({ payload }) => {
                return HttpService.get(path.GET_PRODUCTS)
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                ProductAction.getProductsSuccess(response.data)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(ProductAction.getProductsFailure({ error: err.message }))
                    })
            })

    static getProductById = (action$) =>
        action$.ofType(GET_PRODUCT_BY_ID)
            .switchMap(({ payload }) => {
                return HttpService.get(`${path.GET_PRODUCT}/${payload.product_id}`)
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                ProductAction.getProductByIdSuccess(response.data)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(ProductAction.getProductByIdFailure({ error: err.message }))
                    })
            })
}