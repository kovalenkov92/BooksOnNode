var request    = require('superagent');
var expect     = require('expect');


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

  it('should consist books on GET /',function (done) {
    request.post(url+'/books/create')
      .send({title:"test book",author:"test author",isbn:"1234567890",year:"2015",description:"test description"})
      .end()
    request.get(url)
      .end(function (err,res) {
        expect(res.text).toInclude('test book');
        done()
      })
  });

})
