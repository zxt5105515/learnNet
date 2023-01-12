//http2 多路复用 client ,使用 http2Server.js做服务器即可
var http = require('http2');

const client = http.connect('http://localhost:2224');
client.on('error', (err) => console.error(err));

let needDoneCount = 5;
for(var i = 0; i < 5; i++){
    let curIndex = i
    const req = client.request({ ':path': '/test/path/in/client?a=b&c=d' });

    // req.on('push', (headers, flags) => {
    //     console.log("req get a push,", JSON.stringify(headers) ,flags);
    // })
    
    
    req.on('response', (headers, flags) => {
        console.log(`get response head ${curIndex}: ${JSON.stringify(headers)}`);
        // for (const name in headers) {
        //     console.log(`response: ${name}: ${headers[name]}`);
        // }
    });
    
    req.setEncoding('utf8');
    let data = '';
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
        console.log(`response end, response body ${curIndex}:${data}`);
        needDoneCount--;
        if(needDoneCount == 0){
            client.close();
        }
    });
    // req.write("hello from http2 client")
    req.end();
}


