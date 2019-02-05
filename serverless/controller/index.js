const { getCategory } = require('./getCategory')
const { createCategory } = require('./createCategory')
const { updateCategory } = require('./updateCategory')
const { deleteCategory } = require('./deleteCategory')
const { postSignUp } = require('./postSignUp')
const { updateUser } = require('./updateUser')

module.exports = {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    postSignUp,
    updateUser
}