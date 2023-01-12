const http = require('http2');
var querystring = require('querystring');

//注意 浏览器不支持未加密的http2
var server = http.createServer().listen(2224);
console.log("default server.keepAliveTimeout" ,server.keepAliveTimeout)
// server.keepAliveTimeout = 20000


server.on('request', function (req, res) {
    // return;
    console.log("new request start ,method:" ,req.method)
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        console.log("get request body end, body:" ,body);
        var post = querystring.parse(body);
        // Transfer-Encoding: chunked ,不含content-length
        // res.writeHead(200, {'Content-Type': 'text/plain'} );

        //content-length: 500
        res.writeHead(200, {'Content-Type': 'text/plain' ,'content-length':'50'} );
        var ret=""
        for(var i = 0; i < 20 ;i++){
            ret += i.toString() +","
        }
        res.write(ret)
        res.end("")            

        //模拟慢响应
        // setTimeout(() => {
        //     res.write(ret)            
        // }, 1000);
        // setTimeout(() => {
        //     res.end("end!")            
        // }, 2000);
    });
});

server.on('connection', function (socket) {
    console.log("NEW CONNECTION");
})

console.log('Listening on port 2224');