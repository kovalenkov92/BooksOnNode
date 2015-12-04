var parse  = require('co-body');
var render = require('../lib/views');
var books  = require('../models/books');

exports.list = function *() {
  var results = yield books.find({});
  this.body = yield render('index', {books: results});
};

exports.add = function *() {
  this.body = yield render('new');
};

exports.edit = function *(id) {
  var result = yield books.findById(id);
  if (!result) {
    this.throw(404, 'invalid book id');
  }
  this.body = yield render('edit', {book: result});
};

exports.show = function *(id) {
  var result = yield books.findById(id);
  if (!result) {
    this.throw(404, 'invalid book id');
  }
  this.body = yield render('show', {book: result});
};

exports.remove = function *(id) {
  yield books.remove({"_id": id});
  this.redirect('/');
};

exports.create = function *() {
  var input = yield parse(this);
  var d = new Date();
  yield books.insert({
    title: input.title,
    author: input.author,
    isbn: input.isbn,
    year: input.year,
    description: input.description,
    created_on: d,
    updated_on: d
  });
  this.redirect('/');
};

exports.update = function *() {
  var input = yield parse(this);
  yield books.updateById(input.id, {
    title: input.title,
    author: input.author,
    isbn: input.isbn,
    year: input.year,
    description: input.description,
    created_on: new Date(input.created_on),
    updated_on: new Date()});
  this.redirect('/');
};
