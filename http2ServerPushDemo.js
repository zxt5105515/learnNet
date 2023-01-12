const http = require('http2');
var querystring = require('querystring');

var server = http.createServer().listen(2224);
console.log("default server.keepAliveTimeout" ,server.keepAliveTimeout)
// server.keepAliveTimeout = 20000

server.on("stream", (stream, headers) => {
    console.log("on stream" ,JSON.stringify(headers))


    var body = ''
    stream.on("data" ,(d)=>{
        body += d
    })

    stream.on('end' ,()=>{
        console.log('on stream ,end ' + body)
    })

    stream.pushStream({ ':path': '/pushItem.png' }, (err, pushStream, headers) => {
        if (err) throw err;
        pushStream.respond({ ':status': 201 });
        setTimeout(() => {
            console.log("push some data")
            pushStream.end('some pushed data');


            //所有push结束后
            // stream.end();
        }, 1000);
    });

    stream.pushStream({ ':path': '/pushItem2.png' }, (err, pushStream, headers) => {
        if (err) throw err;
        pushStream.respond({ ':status': 202 });
        setTimeout(() => {
            console.log("push some data 2")
            pushStream.end('some pushed data 2');


            //所有push结束后 end 发起的 stream
            stream.write("1,2,3,4")
            stream.end();            
        }, 5000);
    });



})

// server.on('request', function (req, res) {
//     // return;
//     console.log("new request start ,method:" ,req.method)
//     if (req.method == 'POST') {
//         var body = '';
//     }

//     //push
//     res.stream.pushStream({ ':path': '/pushItem.png' }, (err, pushStream, headers) => {
//         if (err) throw err;
//         setTimeout(() => {
//             console.log("push some data")
//             pushStream.respond({ ':status': 200 });
//             pushStream.end('some pushed data');
//         }, 3000);

//     });
    

//     req.on('data', function (data) {
//         body += data;
//     });

//     req.on('end', function () {
//         var post = querystring.parse(body);
//         console.log(post);
//         // Transfer-Encoding: chunked ,不含content-length
//         // res.writeHead(200, {'Content-Type': 'text/plain'} );

//         //content-length: 500
//         // res.writeHead(200, {'Content-Type': 'text/plain' ,'content-length':'50'} );
//         var ret=""
//         for(var i = 0; i < 20 ;i++){
//             ret += i.toString() +","
//         }
//         // res.write(ret)
//         res.stream.respond({ ':status': 200 })
//         res.stream.end(ret)
//         // res.end("")            

//         //模拟慢响应
//         // setTimeout(() => {
//         //     res.write(ret)            
//         // }, 1000);
//         // setTimeout(() => {
//         //     res.end("end!")            
//         // }, 2000);
//     });
// });

server.on('connection', function (socket) {
    console.log("NEW CONNECTION");
})

console.log('Listening on port 2224');