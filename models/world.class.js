class World{
    character = new Character(2.5);
    statusbar = new Statusbar();
    coinbar = new Coinbar();
    poisonbar = new Poisonbar();
    bossbar = new Bossbar();
    enemies = [];
    boss = new Endboss();
    bubbels =[];
    gameOver
    canvas;
    ctx;
    camera_x = 0
    level = level1;
    enemyIntervalID=[];
    bossStage = false
    gameFinished = false
    timeoutFinish;
    inMenu = true;


    /**
     * Constructor for initializing a new instance.
     * @param {Object} canvas - the canvas element for rendering
     * @param {Object} keyboard - the keyboard object for input
     */
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
    }


    /**
     * Set the world for the character.
     */
    setWorld(){
        this.character.world = this;
    }


    /**
     * This function handles the logic for drawing the game based on certain conditions.
     */
    drawGame(){
        if(world){
            if (!this.gameFinished){
                this.resetCanvas();
                if (start_Game && !this.character.isDead && !this.gameFinished && !this.boss.isDead )
                    this.initDrawings();
                if (start_Game && this.character.isDead || start_Game && world.boss.isDead)
                    this.initFinishGame();
            }
            else
                this.initEndIntervals();    
        }
    }


    /**
     * Initializes the drawings by drawing the world and objects.
     */
    initDrawings(){
        this.drawWorld();
        this.drawObjects();
    }


    /**
     * Initializes the end intervals for the game.
     */
    initEndIntervals(){
        clearInterval(this.timeoutFinish);
        if (start_Game)
        start_Game = false
    }


    /**
     * Initializes and finishes the game by drawing the world, objects, and ending the game.
     */
    initFinishGame(){
        this.drawWorld();
        this.drawObjects();
        this.finishGame();
    }


    /**
     * Resets the canvas by clearing it, translating the context, and adding objects to the map.
     */
    resetCanvas(){
        this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        this.addObjectsToMap(this.level.water);
    }


    /**
     * Finish the game if there is no timeout set, by setting a timeout to check win or lose after 2500 milliseconds.
     */
    finishGame(){
        if(!this.timeoutFinish){
            this.timeoutFinish = setTimeout(() => {
                this.checkWinLose();
            }, 2500 );
        }
    }


    /**
     * Check if the player has won or lost the game and update the game status accordingly.
     * @return {void} 
     */
    checkWinLose(){
        this.gameFinished = true;
        if (world.boss.isDead){
            endScreen('win');
        } else {
            endScreen('lose');                  
        }
    }


    /**
     * Draw various objects on the canvas including backgrounds, enemies, character, coins, and status bars.
     */
    drawObjects(){
        this.addObjectsToMap(this.level.farBackground);
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.ground);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.bubbels);
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.boss);
        this.ctx.translate(-this.camera_x,0);
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.poisonbar);
        this.addToMap(this.bossbar);
    }


    /**
     * Initialize the game by setting up the world, generating enemies, checking collisions, and starting the game if conditions are met.
     */
    initGame(){
        this.setWorld();
        this.generateEnemies();
        this.checkCollisions();
        this.startGame = true
        if (this.startGame = true && !this.character.isDead){
            this.drawWorld();    
        }
    }


    /**
     * Draw the world by calling drawGame if the game is not finished.
     */
    drawWorld(){
            let self = this;
            requestAnimationFrame(function(){
                if(!world.gameFinished)
                self.drawGame();
            });  
    }


    /**
     * Add multiple objects to the map.
     * @param {array} objects - The array of objects to add to the map
     */
    addObjectsToMap(objects){
        objects.forEach(o =>{
            this.addToMap(o);
        })
    }


    /**
     * Adds the given object to the map, possibly flipping it horizontally before drawing.
     * @param {Object} mo - the object to add to the map
     */
    addToMap(mo){
        if(mo.otherDirection){
            this.ctx.save();
            this.flipImage(mo);        
        }
        mo.draw(this.ctx);
        if(mo.otherDirection){
            this.flipImageBack(mo)
        }
    }


    /**
     * Moves characters to the right within the game environment. 
     */
    characterSwimRight(){
        this.level.ground.forEach(o => {
            o.moveLeft(2);
        });
        this.level.farBackground.forEach(o => {
            o.moveLeft(1);
        });
        this.level.background.forEach(o => {
            o.moveLeft(1.5);
        });
        this.enemies.forEach(o => {
            o.moveLeft(0.02);
        });
    }


    /**
     * Function for the character to swim left, moving various game elements to the right.
     */
    characterSwimLeft(){
        this.otherDirection = true;
        this.level.ground.forEach(o => {
            o.moveRight(2);
        });
        this.level.background.forEach(o => {
            o.moveRight(1.5);
        });
        this.level.farBackground.forEach(o => {
            o.moveRight(1);
        });
        this.enemies.forEach(o => {
            o.moveRight(0.02);
        });
    }


    /**
     * Flips the image horizontally.
     * @param {type} mo - description of parameter
     * @return {type} description of return value
     */
    flipImage(mo){
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1
    }


    /**
     * Reverses the x coordinate of the given mo object and restores the canvas context.
     * @param {type} mo - description of parameter
     * @return {type} description of return value
     */
    flipImageBack(mo){
        mo.x = mo.x * -1
        this.ctx.restore();
    }


    /**
     * Generates a random number of new enemies and adds them to the enemies array.
     * @param {} - 
     * @return {} 
     */
    generateEnemies(){
            let newEnemies = 5+Math.random()* 2;
            for (let i = 0; i < newEnemies; i++) {
                let generateEnemie = new GreenFish(i,this.character.x);
                this.enemies.push(generateEnemie);
                generateEnemie = new RedFish(i,this.character.x);
                this.enemies.push(generateEnemie);
                generateEnemie = new OrangeFish(i,this.character.x);
                this.enemies.push(generateEnemie);
                generateEnemie = new JellyFish(i,this.character.x);
                this.enemies.push(generateEnemie);
            }
    }


    /**
     * Check collisions between enemies, character, bubbles, and boss in the game world.
     * @param None
     * @return None
     */
    checkCollisions(){
        setInterval(() => {
            this.enemies.forEach(enemy => {
                if (this.bubbels.length != 0)
                    this.checkBubbleCollisions(enemy)
                if(this.character.isColliding(enemy))
                this.checkCharakterCollisions(enemy);
            });    
            if (this.bubbels.length != 0)
                this.checkBubbleCollisions();
            if(this.character.bossStage&& this.boss.bossSequensPlayed)
                this.checkCharakterBossCollision();
        }, 1000/30);
    }


    /**
     * Check for collisions between bubbles and the boss,
     * damage the boss if collision occurs.
     */
    checkBubbleCollisions(enemy){
        this.bubbels.forEach(bubble => {
            if (bubble.isColliding(this.boss)){
                if (this.boss.bossSequensPlayed){
                    this.boss.isHurt=true;
                    this.boss.hitpoints= this.boss.hitpoints-10;
                    bubble.finalyDestroy()
                }
            }
            if (enemy){
                if (bubble.isColliding(enemy)){
                    enemy.isDead=true;
                    bubble.finalyDestroy()
                }
            }
        }); 
    }


    /**
     * Check collision between character and boss, set character status if colliding.
     */
    checkCharakterBossCollision(){
        if(this.character.isColliding(this.boss)){
            this.character.isHurt = true
            this.character.isPoisoned = true
        }
    }


    /**
     * Check for collisions with a character and update character status accordingly.
     * @param {Object} enemy - The enemy object to check collision with
     * @return {void} 
     */
    checkCharakterCollisions(enemy){
        if (enemy instanceof GreenFish|| enemy instanceof RedFish|| enemy instanceof OrangeFish)
        this.character.isPoisoned = true;
        else if (enemy instanceof JellyFish){
            this.character.isShocked = true;
        }
        this.character.isHurt = true;
    }


    /**
     * A function to delay the end screen display.
     */
    endscreenDelay(){
        if(!this.timeoutFinish){
            this.timeoutFinish = setTimeout(() => {
                this.gameFinished = true;
                if (world.boss.isDead){
                    endScreen('win');
                } else 
                    endScreen('lose');  
            }, 2500 );    
        }
    }
}