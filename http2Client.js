var http = require('http2');
var querystring = require('querystring');
const fs = require('node:fs');

const client = http.connect('http://localhost:2224');
client.on('error', (err) => console.error(err));

const req = client.request({ ':path': '/test/path/in/client?a=b&c=d' });

// req.on('push', (headers, flags) => {
//     console.log("req get a push,", JSON.stringify(headers) ,flags);
// })


req.on('response', (headers, flags) => {
    for (const name in headers) {
        console.log(`response: ${name}: ${headers[name]}`);
    }
});

req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => { data += chunk; });
req.on('end', () => {
    console.log(`req end, response body:${data}`);
    client.close();
});
// req.write("hello from http2 client")
req.end();
