var redis = require('redis');
var http = require('http');
var url = require("url");
var querystring = require("querystring");
http.createServer(function (req, res) {
    // ���ý������ݱ����ʽΪ UTF-8
    req.setEncoding('utf-8');
    var postData = ""; //POST & GET �� name=zzl&email=zzl@sina.com
    // ���ݿ������
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // ���ݽ�����ϣ�ִ�лص�����
    req.addListener("end", function () {
        console.log('���ݽ������');
        var params = querystring.parse(postData);//GET & POST  ////���ͱ����ݲ���{name="zzl",email="zzl@sina.com"}
        console.log(params);
        console.log(params["name"]);
        PushToRedis(params["name"]);
        res.writeHead(500, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("�����ύ���");
    });
}).listen(8000, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8000/');

//��������ɺ��ٴ���redis����
function PushToRedis(info) {
    var client = redis.createClient();
    client.lpush("topnews", info);
    console.log("PushToRedis:" + info);
    client.lpop("topnews", function (i, o) {
        console.log(o);//�ص�������info����û���õ�o��ֵ���ͱ�res.write�����
    })
    client.quit();
}