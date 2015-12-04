var http     = require('http');
var koa      = require('koa');
var logger   = require('koa-logger');
var route    = require('koa-route');
var routes   = require('./routes');
var serve    = require('koa-static');

var app = koa();

app.use(logger());
app.use(serve('./public'));

app.use(route.get('/', routes.list));
app.use(route.get('/books/new', routes.add));
app.use(route.get('/books/:id', routes.show));
app.use(route.get('/books/delete/:id', routes.remove));
app.use(route.get('/books/edit/:id', routes.edit));
app.use(route.post('/books/create', routes.create));
app.use(route.post('/books/update', routes.update));

http.createServer(app.callback()).listen(3000);
console.log('Server listening on port 3000');
