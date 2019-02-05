'use strict';

const { getCategory, createCategory, updateCategory, deleteCategory } = require('./controller/index')

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

