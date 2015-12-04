var request    = require('superagent');
var expect     = require('expect');
var books      = require('../models/books');


describe('testing routes',function () {
  var url = 'http://localhost:3000';

  it('should respond with 200 on GET /',function (done) {
    request.get(url)
      .end(function (err, res) {
        expect(res.statusCode).toEqual(200);
        done();
      })
  });

  it('should respond whit 404 on unexisting GET /blabla',function (done) {
    request.get(url+'/blabla')
      .end(function (err,res) {
        expect(res.statusCode).toEqual(404);
        done();
      })
  });

  it('should return list of existing books on GET /',function (done) {
    request.get(url)
      .end(function (err,res) {
        expect(res.text).toInclude('Bookshelf');
        expect(res.status).toEqual(200);
        done()
      })
  });

  it('should open new book view on /books/new GET request', function (done) {
    request.get(url+'/books/new')
      .end(function (err,res) {
        expect(res.req.path).toBe('/books/new');
        expect(res.text).toInclude('<h1>Add Book</h1>');
        done();
      })
  });

  it('should create record in database on POST /books/create', function (done) {
    request.post(url+'/books/create')
      .send({title:"test book",author:"test author",isbn:"1234567890",year:"2015",description:"test description"})
      .end(function (err,res) {
        expect(res.status).toEqual(200);
        expect(res.text).toInclude('<strong>test book</strong>');
        done()
      })
  });

  it('should open book detail page on GET /books/:id request', function (done) {
    books.find({title:'test book'}, function(err,docs) {
      var id = docs[0]._id;
      request.get(url+'/books/'+id)
        .end(function (err,res) {
          expect(res.statusCode).toEqual(200);
          expect(res.text).toInclude('<h1>test book</h1>')
          done();
        })
    });
  });

  it('should update record in database on POST /books/update request',function (done) {
    books.find({title:'test book'}, function(err,docs) {
      var id = docs[0]._id;
      request.post(url+'/books/update')
        .send({id:id,title:"updated test book",author:"updated test author",isbn:"1234567890",year:"2015",description:"test description"})
        .end(function (err,res) {
          expect(res.status).toEqual(200);
          expect(res.text).toInclude('<strong>updated test book</strong>');
          done();
        })
    });
  })

  it('should delete book on GET /books/delete/:id',function (done) {
    books.find({title:'updated test book'}, function (err, docs) {
      var id = docs[0]._id;
      request.get(url+'/books/delete/'+id)
        .end(function (err,res) {
          expect(res.statusCode).toEqual(200);
          expect(res.text).toExclude('<strong>updated test book</strong>');
          expect(res.req.path).toBe('/');
          done();
        })
    })
  });


})
