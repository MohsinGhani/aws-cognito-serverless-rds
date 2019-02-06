'use strict';

const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  postSignUp,
  updateUser,
  getUsers,
  getUserById,
  addProduct,
  updateProduct
} = require('./controller/index')

module.exports.getCategory = (event, context, callback) => {
  getCategory(event, context, callback);
};

module.exports.createCategory = (event, context, callback) => {
  createCategory(event, context, callback);
};

module.exports.updateCategory = (event, context, callback) => {
  updateCategory(event, context, callback);
};

module.exports.deleteCategory = (event, context, callback) => {
  deleteCategory(event, context, callback);
};

// User API's section start
module.exports.postSignUp = (event, context, callback) => {
  postSignUp(event, context, callback);
};

module.exports.updateUser = (event, context, callback) => {
  updateUser(event, context, callback);
};

module.exports.getUsers = (event, context, callback) => {
  getUsers(event, context, callback);
};

module.exports.getUserById = (event, context, callback) => {
  getUserById(event, context, callback);
};

// Product API's section start
module.exports.addProduct = (event, context, callback) => {
  addProduct(event, context, callback);
};

module.exports.updateProduct = (event, context, callback) => {
  updateProduct(event, context, callback);
};
