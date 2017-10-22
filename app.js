var express = require('express'),
http = require('http'), 
session = require('express-session'),
app = express(),
port = process.env.PORT || 80,
routes = require('./routes'),
bodyParser = require('body-parser'),
server = /*https*/http.createServer(/*options,*/ app),
code = require('./codes'),
io = require('socket.io')(server);

//app.use(siofu.router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use('/modules', express.static(__dirname + '/node_modules/'));
app.use(session({ secret: 'hakunamatata motherfucker! 42', saveUninitialized: true, resave: false }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', routes.gauge);
app.get('/post', routes.post);
app.get('/api', routes.api);
app.get('/acao', routes.acao);
app.get('/orgao', routes.orgao);
app.get('/recurso', routes.recurso);
app.get('/fonte', routes.fonte);
app.get('*', function(req, res){res.send('Nothing here.');});

io.of('/post').on('connection', code.post);
io.of('/api').on('connection', code.api);
io.of('/acao').on('connection', code.acao);
io.of('/orgao').on('connection', code.orgao);
io.of('/recurso').on('connection', code.recurso);
io.of('/fonte').on('connection', code.fonte);

server.listen(port, function(){console.log("Server running at the port %d", port);});
