class MoveableObject extends Drawable{
    speed = 0.15;
    speedY = 0;
    acceleration = 1
    intervalId;
    distance;
    destroyed= false;
    destroy = false;
    offsetY;
    offsetX;
    offsetXMinus;
    offsetYMinus;
    swimRight;
    swimLeft;
    swimUp;
    swimDown;
    isDead = false;
    isHurt = false;
    deadPlayed;
    isAttacking = false;
    isBubbeld;
    hitpoints = 100;
    poisonEnergy = 0;
    coins = 50;
    attackDelayActive = false


    /**
     * Plays the animation using the provided images.
     * @param {array} Images - array of image paths
     */
    playAnimation(Images){
        let i = this.currentImage % Images.length
        let path = Images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Move the object to the right based on the given speed.
     *
     * @param {number} speed - The speed at which the object should move to the right.
     * @return {void} 
     */
    moveRight(speed) {
        this.x = this.x + speed;
    }


    /**
     * Moves the object up by the specified speed.
     * @param {number} speed - the speed at which to move the object up
     * @return {void} 
     */
    moveUp(speed){
        this.y = this.y - speed;
    }


    /**
     * Move the object down by a certain speed.
     * @param {number} speed - the speed at which to move down
     * @return {void} 
     */
    moveDown(speed) {
        this.y = this.y + speed;
    }


    /**
     * Moves the object to the left by the specified speed.
     * @param {number} speed - The speed at which to move the object to the left.
     */
    moveLeft(speed){
        this.x -= speed;
    }


    /**
     * A function that applies air to the object's movement by decreasing the y position and increasing the vertical speed over time.
     */
    applyAir(){
        setInterval(()=> {
            this.y -= this.speedY;
            this.speedY += this.acceleration;
        },80);
    }


    /**
     * A function that moves the object to the left at a specified speed.
     * @param {number} speed - the speed at which the object moves to the left
     */
    movementLeft(speed){
        setInterval(() =>{
            if (this.swimLeft)
                this.x -= speed;
        }, 1000/35)
    }


    /**
     * A function that moves an object to the right at a given speed.
     * @param {type} speed - the speed at which the object moves to the right
     * @return {type} 
     */
    movementRight(speed){
        setInterval(() =>{
            if (this.swimRight)
                this.x += speed;
        }, 1000/35)
    }


    /**
     * A function that moves an object up at a given speed.
     * @param {number} speed - the speed at which the object moves up
     */
    movementUp(speed){
        setInterval(() =>{
            if (this.swimUp)
                this.y -= speed;
        }, 1000/35)
    }


    /**
     * A function that handles movement down based on the given speed.
     * @param {type} speed - the speed at which to move down
     * @return {type} undefined
     */
    movementDown(speed){
        setInterval(() =>{
            if (this.swimDown)
                this.y += speed;
        }, 1000/35)
    }


    /**
     * Calculate the distance between the object and the character, and check if the object should be destroyed.
     */
    destroyObject(){
        this.distance = this.x - world.character.x
        if(this.x <=this.endpoint|| this.y <= -500){
            if (this.destroyableObject()){
                    this.finalyDestroy(this.intervalId);
            }
        }
    }


    /**
     * Check if the item is destroyable and perform destruction if necessary.
     * @param {array} items - The list of items to check for destroyable items.
     * @return {void} 
     */
    checkDestroyAbleItems(items){
        let found = items.find((element) => element.id == this.id);
        if (found){
            this.destroyDestroyAble(items);     
        }
    }


    /**
     * A method that checks if the instance is Coins, Bottles, or Bubble and destroys the destroyable items accordingly.
     */
    finalyDestroy(){
        if (this instanceof Coins)
            this.checkDestroyAbleItems(world.level.coins);
        if (this instanceof Bottles)
            this.checkDestroyAbleItems(world.level.bottles);
        if (this instanceof Bubble)
            this.checkDestroyAbleItems(world.bubbels);
        else {
            let found = world.enemies.find((element) => element.intervalId == this.intervalId);
            if (found){
                this.destroyDestroyAble(world.enemies);
            }        
        }
    }


    /**
     * Destroy the destroyable object and clear the interval.
     * @param {object} object - the object to be destroyed
     * @return {void} 
     */
    destroyDestroyAble(object){
        let isID = (element) => element.intervalId == this.intervalId;
        object.splice(`${object.findIndex(isID)}`,1)
        this.destroy = true;
        clearInterval(this.intervalId);
        this.intervalId= null;        
    }


    /**
     * A function to check the character's hurt images and trigger the appropriate animations.
     * @param {type} hurtImages - description of the hurt images
     * @return {type} 
     */
    checkCharHurt(hurtImages){
        if (this instanceof Character){
            this.charAnimations(hurtImages);
        }
        if (this instanceof Endboss){
            this.bossAnimations(hurtImages);
        }
    }


    /**
     * A description of the entire function.
     */
    bossAnimations(hurtImages){
        if (this.currentImage == hurtImages.length){
            if(!mute)
                bossHit_sound.play();
            this.stopHurtChecker();
        }
    }


    /**
     * Resets the attack status flags and variables.
     */
    resetAttack(){
        this.bubbleActive = false ;
        this.isAttacking = false;
        this.attackAnimationEnd = true
        this.slapActive = false ;
    }


    /**
     * Stop the hurt checker and reset hurt, poisoned, and shocked status.
     */
    stopHurtChecker(){
        this.isHurt = false
        this.isPoisoned = false
        this.isShocked = false
        if (this instanceof Character){
            world.enemies.forEach(element => {
                if (this.isColliding(element)){
                    this.isHurt = true;
                    if (element instanceof JellyFish)
                    this.isShocked = true;
                    else
                    this.isPoisoned = true
                }
            });    
        }
    }


    /**
     * Set a delay for the attack mechanism.
     */
    setDelay(){
        this.attackDelayActive = true
        setTimeout(() => {
            this.attackDelayActive = false
        }, 1000);
    }


    /**
     * Check if the boss is dead.
     *
     * @return {boolean} true if the boss is dead, false otherwise
     */
    checkBossDeath(){
        return this instanceof Endboss && !this.deadPlayed && this.currentImage >= this.Images_Dead.length;
    }


    /**
     * Sets the dead object and schedules final destruction for certain types of fish.
     */
    setDeadObject(){
        this.deadPlayed = true;
        if (this instanceof JellyFish||this instanceof GreenFish || this instanceof RedFish || this instanceof OrangeFish)
            setTimeout(() => {this.finalyDestroy();}, 2500);
    }


    /**
     * A function to check if the object is out of the field boundaries.
     */
    outOfFieldChecker(){
            if (this.x<-1000||this.y<-1000||this.y>1000 || this.x >20000){
                this.finalyDestroy();
            }
    }


    /**
     * Check if the current object is an instance of Coins, Bottles, JellyFish, Character, Bubble, GreenFish, RedFish, Boss, or OrangeFish.
     *
     * @return {boolean} true if the current object is an instance of any of the specified classes, false otherwise
     */
    collisionObjects(){
        return this instanceof Coins||this instanceof Bottles||this instanceof JellyFish|| this instanceof Character || this instanceof Bubble || this instanceof GreenFish || this instanceof RedFish || this instanceof Boss || this instanceof OrangeFish;
    }


    /**
     * Generates the enemy's last dead image.
     *
     * @return {boolean} true if the enemy's last dead image should be generated, false otherwise
     */
    enemyLastDeadImg(){
        return this instanceof Character && !this.deadPlayed || this instanceof Endboss && !this.deadPlayed || this instanceof JellyFish && !this.deadPlayed || this instanceof RedFish && !this.deadPlayed || this instanceof GreenFish&& !this.deadPlayed || this instanceof OrangeFish && !this.deadPlayed;
    }


    /**
     * Check if the character or endboss is dead and needs to play the death animation.
     *
     * @return {boolean} Boolean indicating if the death animation needs to be played.
     */
    checkDeadPlayAnimation(){
        return this instanceof Character && this.deadPlayed|| this instanceof Endboss && this.deadPlayed ||this instanceof JellyFish && this.deadPlayed ||this instanceof RedFish && this.deadPlayed || this instanceof GreenFish && this.deadPlayed || this instanceof OrangeFish && this.deadPlayed;
    }


    /**
     * Check if the object is a destroyable object.
     *
     * @return {boolean} true if the object is a destroyable object, false otherwise
     */
    destroyableObject(){
        return this instanceof JellyFish || this instanceof GreenFish || this instanceof RedFish || this instanceof OrangeFish || this instanceof Bubble || this instanceof Coins|| this instanceof Bottles;
    }


    /**
     * A description of the entire function.
     * @return {type} description of return value
     */
    startSlap(){
        return this.keyChecker.SLAP && !this.slapActive;
    }


    /**
     * This function checks if the BUBBLE key is present and the bubble is not active.
     * @return {boolean} true if BUBBLE key is present and bubble is not active, false otherwise
     */
    startBubble(){
        return this.keyChecker.BUBBLE && !this.bubbleActive;
    }
}