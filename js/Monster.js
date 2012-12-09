(function (window) {
    function Monster(monsterName, imgMonster, x_end) {
        this.initialize(monsterName, imgMonster, x_end);
    }
    Monster.prototype = new createjs.BitmapAnimation();

    // public properties:
    Monster.prototype.IDLEWAITTIME = 40;
    Monster.prototype.bounds = 0;
    Monster.prototype.hit = 0;

    // constructor
    Monster.prototype.BitmapAnimation_intialize = Monster.prototype.initialize; //unique to avoid orerriding base

    // variable membes to handle the idle state
    // and the time to wait before walking again
    this.isInIdleMode = false;
    this.idleWaitTicker = 0;

    var quaterFrameSize;

    Monster.prototype.initialize = function (monsterName, imgMonster, x_end) {
        var localSpriteSheet = new createjs.SpriteSheet({
            images: [imgMonster], //image to use
            frames: { width: 64, height: 64, regX: 32, regY: 32 },
            animations: { 
                walk: [0, 9, "walk", 4],
                idle: [10, 20, "idle", 4]
            }
        });

        createjs.SpriteSheetUtils.addFlippedFrames(localSpriteSheet, true, false, false);

        this.BitmapAnimation_intialize(localSpriteSheet);
        this.x_end = x_end;

        quaterFrameSize = this.spriteSheet.getFrame(0).rect.width / 4;

        // start playing the first sequence
        this.gotoAndPlay("walk_h");

        // set up a shadow.
        this.shadow = new createjs.Shadow("#000", 3, 2, 2);
        
        this.name = monsterName;

        this.direction = 1;

        this.vX = 1;
        this.vY = 0;

        this.currentFrame = 21;
    };

