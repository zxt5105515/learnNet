/*
In the node.js intro tutorial (http://nodejs.org/), they show a basic tcp 
server, but for some reason omit a client connecting to it.  I added an 
example at the bottom.
Save the following server in example.js:
*/

var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	// socket.pipe(socket);

    socket.on('data' ,(data)=>{
        console.log("receive " + data.toString())
        socket.write("receive " + data.toString())
    })

    socket.on('close' ,(hadError)=>{
        console.log('close')
        if(hadError){
            console.log('close has error:' + socket.errored)
        }
    })
});


server.listen(2223, '127.0.0.1');

/*
And connect with a tcp client from the command line using netcat, the *nix 
utility for reading and writing across tcp/udp network connections.  I've only 
used it for debugging myself.
$ netcat 127.0.0.1 1337
You should see:
> Echo server
*/