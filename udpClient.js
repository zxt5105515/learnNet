
// -------------------- udp client ----------------

var buffer = require('buffer');
var udp = require('dgram');
const { argv } = require('process');

// creating a client socket
var client = udp.createSocket('udp4');

console.log(argv)
var clientName = argv[2] || "unknown"

//buffer msg
var data = Buffer.from('hello from client:' + clientName);

client.on('message',function(msg,info){
    console.log('Data received from server : ' + msg.toString());
    console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

// client.connect(2222 ,'localhost' ,function(error){
//     console.log('connect callback ' ,error)
// })

client.on('listening',function(){
    var address = client.address();
    var port = address.port;
    var family = address.family;
    var ipaddr = address.address;
    console.log('client is listening at port' + port);
    console.log('client ip :' + ipaddr);
    console.log('client is IP4/IP6 : ' + family);
});

//sending msg
client.send(data,2222,'localhost',function(error){
    if(error){
        client.close();
    }else{
        console.log('Data sent !!!');
    }
});

// var data1 = Buffer.from('hello');
// var data2 = Buffer.from('world');

// //sending multiple msg
// client.send([data1,data2],2222,'localhost',function(error){
//     if(error){
//         client.close();
//     }else{
//         console.log('Data sent !!!');
//     }
// });