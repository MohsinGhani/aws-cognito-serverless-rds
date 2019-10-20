import React, { Component } from 'react';
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import TopNav from './../common/TopNav'
import { connect } from "react-redux";
import { ProductAction } from "../../store/actions";
import ProductDetailModal from "./../Products/ProductDetailModal";
import AddPostBottomNav from "./../common/AddPostBottomNav";
import ReactLoading from "react-loading";
import ProductCard from "./../common/productCard";
import TextError from "./../common/TextError";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export class SearchModal extends Component {
    state = {
        product: null,
        open: false,
        isOpenDetailDialog: false
    }

    componentDidMount() {
        if (this.props.searchedQuery) {
            this.handleModal(true)
        }
    }

    handleModal = (action) => {
        this.setState({ open: action })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchedQuery && !this.props.searchedQuery) {
            this.handleModal(false)
        }

        if (this.props.searchedQuery && !this.state.open) {
            const { history } = this.props
            if ((history && history.location) && history.location.pathname !== "/my-product") {
                this.handleModal(true)
            }
        }
    }

    handleDetailDialog = (action) => {
        this.setState({ open: action })
    }

    render() {
        let {
            products,
            searchedQuery,
            getProductsLoader,
            searchedProducts,
            searchLoader,
            user,
            history
        } = this.props;
        const { open, product, isOpenDetailDialog } = this.state
        return (
            <Dialog
                fullScreen
                open={open}
                onClose={() => this.handleDetailDialog(false)}
                TransitionComponent={Transition}
                className={"dialog"}
            >
                <TopNav />

                <ProductDetailModal
                    history={history}
                    product_id={product ? product.product_id : null}
                    open={isOpenDetailDialog}
                    handleDetailDialog={action =>
                        this.setState({ isOpenDetailDialog: action })
                    }
                    identifier={"not"}
                />
                <AddPostBottomNav history={history} />


                <div className="product-card-container">
                    {!getProductsLoader &&
                        !searchLoader &&
                        !searchedQuery &&
                        products &&
                        products.map((product, i) => {
                            return (
                                <ProductCard
                                    key={i}
                                    product={product}
                                    handleClick={product =>
                                        this.setState({ product, isOpenDetailDialog: true })
                                    }
                                />
                            );
                        })}

                    {!getProductsLoader &&
                        !searchLoader &&
                        searchedProducts &&
                        searchedProducts.map((product, i) => {
                            return (
                                <ProductCard
                                    key={i}
                                    product={product}
                                    handleClick={product =>
                                        this.setState({ product, isOpenDetailDialog: true })
                                    }
                                />
                            );
                        })}

                    {searchedQuery && !searchedProducts && !searchLoader ? (
                        <TextError
                            text={"No Product Found. Please search for different keywords."}
                        />
                    ) : (
                            ""
                        )}

                    {(getProductsLoader || searchLoader) && (
                        <div style={{ width: "50px", margin: "50px auto" }}>
                            <ReactLoading
                                type={"spin"}
                                color={"#9e7339"}
                                height={"50px"}
                                width={"50px"}
                            />
                        </div>
                    )}
                </div>
            </Dialog>
        );
    }
}

const mapStateToProps = state => {
    const {
        ProductReducer: {
            products,
            getProductsLoader,
            getProductsError,
            searchedQuery,
            searchedProducts,
            searchLoader,
            searchError
        }
    } = state;
    return {
        products,
        getProductsLoader,
        getProductsError,
        searchedQuery,
        searchedProducts,
        searchLoader,
        searchError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProductsAction: () => dispatch(ProductAction.getProducts())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchModal);
