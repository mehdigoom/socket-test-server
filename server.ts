

function Server(opt) {
    this.opt = opt;
    this.httpServer = require('http').createServer();
    this.io = require('socket.io')(this.httpServer)
    this.start();

}



//all variables
player:number = 0
PlayerMax:number = 100
saison:number = 1
if(load("saison") != null){
    saison = load("saison")
}

iforginal = false

Server.prototype.start = function() {

    console.log("Lancement du serveur mulijoueurs Valjang Engine.")
    
that = this;
   


//Player connecting
   this.io.on('connection', function(socket) {
        player ++
        console.log("Le client " + socket.id + " est connecter (" + player+"/"+PlayerMax+")")
          


           //identification
           socket.on('idplayer', function(id) {
            console.log(socket.id+" à demander à rejoindre la partie")
            
            if(player >= PlayerMax){
                socket.emit('auth',"nope");
               }else{
                socket.emit('auth',"ok");
               }
               
              
                console.log("nouveau joueur :"+ id)
        })






            //map generator
        socket.on('needchunk', function(posisionx, posisiony, zone) {
          
            let idp //Item id
            let posx //Item posison X
            let posy //Item posison Y

            for (var i = 0; i < 20; i++) {
                idp = rng(10)
                posx = Rngfloat(posisionx - 50, posisionx + 50)
                posy = Rngfloat(posisiony - 50, +posisiony + 50)
                socket.emit('Gen', posx, posy, idp);
                socket.broadcast.emit('Gen', posx, posy, idp);
            }



            
        })


        socket.on('Getrole', function() {
            console.log(socket.id+" à demander un role")
//0 = original 
//1 finder
//2 killer
//3 protecteur
           let id = rng(4)
       if(id == 0){
           if(this.iforginal){
            id = rng(4)
           }else{
               this.iforginal = true
           }


       }
       socket.emit('YourRole',id)
        })


//new saison 
        socket.on('end', function(id,reason) {

           
            saison = saison +1
            save("saison",saison)
            socket.broadcast.emit('saison',saison) 

       

        })



        socket.on('needsaison', function() {
            console.log(socket.id+" à demander à savoir la saison actuelle.")
            socket.emit('saison',saison) 

       

        })
            //posision player Syc
        socket.on('my_posision', function(posisionx, posisiony, id) {

           

            socket.broadcast.emit('player_pos', posisionx, posisiony, id);
           

        })

        //Drop item
        socket.on('spawnI', function(posisionx, posisiony,id) {

           

            socket.broadcast.emit('spawner', posisionx, posisiony, id);
            

        })
            //Player disconnected
        socket.on('disconnect', function() {
            player = player -1
            console.log("Le client " + socket.id + " est déconnecter"+"("+ player+"/"+PlayerMax+")")
            socket.broadcast.emit('Disconnect', socket.id);
        });

    });
    //Runnig server
    this.httpServer.listen(this.opt.port, function() {
        console.log("le server écoute le port: " + that.opt.port +"("+ player+"/"+PlayerMax+")")
        console.log("La saison "+saison+" Demarre !")
    });








};
module.exports = Server;