var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
    msg: 'hello world'
});

// var postData2 = querystring.stringify({
//     msg: 'hello world ,this is this is this is count 2'
// });

var keepAliveAgent = new http.Agent({ 
    keepAlive: true,
});

// keepAliveAgent = null

var options = {
    agent:keepAliveAgent,
    hostname: 'localhost',
    path: '/test/path/in/client?a=b&c=d',
    port: 2224,
    method: 'GET',
    // headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Content-Length': postData.length,
    //     // 'Connection': 'keep-alive',
    // }
};


var req1 = http.request(options , function (res1) {
    console.log("REQUEST_1");
    res1.on('data' ,(c)=>{

    })

    // res1.on('end' ,()=>{
    //     console.log("REQUEST_1 end");
    // })

    res1.on('close' ,()=>{
        console.log("REQUEST_1 close");

        // var req2 = http.request(options, function (res2) {
        //     res2.on('data' ,(c)=>{
        //         console.log("REQUEST_2 get data");
        //     })            
        //     console.log("REQUEST_2");
        // });

        // req2.end();        
    })

    res1.on('error' ,(e)=>{
        console.log("REQUEST_1 error" ,e.stack);
    })
});

req1.end();

setTimeout(() => {
    var req2 = http.request(options, function (res2) {
        console.log("REQUEST_2");
    });

    req2.end();
}, 7000);

// var req = http.request(options, function (res) {
//     console.log('STATUS:', res.statusCode);
//     console.log('HEADERS:', JSON.stringify(res.headers));

//     res.setEncoding('utf8');

//     res.on('data', function (chunk) {
//         console.log('BODY:', chunk);
//     });

//     res.on('end', function () {
//         console.log('No more data in response.');
//     });

    
//     res.on('error', function (e) {
//         console.log('Problem with res:', e.stack);
//     });
// });

// req.on('error', function (e) {
//     console.log('Problem with request:', e.stack);
// });

// req.write(postData);
// req.end();

// setTimeout(() => {
//     var req2 = http.request(options, function (res) {
//         console.log('STATUS 2:', res.statusCode);
//         console.log('HEADERS 2:', JSON.stringify(res.headers));
    
//         res.setEncoding('utf8');
    
//         res.on('data', function (chunk) {
//             console.log('BODY:', chunk);
//         });
    
//         res.on('end', function () {
//             console.log('No more data in response.');
//         });
    
        
//         res.on('error', function (e) {
//             console.log('Problem with res:', e.stack);
//         });
//     });
//     req2.write(postData);
//     req2.end();    
//     console.log("timeout ,client exit")
// }, 2*1000);