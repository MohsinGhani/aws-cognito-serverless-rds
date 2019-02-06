const { getCategory } = require('./getCategory')
const { createCategory } = require('./createCategory')
const { updateCategory } = require('./updateCategory')
const { deleteCategory } = require('./deleteCategory')
const { postSignUp } = require('./postSignUp')
const { updateUser } = require('./updateUser')
const { getUsers } = require('./getUsers')
const { getUserById } = require('./getUserById')
const { addProduct } = require('./addProduct')

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
}