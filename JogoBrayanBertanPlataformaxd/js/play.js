var jogar = function(game){
     player=null;
     zombie=null;
     plataformas=null;
     arvore=null;
     arvore1=null;
     arvores=null;
     cursors=null;
     nuvemGrupo=null;
     nuvemxd=null;
     joias=null;
     lavas=null;
     lava=null;
     portal=null;

     stars=null;
     score = 250;
    scoreText='';
     joiasColetadas =0;
     quantidadeJoiasColetadas='';
}

jogar.prototype = {

    create: function(){

        this.game.physics.startSystem(Phaser.Physics.ARCADE);


        this.game.world.setBounds(0, 0,1250,600);

        this.game.physics.arcade.enable(this.game);

        this.game.stage.backgroundColor=0x87CEEB;



        nuvemGrupo = this.game.add.group();
        nuvemxd = nuvemGrupo.create(0, 82,'nuvem');
        nuvemxd = nuvemGrupo.create(122, 82,'nuvem');







        //  The platforms group contains the ground and the 2 ledges we can jump on
        plataformas = this.game.add.group();

        //  We will enable physics for any object that is created in this group
        plataformas.enableBody = true;

        // Here we create the ground.
        var chao = plataformas.create(0, this.game.world.height -64, 'plataformasImagem');

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        chao.scale.setTo(3,3);//aumenta o item xd

        //  This stops it from falling away when you jump on it
        chao.body.immovable = true;

        //  Now let's create two ledges
        var plataforma = plataformas.create(400,362, 'plataformasImagem');
        plataforma.body.immovable = true;

        plataforma = plataformas.create(-86,312, 'plataformasImagem');
        plataforma.body.immovable = true;
        plataforma = plataformas.create(722,232, 'plataformasImagem');
        plataforma.body.immovable = true;

        plataforma = plataformas.create(1082,422, 'plataformasImagem');
        plataforma.body.immovable = true;

        portal = this.game.add.sprite(1192,342, 'portal');


        this.game.physics.arcade.enable(portal);



        portal.animations.add('giraPortal', [0,1], 10, true);








        joias = this.game.add.group();
        joias.enableBody = true;


        var joia = joias.create(42,242, 'joia');
        var joia = joias.create(552, this.game.world.height -134, 'joia');
        var joia = joias.create(792,162, 'joia');

        joias.callAll('animations.add', 'animations', 'spin', [0, 1, 2], 10, true);









        lavas = this.game.add.group();
        lavas.enableBody = true;
        lava = lavas.create(this.game.world.width-650, this.game.world.height-42, 'lava');
        this.game.physics.arcade.enable(lava);
        lava.body.immovable = true;
        lava.scale.setTo(3.3);





        arvores = this.game.add.group();
        arvores.enableBody = true;
        arvore = arvores.create(492, this.game.world.height -134, 'arvore');
        this.game.physics.arcade.enable(arvore);
        arvore.body.immovable = true;

        arvore1 = arvores.create(0, this.game.world.height -134, 'arvore');
        this.game.physics.arcade.enable(arvore1);
        arvore1.body.immovable = true;






        //==================================Zombie Normal============================================================
        zombie=this.game.add.sprite(375,this.game.world.height-142,'zombieNormal');
        this.game.physics.arcade.enable(zombie);
        zombie.body.collideWorldBounds = true;
        zombie.body.bounce.setTo(1, 1);
        zombie.body.velocity.x = 50;
        zombie.animations.add('monstroAnimacaoxd', [1,1,2,3,4,5,6,7,8], 10, true);
        //============================================================





        // for (var i = 0; i < 150; i++)
        //{
        //   game.add.sprite(game.world.randomX, game.world.randomY, 'bola');
        //}


        //==================================Jogador============================================================
        // The player and its settings
        player = this.game.add.sprite(52, this.game.world.height -152, 'jogador');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(player);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        player.animations.add('right', [0,1], 10, true);
        player.animations.add('left', [2,3], 10, true);
        //===========================================================



        //  The score
        scoreText = this.game.add.text(142, 16, 'Vida: 250', { fontSize: '32px', fill: '#000' });
        quantidadeJoiasColetadas = this.game.add.text(284,16, 'Joias:0', { fontSize: '32px', fill: '#000' });


        var emitter = this.game.add.emitter(-22, 122, 250);

        emitter.width = this.game.world.width;
        // emitter.angle = 30; // uncomment to set an angle for the rain.

        emitter.makeParticles('gotas');

        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.5;

        emitter.setYSpeed(300, 500);
        emitter.setXSpeed(-5, 5);

        emitter.minRotation = 0;
        emitter.maxRotation = 0;

        emitter.start(false, 1600, 5, 0);


        //  Our controls.
        cursors = this.game.input.keyboard.createCursorKeys();


        this.camera.follow(player);










    },

    update: function() {



        //  And play them
        joias.callAll('animations.play', 'animations', 'spin');

        if(player.position.y>this.game.world.height-122){
            this.encostouNaLava(player);
        }


        //  Collide the player and the stars with the platforms
        this.game.physics.arcade.collide(player, plataformas);
        this.game.physics.arcade.collide(player, arvore);
        this.game.physics.arcade.collide(player,arvore1);
        this.game.physics.arcade.collide(zombie, arvores);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.game.physics.arcade.overlap(player,zombie, this.collectStar, null, this);
        this.game.physics.arcade.overlap(player,joias, this.qtdJoiasCole, null, this);



        zombie.animations.play('monstroAnimacaoxd');
        portal.animations.play('giraPortal');





        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else if (cursors.left.isDown)
        {
            //  Move to the right
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -352;
            player.animations.play('right');
        }

    },



    collectStar: function (player, zombie) {

        //  Add and update the score
        score -=1;
        scoreText.text = 'Vida: ' + score;
        if(score<=0){
            player.kill();
        }

    },

    encostouNaLava: function (player) {
        player.kill();

    },

    qtdJoiasCole: function(player,joia) {

        joia.kill();
        joiasColetadas+=1;
        quantidadeJoiasColetadas.text = 'Joias: ' + joiasColetadas;

    }




}