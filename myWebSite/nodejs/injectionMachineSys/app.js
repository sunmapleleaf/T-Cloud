// ����һ���򵥵�Node HTTP������,�ܴ���ǰĿ¼���ļ�
// ����ʵ�����������URL���ڲ���
// ��HTTP://localhost:8000��http://127.0.0.1:8000�������������

// ���ȼ���������Ҫ�õ���ģ��
var http = require('http');        // Http������API
var fs = require('fs');            // ���ڴ������ļ�
var server = new http.Server();    // �����µ�HTTP������
server.listen(8000);            // �����˿�8000
var mongodb = require('mongodb');
var moment = require('moment');
var querystring = require('querystring');
var util = require('util');
var captchapng = require('captchapng');

var index = 0;



//ʹ��on����ע��ʱ�䴦��
server.on('request', function (request, response) { // ����request�����ʱ�򴥷�������
    console.log("request");





    var post = '';     //������һ��post�����������ݴ����������Ϣ

    request.on('data', function (chunk) {    //ͨ��req��data�¼�����������ÿ�����ܵ�����������ݣ����ۼӵ�post������
        post += chunk;

    });


 


    // ���������URL
    var url = require('url').parse(request.url);
   // console.log(request.url);

    //����post��������
    request.on('end', function () {    //��end�¼�������ͨ��querystring.parse��post����Ϊ������POST�����ʽ��Ȼ����ͻ��˷��ء�
        var data = {
        };
        var tmpStr = decodeURIComponent(request.url).split("&");
        data = JSON.parse(tmpStr[1]);
        if (data && url.pathname == "/json") {
            getStatusFromMongoDB(response,data);

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
            //getStatusFromMongoDB(response);
           // response.writeHead(200, { 'Content-type': 'application/json; charset=UTF-8' });

           // response.write(JSON.stringify(tmp));
            
           // response.end();
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

//����mongodb״̬����
//data.machineID;              //����ID
//data.startDate;              //��ʼʱ��
//data.endDate;                //����ʱ��
//data.subtractDays;           //������������
function getStatusFromMongoDB(response,data) {
    var server = new mongodb.Server('www.tnet.space', 27017, { auto_reconnect: true });
    var db = new mongodb.Db('IMDB', server, { safe: true });
    
    //����db
    db.open(function (err, db) {
        if (!err) {
            //����״̬����
            var statusStr = ["softwareOff", "machineOff", "alarm", "working", "notwork"];
            //���1���и���״̬ʱ���ܺ�

            var statusInDays = { //������������и�״̬ʱ���ܺ�
                softwareOff: [],
                machineOff: [],
                alarm: [],
                working: [],
                notwork: []
            }
            // ����Collection��������Ϊ��mysql��table��
            // ��1�����ӷ�ʽ
            // db.collection('mycoll',{safe:true}, function(err, collection){
            //     if(err){
            //         console.log(err);
            //     }
            // });
            // ��2�����ӷ�ʽ
            db.createCollection('machineStatus', { safe: true }, function (err, collection) {
                if (err) {
                    console.log(err);
                } else {
                    //��������
                    // var tmp1 = {id:'1',title:'hello',number:1};
                    //          collection.insert(tmp1,{safe:true},function(err, result){
                    //              console.log(result);
                    //          }); 
                    //��������
                    // collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
                    //     console.log(result);
                    // });
                    // ɾ������
                    // collection.remove({title:'hello'},{safe:true},function(err,result){
                    //                   console.log(result);
                    //               });

                    // console.log(collection);
                    // ��ѯ����
                  //  startDate = new Date(moment().subtract(subtractDays, 'days').utc().format());
                  //  endDate = new Date(moment.utc().format());

                    //��ʼ������
                    for (var initIndex = 0; initIndex < data.subtractDays; initIndex++)
                    {
                        statusInDays.machineOff[initIndex] = 0;
                        statusInDays.alarm[initIndex] = 0;
                        statusInDays.softwareOff[initIndex] = 0;
                        statusInDays.working[initIndex] = 0;
                        statusInDays.notwork[initIndex] = 0;


                    }
                    console.log(data.machineID);
                    //����machineID�����ĵ�
                    collection.find({ "$and": [{ "machineID": data.machineID }, { "startTime": { "$gt": new Date(data.startDate) } }, { "startTime": { "$lt": new Date(data.endDate) } }] }).toArray(function (err, docs) {
                            var timeSum = 0;
                            for (var index in docs) {
                                //��ú����ڵ�ʱ����ж�����һ������ݡ�
                                var duration = parseInt((new Date(data.endDate) - new Date(docs[index]["startTime"])) / 1000 / 60 / 60 / 24);
                                //���docs[index]["lastStatus"]״̬��ʱ���ӵ�����ĸ�ʱ���ܺ���   
                                //if (!statusInDays[docs[index]["lastStatus"]][duration])
                                //    statusInDays[docs[index]["lastStatus"]][duration] = 0;
                                statusInDays[docs[index]["lastStatus"]][duration] += (docs[index]["endTime"] - docs[index]["startTime"]) / 1000 / 3600/24 ;
                                statusInDays[docs[index]["lastStatus"]][duration] = Math.round(statusInDays[docs[index]["lastStatus"]][duration]*100)/100
                                console.log(statusInDays[docs[index]["lastStatus"]][duration]);

                            }
                         //console.log(statusInDays);
                            response.writeHead(200, { 'Content-type': 'application/json; charset=UTF-8' });
                        //jsonp����getStatus����
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
