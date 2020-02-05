
  export module Val{
    function Rngfloat(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    function load(data) {
       return(config.get(data)) 
    }
    function save(data,contenent) {
        config.set(data, contenent);
    console.log(data +" est bien save")
    }
    function remove(data) {
    
        config.delete(data);
        console.log(data +" est bien supprimer")
    }
    
    function rng(max) {
    
        return Math.floor(Math.random() * Math.floor(max));
    }
    

};



module.exports = Val;