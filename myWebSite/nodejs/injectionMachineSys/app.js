// 这是一个简单的Node HTTP服务器,能处理当前目录的文件
// 并能实现两种特殊的URL用于测试
// 用HTTP://localhost:8000或http://127.0.0.1:8000连接这个服务器

// 首先加载所有需要用到的模块
var http = require('http');        // Http服务器API
var fs = require('fs');            // 用于处理本地文件
var server = new http.Server();    // 创建新的HTTP服务器
server.listen(8000);            // 监听端口8000
var mongodb = require('mongodb');
var moment = require('moment');
var querystring = require('querystring');
var util = require('util');
var captchapng = require('captchapng');

var index = 0;



//使用on方法注册时间处理
server.on('request', function (request, response) { // 当有request请求的时候触发处理函数
    console.log("request");





    var post = '';     //定义了一个post变量，用于暂存请求体的信息

    request.on('data', function (chunk) {    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post += chunk;

    });


 


    // 解析请求的URL
    var url = require('url').parse(request.url);
   // console.log(request.url);

    //解析post请求数据
    request.on('end', function () {    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        var data = {
        };
        var tmpStr = decodeURIComponent(request.url).split("&");
        data = JSON.parse(tmpStr[1]);
        if (data && url.pathname == "/json") {
            getStatusFromMongoDB(response,data);

        }


        //response.end(util.inspect(param));
    });

    // 特殊URL会让服务器在发送响应前先等待
    switch (url.pathname) {
        case '/captcha.png'://输出验证码
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
        case '' || '/': // 模拟欢迎页,nodejs是高效流处理的方案,也可以通过配置文件来配置
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
        case '/test/delay':// 此处用于模拟缓慢的网络连接
            // 使用查询字符串来获取延迟时长,或者2000毫秒
            var delay = parseInt(url.query) || 2000;
            // 设置响应状态和头
            response.writeHead(200, { 'Content-type': 'text/plain; charset=UTF-8' });
            // 立即开始编写响应主体
            response.write('Sleeping for' + delay + ' milliseconds...');
            // 在之后调用的另一个函数中完成响应
            setTimeout(function () {
                response.write('done.');
                response.end();
            }, delay);
            break;
        case '/test/mirror':// 如果请求是test/mirror,则原文返回它
            // 响应状态和头
            response.writeHead(200, { 'Content-type': 'text/plain; charset=UTF-8' });
            // 用请求的内容开始编写响应主体
            response.write(request.mothod + ' ' + request.url + ' HTTP/' + request.httpVersion + '\r\n');
            // 所有的请求头
            for (var h in request.headers) {
                response.write(h + ':' + request.headers[h] + '\r\n');
            }
            response.write('\r\n');// 使用额外的空白行来结束头
            // 在这些事件处理程序函数中完成响应
            // 当请求主体的数据块完成时,把其写入响应中
            request.on('data', function (chunk) { response.write(chunk); });
            // 当请求结束时,响应也完成
            request.on('end', function (chunk) { response.end(); });
            break;
        case '/json': // 模拟JSON数据返回
            // 响应状态和头
            //getStatusFromMongoDB(response);
           // response.writeHead(200, { 'Content-type': 'application/json; charset=UTF-8' });

           // response.write(JSON.stringify(tmp));
            
           // response.end();
            break;
        default:// 处理来自本地目录的文件
            var filename = url.pathname.substring(1);    // 去掉前导'/'
            var type = getType(filename.substring(filename.lastIndexOf('.') + 1));
            // 异步读取文件,并将内容作为单独的数据模块传给回调函数
            // 对于确实很大的文件,使用流API fs.createReadStream()更好
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

//请求mongodb状态数据
//data.machineID;              //机器ID
//data.startDate;              //起始时间
//data.endDate;                //结束时间
//data.subtractDays;           //请求数据天数
function getStatusFromMongoDB(response,data) {
    var server = new mongodb.Server('www.tnet.space', 27017, { auto_reconnect: true });
    var db = new mongodb.Db('IMDB', server, { safe: true });
    
    //连接db
    db.open(function (err, db) {
        if (!err) {
            //机器状态名称
            var statusStr = ["softwareOff", "machineOff", "alarm", "working", "notwork"];
            //存放1天中各种状态时间总和

            var statusInDays = { //存放请求天数中各状态时间总和
                softwareOff: [],
                machineOff: [],
                alarm: [],
                working: [],
                notwork: []
            }
            // 连接Collection（可以认为是mysql的table）
            // 第1种连接方式
            // db.collection('mycoll',{safe:true}, function(err, collection){
            //     if(err){
            //         console.log(err);
            //     }
            // });
            // 第2种连接方式
            db.createCollection('machineStatus', { safe: true }, function (err, collection) {
                if (err) {
                    console.log(err);
                } else {
                    //新增数据
                    // var tmp1 = {id:'1',title:'hello',number:1};
                    //          collection.insert(tmp1,{safe:true},function(err, result){
                    //              console.log(result);
                    //          }); 
                    //更新数据
                    // collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
                    //     console.log(result);
                    // });
                    // 删除数据
                    // collection.remove({title:'hello'},{safe:true},function(err,result){
                    //                   console.log(result);
                    //               });

                    // console.log(collection);
                    // 查询数据
                  //  startDate = new Date(moment().subtract(subtractDays, 'days').utc().format());
                  //  endDate = new Date(moment.utc().format());

                    //初始化数据
                    for (var initIndex = 0; initIndex < data.subtractDays; initIndex++)
                    {
                        statusInDays.machineOff[initIndex] = 0;
                        statusInDays.alarm[initIndex] = 0;
                        statusInDays.softwareOff[initIndex] = 0;
                        statusInDays.working[initIndex] = 0;
                        statusInDays.notwork[initIndex] = 0;


                    }
                    console.log(data.machineID);
                    //查找machineID所有文档
                    collection.find({ "$and": [{ "machineID": data.machineID }, { "startTime": { "$gt": new Date(data.startDate) } }, { "startTime": { "$lt": new Date(data.endDate) } }] }).toArray(function (err, docs) {
                            var timeSum = 0;
                            for (var index in docs) {
                                //获得和现在的时间差判断是哪一天的数据。
                                var duration = parseInt((new Date(data.endDate) - new Date(docs[index]["startTime"])) / 1000 / 60 / 60 / 24);
                                //算出docs[index]["lastStatus"]状态的时间差加到该天的该时间总和中   
                                //if (!statusInDays[docs[index]["lastStatus"]][duration])
                                //    statusInDays[docs[index]["lastStatus"]][duration] = 0;
                                statusInDays[docs[index]["lastStatus"]][duration] += (docs[index]["endTime"] - docs[index]["startTime"]) / 1000 / 3600/24 ;
                                statusInDays[docs[index]["lastStatus"]][duration] = Math.round(statusInDays[docs[index]["lastStatus"]][duration]*100)/100
                                console.log(statusInDays[docs[index]["lastStatus"]][duration]);

                            }
                         //console.log(statusInDays);
                            response.writeHead(200, { 'Content-type': 'application/json; charset=UTF-8' });
                        //jsonp返回getStatus函数
                         response.write("getStatus("+JSON.stringify(statusInDays)+")");
                         response.end();

                      

                        });                 
                }

            });
        } else {
            console.log(err);
        }
    });

}
