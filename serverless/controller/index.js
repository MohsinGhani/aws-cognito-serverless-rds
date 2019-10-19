const { getCategory } = require('./getCategory')
const { createCategory } = require('./createCategory')
const { updateCategory } = require('./updateCategory')
const { deleteCategory } = require('./deleteCategory')
const { postSignUp } = require('./postSignUp')
const { updateUser } = require('./updateUser')
const { getUsers } = require('./getUsers')
const { getUserById } = require('./getUserById')
const { addProduct } = require('./addProduct')
const { updateProduct } = require('./updateProduct')
const { getProducts } = require('./getProducts')
const { getProductById } = require('./getProductById')
const { likeProduct } = require('./likeProduct')
const { doComment } = require('./doComment')
const { updateComment } = require('./updateComment')
const { postConfirmation } = require('./postConfirmation')
const { uploadFile } = require('./uploadFile')
const { search } = require('./search')
const { postSocialAuth } = require('./postSocialAuth')
const { updateProfileImage } = require('./updateProfileImage')
const { sendFeedback } = require('./sendFeedback')
const { actionOnComment } = require('./actionOnComment')

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    postSignUp,
    updateUser,
    getUsers,
    getUserById,
    addProduct,
    updateProduct,
    getProducts,
    getProductById,
    likeProduct,
    doComment,
    updateComment,
    postConfirmation,
    uploadFile,
    search,
    postSocialAuth,
    updateProfileImage,
    sendFeedback,
    actionOnComment
}