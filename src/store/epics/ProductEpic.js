import {
    GET_CATEGORIES,
    SAVE_PRODUCT,
    GET_PRODUCTS,
    GET_PRODUCT_BY_ID,
    LIKE_DISLIKE_PRODUCT,
    DO_COMMENT_ON_PRODUCT,
    REVERSE_GEOCODING,
    SEARCH
} from './../constants'
import { Observable } from 'rxjs/Rx';
import { ProductAction } from './../actions/index'
import { HttpService } from '../../services/http';
import path from './../../config/path'
import credentials from './../../config/credentials'

export default class ProductEpic {

    static reverseGeoCoding = (action$) =>
        action$.ofType(REVERSE_GEOCODING)
            .switchMap(({ payload }) => {
                return HttpService.get(`${path.REVERSE_GEOCODING}/${payload.lng},${payload.lat}.json?access_token=${credentials.MAP_ACCESS_TOCKEN}`, payload)
                    .switchMap((response) => {
                        if (response.status === 200) {
                            // console.log(response['response'].features)
                            return Observable.of(
                                ProductAction.reverseGeoCodingSuccess(response['response'].features)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(ProductAction.likeProductFailure({ error: err.message }))
                    })
            })

    static likeProduct = (action$) =>
        action$.ofType(LIKE_DISLIKE_PRODUCT)
            .switchMap(({ payload }) => {
                return HttpService.post(path.LIKE_OR_DISLIKE, payload)
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                ProductAction.likeProductSuccess(response.data),
                                ProductAction.getProductById({ product_id: response.data.product_id }),
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(ProductAction.likeProductFailure({ error: err.message }))
                    })
            })

    static search = (action$) =>
        action$.ofType(SEARCH)
            .switchMap(({ payload }) => {
                return HttpService.get(`${path.SEARCH}/${payload.query}`)
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                ProductAction.searchSuccess(response.data)
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(ProductAction.searchFailure({ error: err.message }))
                    })
            })

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

    static doCommentOnProduct = (action$) =>
        action$.ofType(DO_COMMENT_ON_PRODUCT)
            .switchMap(({ payload }) => {
                return HttpService.post(path.DO_COMMENT_ON_PRODUCT, payload)
                    .switchMap(({ response }) => {
                        if (response.status === 200) {
                            return Observable.of(
                                ProductAction.doCommentOnProductSuccess(response.data),
                                ProductAction.getProductById({ product_id: payload.product_id }),
                            )
                        }
                    }).catch((err) => {
                        return Observable.of(ProductAction.doCommentOnProductFailure({ error: err.message }))
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