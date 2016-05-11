var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;

// ����һ���򵥵�Node HTTP������,�ܴ���ǰĿ¼���ļ�
// ����ʵ�����������URL���ڲ���
// ��HTTP://localhost:8000��http://127.0.0.1:8000�������������

// ���ȼ���������Ҫ�õ���ģ��
var http = require('http');        // Http������API
var fs = require('fs');            // ���ڴ������ļ�
var server = new http.Server();    // �����µ�HTTP������
server.listen(8000);            // �����˿�8000

var querystring = require('querystring');
var util = require('util');
var captchapng = require('captchapng');

var index = 0;


var mongodb = require("mongodb");  
var mongoserver = new mongodb.Server("127.0.0.1", 27017, {});
var db_connector = new mongodb.Db('IMDB', mongoserver, {}); 
db_connector.open(function(err, db){ 
    //dosomething 
    console.log("dfasdf");
    db.close(); 
});



// ʹ��on����ע��ʱ�䴦��
server.on('request', function (request, response) { // ����request�����ʱ�򴥷�������
    console.log("1");


    var post = '';     //������һ��post�����������ݴ����������Ϣ

    request.on('data', function (chunk) {    //ͨ��req��data�¼�����������ÿ�����ܵ�����������ݣ����ۼӵ�post������
        post += chunk;
    });






    // ���������URL
    var url = require('url').parse(request.url);
    //console.log(request.url);

    //����post��������
    request.on('end', function () {    //��end�¼�������ͨ��querystring.parse��post����Ϊ������POST�����ʽ��Ȼ����ͻ��˷��ء�
        //var param=null;
        //index++;
        //console.log(post);

        param = post && JSON.parse(post);
        if (param && url.pathname == "/json" && "data" in param) {
            //console.log(index);

            console.log(param["data"]);

        }


        //response.end(util.inspect(param));
    });

    // ����URL���÷������ڷ�����Ӧǰ�ȵȴ�
    switch (url.pathname) {
        case '/captcha.png'://�����֤��
            {
                var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha 
                p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha) 
                p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha) 

                var img = p.getBase64();
                var imgbase64 = new Buffer(img, 'base64');
                response.writeHead(200, {
                    'Content-Type': 'image/png'
                });
                response.end(imgbase64);
            }
        case '' || '/': // ģ�⻶ӭҳ,nodejs�Ǹ�Ч������ķ���,Ҳ����ͨ�������ļ�������
            fs.readFile('./index.html', function (err, content) {
                if (err) {
                    response.writeHead(404, { 'Content-Type': 'text/plain; charset="UTF-8"' });
                    response.write(err.message);
                    response.end();
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
                    response.write(content);
                    response.end();
                }
            });
            break;
        case '/test/delay':// �˴�����ģ�⻺������������
            // ʹ�ò�ѯ�ַ�������ȡ�ӳ�ʱ��,����2000����
            var delay = parseInt(url.query) || 2000;
            // ������Ӧ״̬��ͷ
            response.writeHead(200, { 'Content-type': 'text/plain; charset=UTF-8' });
            // ������ʼ��д��Ӧ����
            response.write('Sleeping for' + delay + ' milliseconds...');
            // ��֮����õ���һ�������������Ӧ
            setTimeout(function () {
                response.write('done.');
                response.end();
            }, delay);
            break;
        case '/test/mirror':// ���������test/mirror,��ԭ�ķ�����
            // ��Ӧ״̬��ͷ
            response.writeHead(200, { 'Content-type': 'text/plain; charset=UTF-8' });
            // ����������ݿ�ʼ��д��Ӧ����
            response.write(request.mothod + ' ' + request.url + ' HTTP/' + request.httpVersion + '\r\n');
            // ���е�����ͷ
            for (var h in request.headers) {
                response.write(h + ':' + request.headers[h] + '\r\n');
            }
            response.write('\r\n');// ʹ�ö���Ŀհ���������ͷ
            // ����Щ�¼�����������������Ӧ
            // ��������������ݿ����ʱ,����д����Ӧ��
            request.on('data', function (chunk) { response.write(chunk); });
            // ���������ʱ,��ӦҲ���
            request.on('end', function (chunk) { response.end(); });
            break;
        case '/json': // ģ��JSON���ݷ���
            // ��Ӧ״̬��ͷ
            response.writeHead(200, { 'Content-type': 'application/json; charset=UTF-8' });
            response.write(JSON.stringify({ test: 'success1' }));
            //console.log();
            response.end();
            break;
        default:// �������Ա���Ŀ¼���ļ�
            var filename = url.pathname.substring(1);    // ȥ��ǰ��'/'
            var type = getType(filename.substring(filename.lastIndexOf('.') + 1));
            // �첽��ȡ�ļ�,����������Ϊ����������ģ�鴫���ص�����
            // ����ȷʵ�ܴ���ļ�,ʹ����API fs.createReadStream()����
            fs.readFile(filename, function (err, content) {
                if (err) {
                    response.writeHead(404, { 'Content-Type': 'text/plain; charset="UTF-8"' });
                    response.write(err.message);
                    response.end();
                } else {
                    response.writeHead(200, { 'Content-Type': type });
                    response.write(content);
                    response.end();
                }
            });
            break;
    }

});
function getType(endTag) {
    var type = null;
    switch (endTag) {
        case 'html':
        case 'htm':
            type = 'text/html; charset=UTF-8';
            break;
        case 'js':
            type = 'application/javascript; charset="UTF-8"';
            break;
        case 'css':
            type = 'text/css; charset="UTF-8"';
            break;
        case 'txt':
            type = 'text/plain; charset="UTF-8"';
            break;
        case 'manifest':
            type = 'text/cache-manifest; charset="UTF-8"';
            break;
        default:
            type = 'application/octet-stream';
            break;
    }
    return type;
}






