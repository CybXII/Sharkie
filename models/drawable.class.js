class Drawable{
    imageCache = {};
    img;    
    x = 0;
    y = 0;
    height= 50;
    width= 150;

    Images_IDLE =[
        'img/1.Sharkie/1.IDLE/1.png',
        'img/1.Sharkie/1.IDLE/2.png',
        'img/1.Sharkie/1.IDLE/3.png',
        'img/1.Sharkie/1.IDLE/4.png',
        'img/1.Sharkie/1.IDLE/5.png',
        'img/1.Sharkie/1.IDLE/6.png',
        'img/1.Sharkie/1.IDLE/7.png',
        'img/1.Sharkie/1.IDLE/8.png',
        'img/1.Sharkie/1.IDLE/9.png',
        'img/1.Sharkie/1.IDLE/10.png',
        'img/1.Sharkie/1.IDLE/11.png',
        'img/1.Sharkie/1.IDLE/12.png',
        'img/1.Sharkie/1.IDLE/13.png',
        'img/1.Sharkie/1.IDLE/14.png',
        'img/1.Sharkie/1.IDLE/15.png',
        'img/1.Sharkie/1.IDLE/16.png',
        'img/1.Sharkie/1.IDLE/17.png',
        'img/1.Sharkie/1.IDLE/18.png'
    ];

    Images_Swim =[
        'img/1.Sharkie/3.Swim/1.png',
        'img/1.Sharkie/3.Swim/2.png',
        'img/1.Sharkie/3.Swim/3.png',
        'img/1.Sharkie/3.Swim/4.png',
        'img/1.Sharkie/3.Swim/5.png',
        'img/1.Sharkie/3.Swim/6.png',
    ];

    Images_Slap =[
        'img/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/1.Sharkie/4.Attack/Fin slap/8.png',
    ];

    Images_Poison =[
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png',
    ];

    Images_Standart_attack =[
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
        'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png',
    ];

    Images_Poison_Hurt =[
        'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
    ];

    Images_Shocked_Hurt =[
        'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
        'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
    ];

    Images_Dead_Shocked =[
        'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
        'img/1.Sharkie/6.dead/2.Electro_shock/10.png',
    ];

    Images_Dead_Standard =[
        'img/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/1.Sharkie/6.dead/1.Poisoned/2.png',
        'img/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/1.Sharkie/6.dead/1.Poisoned/10.png',
    ];


    /**
     * Draws an image on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - the 2D rendering context of the canvas
     */
    draw(ctx){
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }


    /**
     * Load an image from the given path.
     * @param {string} path - the path of the image
     */
    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Load images from an array of paths into the image cache.
     * @param {Array} arr - An array of image paths to load
     */
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draw a frame on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on
     * @return {void} 
     */
    drawFrame(ctx){
        if(this.frameObjects()){
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            // ctx.rect(this.x+20,this.y+185,this.width-45,this.height-260); Offset adjustmend helper
            ctx.rect(this.x+this.offsetX,this.y+this.offsetY,this.width-this.offsetXMinus,this.height-this.offsetYMinus);
            ctx.stroke();    
        }
    }


    /**
     * Checks if the object is an instance of certain classes.
     * @return {boolean} true if the object is an instance of certain classes, false otherwise
     */
    frameObjects(){
        return this instanceof Character || this instanceof Bubble|| this instanceof Endboss|| this instanceof GreenFish ||this instanceof RedFish|| this instanceof OrangeFish;
    }


    /**
     * Check if the current object is colliding with another object.
     * @param {Object} obj - The object to check collision with
     * @return {boolean} True if colliding, false otherwise
     */
    isColliding(obj) {
        if(this.collisionObjects()){
            let x = this.x+this.offsetX;
            let width = this.width-this.offsetXMinus;
            let y = this.y+this.offsetY;
            let height = this.height-this.offsetYMinus
            return (x + width) >= obj.x+obj.offsetX && x <= (obj.x + obj.width-obj.offsetXMinus) && 
            (y + height) >= obj.y+obj.offsetY &&
            (y) <= (obj.y+obj.offsetY + obj.height-obj.offsetYMinus)
        }
    }


    /**
     * A function to handle the dead animation with the given deadImages.
     * @param {type} deadImages - Description of the deadImages parameter
     * @return {type} Description of the return value
     */
    deadAnimation(deadImages){
            this.speed = 0;
            if (this.checkDeadPlayAnimation())
                this.checkDeadImg(deadImages);
            if(this.enemyLastDeadImg()){
                this.currentImage = 0;
                this.deadPlayed = true;
                this.playAnimation(deadImages);
            }else if (!this.deadPlayed)
                this.playAnimation(deadImages);
    }


    /**
     * Checks if the current image index is beyond the length of deadImages and if the dead animation has been played. 
     * Sets the current image index based on the instance type of the object: JellyFish, Endboss, or Character. 
     * Calls setDeadObject method and plays the animation using deadImages.
     */
    checkDeadImg(deadImages){
        if (this.currentImage >= deadImages.length && this.deadPlayed){
            if (this instanceof JellyFish)
                this.currentImage = 0;
            else{
                if (this instanceof Endboss||this instanceof Character)
                    this.currentImage = deadImages.length-1;
                else
                    this.currentImage = deadImages.length;
            }
            this.setDeadObject();
        }    
        this.playAnimation(deadImages);
    }


    /**
     * A function that handles the hurt animation for a character or endboss.
     * @param {array} hurtImages - An array of images for the hurt animation.
     * @param {number} playtime - The duration of the animation playtime.
     */
    hurtAnimation(hurtImages,playtime){
        if (this instanceof Character){
            this.resetAttack();
        }
        if (this instanceof Endboss){
            this.speed = this.speed + 0.1;
        }
        if(this.currentImage>hurtImages.length*playtime){
            this.currentImage = 0;
        }
        this.playAnimation(hurtImages)
        this.checkCharHurt(hurtImages);
    }


        /**
     * A function that performs character animations based on whether the character is poisoned or not.
     * @param {array} hurtImages - An array of images for the character when hurt
     */
    charAnimations(hurtImages){
        if (this.isPoisoned){
            if(!mute)
                damageSound.play();
            if (this.currentImage == hurtImages.length){
                this.stopHurtChecker();
            }   
        } else {
            if(!mute)
                shockedSound.play();
            if (this.currentImage == hurtImages.length*3){
                this.stopHurtChecker();
            }
        }
    }


        /**
     * A description of the entire function.
     * @return {type} description of return value
     */
    bubble(){
        return this.bubbleActive && !this.attackAnimationEnd;
    }


    /**
     * Check if the slap is active and the attack animation has not ended.
     * @return {boolean} true if the slap is active and the attack animation has not ended, otherwise false
     */
    slap(){
        return this.slapActive && !this.attackAnimationEnd;
    }


    /**
     * sharkieIdle function checks if attack animation has ended and slap is not active. 
     * @return {boolean} True if attack animation has ended and slap is not active, false otherwise.
     */
    sharkieIdle(){
        return this.attackAnimationEnd && !this.slapActive;
    }


    /**
     * A description of the entire function.
     * @return {boolean} The result of the swim animation check.
     */
    swimAnimation(){
        return this.keyChecker.RIGHT ||this.keyChecker.LEFT ||this.keyChecker.DOWN ||this.keyChecker.UP&& this.attackAnimationEnd && !this.slapActive &&!this.bubbleActive;
    }


    /**
     *Applies move action to the object.
     * @return {boolean} For move action enabled or not.
     */
    down(){
        return this.keyChecker.DOWN&&this.attackAnimationEnd;
    }


    /**
     *Applies move action to the object.
     * @return {boolean} For move action enabled or not.
     */
    up(){
        return this.keyChecker.UP&&this.attackAnimationEnd;
    }


    /**
     *Applies move action to the object.
     * @return {boolean} For move action enabled or not.
     */

    left(){
        return this.keyChecker.LEFT&&this.attackAnimationEnd;
    }


    /**
     *Applies move action to the object.
     * @return {boolean} For move action enabled or not.
     */

    right(){
        return this.keyChecker.RIGHT&&this.attackAnimationEnd;
    }


    /**
     *Applies move action to the object.
     * @return {boolean} For move action enabled or not.
     */
    sink(){
        return !this.keyChecker.RIGHT ||!this.keyChecker.LEFT ||!this.keyChecker.DOWN ||!this.keyChecker.UP
    }
}
