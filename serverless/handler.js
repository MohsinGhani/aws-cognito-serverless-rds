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
  actionOnComment,
  bookmarkProduct,
  getBookmarkProducts,
  bookmarkProductRemove
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

module.exports.postConfirmation = (event, context, callback) => {
  postConfirmation(event, context, callback);
};

module.exports.updateUser = (event, context, callback) => {
  updateUser(event, context, callback);
};

module.exports.updateProfileImage = (event, context, callback) => {
  updateProfileImage(event, context, callback);
};

module.exports.getUsers = (event, context, callback) => {
  getUsers(event, context, callback);
};

module.exports.getUserById = (event, context, callback) => {
  getUserById(event, context, callback);
};

module.exports.postSocialAuth = (event, context, callback) => {
  postSocialAuth(event, context, callback);
};

// Product API's section start
module.exports.addProduct = (event, context, callback) => {
  addProduct(event, context, callback);
};

module.exports.updateProduct = (event, context, callback) => {
  updateProduct(event, context, callback);
};

module.exports.getProducts = (event, context, callback) => {
  getProducts(event, context, callback);
};

module.exports.getProductById = (event, context, callback) => {
  getProductById(event, context, callback);
};

// Like or dislike product section start
module.exports.likeProduct = (event, context, callback) => {
  likeProduct(event, context, callback);
};

// comment on product section start
module.exports.doComment = (event, context, callback) => {
  doComment(event, context, callback);
};

module.exports.updateComment = (event, context, callback) => {
  updateComment(event, context, callback);
};

module.exports.uploadFile = (event, context, callback) => {
  uploadFile(event, context, callback);
};

module.exports.search = (event, context, callback) => {
  search(event, context, callback);
};

module.exports.sendFeedback = (event, context, callback) => {
  sendFeedback(event, context, callback);
};

module.exports.actionOnComment = (event, context, callback) => {
  actionOnComment(event, context, callback);
};

// bookmark product section start
module.exports.bookmarkProduct = (event, context, callback) => {
  bookmarkProduct(event, context, callback);
};

module.exports.getBookmarkProducts = (event, context, callback) => {
  getBookmarkProducts(event, context, callback);
};

module.exports.bookmarkProductRemove = (event, context, callback) => {
  bookmarkProductRemove(event, context, callback);
};