
/* Or use this example tcp client written in node.js.  (Originated with 
example code from 
http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html.) */

var net = require('net');
const { argv } = require('process');

console.log(argv)
var clientName = argv[2] || "unknown"
var client = new net.Socket();
client.connect(2223, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client:' + clientName);
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	// client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});


// setTimeout(() => {
//     console.log('send data2');
// 	client.write('Hello, server! data 2');
// }, 1000);

setTimeout(() => {
    client.destroy()
}, 5000);