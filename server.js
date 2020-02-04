function Server(opt) {
    this.opt = opt;
    this.httpServer = require('http').createServer();
    this.io = require('socket.io')(this.httpServer)
    this.start();
   
}

Server.prototype.start = function() {
    Val = require('./functions');
    console.log("Runnig server")
  Val.save()
that = this;
   


//Player connecting
   this.io.on('connection', function(socket) {
    //on connection
           
        socket.on('disconnect', function() {
//disconect client
        });

    });
    //Runnig server
    this.httpServer.listen(this.opt.port, function() {
        console.log("le server écoute le port: " + that.opt.port )

    });










};
module.exports = Server;