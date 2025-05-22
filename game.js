const gameState = {
    attack: {
        slash: false,
        shoot: false,
        punch: false,
    },
    class: {
        farmer: true,
        archer: false,
        fighter: false,
    },
    active: true,
    xpPoints: 999,
    level: 2,
    coins: 1000000,
    currentclass: 'Please select a class. Z for Archer, X for Fighter, C for Farmer.',
    enemyHP: 2,
    enemy2HP: 5,
    playerHP: 5,
    punchDMG: 1,
    slashRespawnScheduled: false,
    punchRespawnScheduled: false,
    enemyRespawnScheduled: false,
    farmCooldown: false,
    arrowCount: 10000,
    lastDirectionX: null,
    lastDirectionY: null,
    arrowDMG: 2,
};
class LoadScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'LoadScene'
        })
    }
    preload() {
        this.load.image('startButton', 'i')
    }
    create() {
        gameState.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        this.add.text(150, 250, 'Press Space to start the game')
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(gameState.spaceKey)){
            this.scene.start('MainScene')
        }
    }
}
class MainScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'MainScene'
        })
    }
preload() {
   this.load.image('player', 'i')
   this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png')
   this.load.image('farm', 'i')
   this.load.image('enemy', 'i')
   this.load.image('arrow', 'i')
   this.load.image('market', 'i')
   this.load.image('classChanger', 'i')
};
create() {
   gameState.player = this.physics.add.sprite(300, 250, 'player');
   gameState.farm = this.physics.add.sprite(400, 100, 'farm');
   gameState.enemies = this.physics.add.staticGroup();
   gameState.enemies.create(100, 250, 'enemy');
   gameState.scene = this;
   gameState.arrow = this.physics.add.group();
   gameState.market = this.physics.add.sprite(400, 400, 'market');
   gameState.classChanger = this.physics.add.sprite(400, 250, 'classChanger');
   gameState.qKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
   gameState.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
   gameState.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
   gameState.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
   gameState.tKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
   gameState.yKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
   gameState.uKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
   gameState.iKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
   gameState.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
   gameState.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
   gameState.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
   gameState.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
   gameState.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
   gameState.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
   gameState.gKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
   gameState.hKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
   gameState.jKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
   gameState.kKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
   gameState.lKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
   gameState.zKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
   gameState.xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
   gameState.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
   gameState.vKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);
   gameState.bKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
   gameState.nKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    gameState.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
   gameState.altKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ALT)
   gameState.classText = this.add.text(20, 100, '').setScale(0.7)
   gameState.xpText = this.add.text(20, 80, '').setScale(0.7)
   gameState.coinsText = this.add.text(60, 80, '').setScale(0.7)
   gameState.levelText = this.add.text(20, 60, '').setScale(0.7)
   gameState.resetText = this.add.text(200, 400, '').setScale(1.6)
   gameState.punchDMGText = this.add.text(20, 120, '').setScale(0.7)
   gameState.arrowDMGText = this.add.text(20, 140, '').setScale(0.7)
   // Text is place X - 25, Y - 40
   this.add.text(75, 210, 'Enemy')
   this.add.text(375, 60, 'Farm')
   this.add.text(375, 360, 'Market')
   this.add.text(360, 210, 'Change Class')
   setTimeout(() => {
       gameState.classText.setText(`${gameState.currentclass}`)
   }, 10)
   this.physics.add.overlap(gameState.player, gameState.farm, () => {
       if (gameState.class.farmer && Phaser.Input.Keyboard.JustDown(gameState.fKey) && !gameState.farmCooldown) {
           gameState.farmCooldown = true;
           gameState.xpPoints += 5
           setTimeout(() => {
               gameState.farmCooldown = false;
           }, 1000)
       }
   })
   this.physics.add.collider(gameState.player, gameState.enemies, (player, enemy) => {
       gameState.player.destroy()
       gameState.player = null
       enemy.destroy()
       gameState.active = false
              this.scene.launch('DeathScene')
       this.scene.stop()
   })
   this.physics.add.overlap(gameState.player, gameState.market, () => {
       if (Phaser.Input.Keyboard.JustDown(gameState.tKey)) {
           gameState.coins = gameState.xpPoints
           gameState.xpPoints = 0
       } else if (Phaser.Input.Keyboard.JustDown(gameState.bKey)) {
        if (gameState.punchDMG === 1) {
            gameState.coins -= 100
            gameState.punchDMG = 2
        } else if (gameState.punchDMG === 2) {
            gameState.coins -= 200
            gameState.punchDMG = 3
        } else if (gameState.punchDMG === 3) {
            gameState.coins -= 300
            gameState.punchDMG = 4
        } else if (gameState.punchDMG === 4) {
            gameState.coins -= 400
            gameState.punchDMG = 5
        }
       } else if (Phaser.Input.Keyboard.JustDown(gameState.nKey)) {
        if (gameState.arrowDMG === 2) {
            gameState.coins -= 200
            gameState.arrowDMG = 3
        } else if (gameState.arrowDMG === 3) {
            gameState.coins -= 300
            gameState.arrowDMG = 4
        } else if (gameState.arrowDMG === 4) {
            gameState.coins -= 400
            gameState.arrowDMG = 5
        } else if (gameState.arrowDMG === 5) {
            gameState.coins -= 500
            gameState.arrowDMG = 6
        } else if (gameState.arrowDMG === 6) {
            gameState.coins -= 700
            gameState.arrowDMG = 7
        } else if (gameState.arrowDMG === 7) {
            gameState.coins -= 900
            gameState.arrowDMG = 8
        } else if (gameState.arrowDMG === 8) {
            gameState.coins -= 1100
            gameState.arrowDMG = 9
        } else if (gameState.arrowDMG === 9) {
            gameState.coins -= 1300
            gameState.arrowDMG = 10
        }
       }
   })
   this.physics.add.overlap(gameState.player, gameState.classChanger, () => {
       if (gameState.zKey.isDown) {
           if (gameState.level >= 2) {
               gameState.class.farmer = false;
               gameState.class.fighter = false;
               gameState.class.archer = true;
               gameState.currentclass = 'Current Class = Archer'
           }
       } else if (gameState.xKey.isDown) {
           if (gameState.level >= 1) {
               gameState.class.farmer = false;
               gameState.class.archer = false;
               gameState.class.fighter = true;
               gameState.currentclass = 'Current Class = Fighter'
           }
       } else if (gameState.cKey.isDown) {
           gameState.class.farmer = true;
           gameState.class.archer = false;
           gameState.class.fighter = false;
           gameState.currentclass = 'Current Class = Farmer'
       }
   })


};
update() {
    if (!gameState.player || !gameState.player.active) {
        return;
    }
   gameState.levelText.setText(`${gameState.level}`)
   gameState.xpText.setText(`${gameState.xpPoints}`)
   gameState.coinsText.setText(`${gameState.coins}`)
   gameState.classText.setText(`${gameState.currentclass}`)
   gameState.punchDMGText.setText(`${gameState.punchDMG}`)
   gameState.arrowDMGText.setText(`${gameState.arrowDMG}`)
   if (!gameState.active) {
    gameState.active = true;
   }
   if (gameState.active) {
       gameState.enemies.children.iterate((enemy) => {
           if (enemy.active) {
               let dx = Math.abs(gameState.player.x - enemy.x);
               let dy = Math.abs(gameState.player.y - enemy.y);
               this.physics.add.collider(gameState.arrow, gameState.enemies, (arrow, enemy) => {
                   arrow.destroy()
                   enemy.destroy();
                   gameState.xpPoints += 5;
                   if (!gameState.enemyRespawnScheduled) {
                       gameState.enemyRespawnScheduled = true;
                       setTimeout(() => {
                           gameState.enemies.create(100, 250, 'enemy');
                           gameState.enemyHP = 2;
                           gameState.enemyRespawnScheduled = false;
                       }, 500);
                   }
               })
               if (Phaser.Input.Keyboard.JustDown(gameState.qKey) && gameState.attack.slash && dx <= 50 && dy <= 50) {
                   enemy.destroy();
                   gameState.xpPoints += 5;
                   gameState.attack.slash = false;
                   if (!gameState.slashRespawnScheduled) {
                       gameState.slashRespawnScheduled = true;
                       setTimeout(() => {
                           if (gameState.class.fighter) {
                               gameState.attack.slash = true;
                           }
                           gameState.slashRespawnScheduled = false;
                       }, 5000);
                   }
                   if (!gameState.enemyRespawnScheduled) {
                       gameState.enemyRespawnScheduled = true;
                       setTimeout(() => {
                           gameState.enemies.create(100, 250, 'enemy');
                           gameState.enemyHP = 2;
                           gameState.enemyRespawnScheduled = false;
                       }, 500);
                   }
               } else if (Phaser.Input.Keyboard.JustDown(gameState.eKey) && gameState.attack.punch && dx <= 50 && dy <= 50) {
                   console.log(`${gameState.enemyHP}`)
                   gameState.enemyHP -= gameState.punchDMG;
                   if (gameState.enemyHP <= 0) {
                       enemy.destroy();
                       gameState.xpPoints += 5;
                       gameState.attack.punch = false;
                       if (!gameState.punchRespawnScheduled) {
                           gameState.punchRespawnScheduled = true;
                           setTimeout(() => {
                               if (gameState.class.fighter) {
                                   gameState.attack.punch = true;
                               }
                               gameState.punchRespawnScheduled = false;
                           }, 500);
                       }
                       if (!gameState.enemyRespawnScheduled) {
                           gameState.enemyRespawnScheduled = true;
                           setTimeout(() => {
                               gameState.enemies.create(100, 250, 'enemy');
                               gameState.enemyHP = 2;
                               gameState.enemyRespawnScheduled = false;
                           }, 500);
                       }
                   }
               }
           }
       });
       gameState.arrow.children.iterate((arrow) => {
           if (!arrow || !arrow.active) return;
           if (arrow.x > 600 || arrow.x < 0 || arrow.y > 500 || arrow.y < 0) {
               arrow.destroy()
           }
       })
       if (gameState.aKey.isDown) {
           if (gameState.wKey.isDown) {
               gameState.player.setVelocityX(-100)
               gameState.player.setVelocityY(-100)
               gameState.lastDirectionX = 'left'
               gameState.lastDirectionY = 'up'
           } else if (gameState.sKey.isDown) {
               gameState.player.setVelocityX(-100)
               gameState.player.setVelocityY(100)
               gameState.lastDirectionX = 'left'
               gameState.lastDirectionY = 'down'
           } else if (gameState.dKey.isDown) {
               gameState.player.setVelocityX(0)
           } else {
               gameState.player.setVelocityX(-100)
               gameState.lastDirectionX = 'left'
               gameState.lastDirectionY = null
           }




       } else if (gameState.dKey.isDown) {
           if (gameState.wKey.isDown) {
               gameState.player.setVelocityX(100)
               gameState.player.setVelocityY(-100)
               gameState.lastDirectionX = 'right'
               gameState.lastDirectionY = 'up'
           } else if (gameState.sKey.isDown) {
               gameState.player.setVelocityX(100)
               gameState.player.setVelocityY(100)
               gameState.lastDirectionX = 'right'
               gameState.lastDirectionY = 'down'
           } else if (gameState.aKey.isDown) {
               gameState.player.setVelocityX(0)
           } else {
               gameState.player.setVelocityX(100)
               gameState.lastDirectionX = 'right'
               gameState.lastDirectionY = null
           }
       } else {
           gameState.player.setVelocityX(0)
       }
       if (gameState.wKey.isDown) {
           if (gameState.aKey.isDown) {
               gameState.player.setVelocityX(-100)
               gameState.player.setVelocityY(-100)
               gameState.lastDirectionX = 'left'
               gameState.lastDirectionY = 'up'
           } else if (gameState.dKey.isDown) {
               gameState.player.setVelocityX(100)
               gameState.player.setVelocityY(-100)
               gameState.lastDirectionX = 'right'
               gameState.lastDirectionY = 'up'
           } else if (gameState.sKey.isDown) {
               gameState.player.setVelocityY(0)
           } else {
               gameState.player.setVelocityY(-100)
               gameState.lastDirectionX = null
               gameState.lastDirectionY = 'up'
           }
       } else if (gameState.sKey.isDown) {
           if (gameState.aKey.isDown) {
               gameState.player.setVelocityX(-100)
               gameState.player.setVelocityY(100)
               gameState.lastDirectionX = 'left'
               gameState.lastDirectionY = 'down'
           } else if (gameState.dKey.isDown) {
               gameState.player.setVelocityX(100)
               gameState.player.setVelocityY(100)
               gameState.lastDirectionX = 'right'
               gameState.lastDirectionY = 'down'
           } else if (gameState.wKey.isDown) {
               gameState.player.setVelocityY(0)
           } else {
               gameState.player.setVelocityY(100)
               gameState.lastDirectionX = null
               gameState.lastDirectionY = 'down'
           }
       } else {
           gameState.player.setVelocityY(0)
       }
       if (gameState.xpPoints === 100 && gameState.level === 0) {
           gameState.level += 1;
           gameState.xpPoints = 0;
       } else if (gameState.xpPoints === 200 && gameState.level === 1) {
           gameState.level += 1;
           gameState.xpPoints = 0;
       }
       if (gameState.class.farmer) {
           gameState.attack.slash = false;
           gameState.attack.punch = false;
           gameState.attack.shoot = false;
       } else if (gameState.class.fighter) {
           if (!gameState.slashRespawnScheduled) gameState.attack.slash = true;
           if (!gameState.punchRespawnScheduled) gameState.attack.punch = true;
           gameState.attack.shoot = false;
       } else if (gameState.class.archer) {
           gameState.attack.slash = false;
           gameState.attack.punch = false;
           gameState.attack.shoot = true;
       }
       if (Phaser.Input.Keyboard.JustDown(gameState.rKey) && gameState.class.archer) {
           const arrow = gameState.arrow.create(gameState.player.x, gameState.player.y, 'arrow').setScale(0.5)
           if (gameState.lastDirectionX === 'right') {
               arrow.setVelocityX(600)
           } else if (gameState.lastDirectionX === 'left') {
               arrow.setVelocityX(-600)
           }
           if (gameState.lastDirectionY === 'up') {
               arrow.setVelocityY(-600)
           } else if (gameState.lastDirectionY === 'down') {
               arrow.setVelocityY(600)
           }
       }
       if (Phaser.Input.Keyboard.JustDown(gameState.pauseKey)) {
        gameState.savedPlayerX = gameState.player.x;
gameState.savedPlayerY = gameState.player.y;
gameState.savedCoins = gameState.coins
gameState.savedXP = gameState.xpPoints
gameState.savedLVL = gameState.level
this.scene.launch('MenuScene')
        this.scene.pause()
       }
   }
}
}
class MenuScene extends Phaser.Scene {
    constructor(){
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('pauseScreen', 'path/to/pauseImage.png');
    }

    create(){
        this.add.image(300, 250, 'pauseScreen');
        this.add.text(240, 250, 'Game Paused');
        gameState.resumeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            if (gameState.savedPlayerX !== undefined && gameState.savedPlayerY !== undefined) {
        gameState.player.x = gameState.savedPlayerX;
        gameState.player.y = gameState.savedPlayerY;
    } else {
        this.player.x = 100;
        this.player.y = 100;
    }
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(gameState.resumeKey)) {
            this.scene.stop()
            this.scene.resume('MainScene');
        }
    }
}
class DeathScene extends Phaser.Scene {
    constructor(){
        super({
            key: 'DeathScene'
        })
    }
    preaload(){

    }
    create() {
        this.add.text(150, 500/2, 'You died! Press 1 to restart')
        gameState.restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(gameState.restartKey)) {
            gameState.active = true
            gameState.xpPoints = 0
            gameState.level = 0
            gameState.coins = 0
            gameState.punchDMG = 1
            gameState.arrowDMG = 2
            this.scene.start('MainScene')
            this.scene.stop()
        }

    }
}

const config = {
   type: Phaser.AUTO,
   width: 600,
   height: 500,
   backgroundColor: 0x03002e,
   physics: {
       default: "arcade",
       arcade: {
           gravity: {
               y: 0
           },
           debug: true,
       },
   },
   scene: [LoadScene, MainScene, MenuScene, DeathScene]
};
const game = new Phaser.Game(config);