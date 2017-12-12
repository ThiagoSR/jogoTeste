var menu = function(game){}

menu.prototype = {

    create: function(){
        var menuFundo = this.game.add.sprite(0,0,"menuFundo");
        var menuTexto = this.game.add.text(362, 26, 'Menu:', {fontSize: '222px', fill: '#000' });

        var playButton = this.game.add.button(416,232,"botaoJogar",this.playTheGame,this,'xd');
        playButton.anchor.setTo(0.5,0.5);
    },
    playTheGame: function(){
        this.game.state.start("Jogar");
    }
}