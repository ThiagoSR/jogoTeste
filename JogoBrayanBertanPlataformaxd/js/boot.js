var boot = function(game){

};

boot.prototype = {
    preload: function(){
        this.game.load.image("loading","assets/cenario/arvore.png");
    },
    create: function(){

        this.game.state.start("Carregar");

    }
}