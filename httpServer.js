var http = require('http');
var querystring = require('querystring');

var server = http.createServer().listen(2224);
console.log("default server.keepAliveTimeout" ,server.keepAliveTimeout)
server.keepAliveTimeout = 20000
server.on('request', function (req, res) {
    if (req.method == 'POST') {
        var body = '';
    }

    req.on('data', function (data) {
        body += data;
    });

    req.on('end', function () {
        var post = querystring.parse(body);
        console.log(post);
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