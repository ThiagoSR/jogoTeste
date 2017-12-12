/**
 * Created by Brayan Bertan on 10/12/2017.
 */


var carregar = function(game){}

carregar.prototype = {
    preload: function(){
        this.game.add.sprite(52,52, 'loading')
        this.game.load.image('gotas', 'assets/particulas/gotaDeChuva.png');
        this.game.load.image('menuFundo', 'assets/menu/menuFundo.png');
        this.game.load.image('botaoJogar', 'assets/menu/botaoJogar.png');
        this.game.load.spritesheet('portal', 'assets/folhas/portalSheet.png',62,82);
        this.game.load.spritesheet('joia', 'assets/folhas/joiaSheet.png',43,37);
        this.game.load.image('arvore', 'assets/cenario/arvore.png');
        this.game.load.image('plataformasImagem', 'assets/cenario/plataforma.png');
        this.game.load.spritesheet('zombieNormal', 'assets/folhas/zombieSheet.png',94,74);
        this.game.load.spritesheet('jogador', 'assets/folhas/playerSheet.png',38,69);
        this.game.load.image('nuvem', 'assets/cenario/Nuvem.png',222,82);
        this.game.load.image('lava', 'assets/cenario/lava.png',222,82);
    },
    create: function(){

        this.game.state.start("Menu");

    }
}


