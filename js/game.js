let canvas;
let ctx;
let keyboard = new Keyboard();
let world;
let firstTimer;
let secondTimer;
let sound;
let mute = true;
let start_Game
let fullscreen = false;
let game_sound = new Audio('audio/586095__slaking_97__free-music-background-loop-003-var-02.wav');
let menu_sound = new Audio('audio/586098__slaking_97__free-music-background-loop-003-var-05.wav');
let win_sound =  new Audio('audio/586096__slaking_97__free-music-background-loop-003-var-03.wav');
let lose_sound = new Audio('audio/586099__slaking_97__free-music-background-loop-003-var-06.wav');
let bossDead_sound = new Audio('audio/590787__mrfossy__sfx_whooshykorn_slayer_24.wav');
let bossStage_sound = new Audio('audio/267245__klankbeeld__wave-hydrophone-001.wav');
let bossHit_sound = new Audio('audio/590787__mrfossy__sfx_whooshykorn_slayer_24.wav');
let enemyHit_sound = new Audio('audio/590877__mrfossy__sfx_whooshykorn_slayer_114.wav');
let collectCoin_sound = new Audio('audio/590874__mrfossy__sfx_whooshykorn_slayer_111.wav');
let collectBottle_sound = new Audio('audio/590764__mrfossy__sfx_whooshykorn_slayer_01.wav');
let damageSound = new Audio('audio/590876__mrfossy__sfx_whooshykorn_slayer_113.wav');
let shockedSound = new Audio('audio/512471__michael_grinnell__electric-zap.wav');
let attack_Sound = new Audio('audio/590877__mrfossy__sfx_whooshykorn_slayer_114.wav');
let swim_sound = new Audio('audio/underwater-movement-whoosh-1-186898.mp3');


window.addEventListener("keydown", (event) => {
    updateInput(event, true);
});


window.addEventListener("keyup", (event) => {
    updateInput(event, false);
});


/**
 * Update the input based on the event and value.
 * @param {Event} event - the event that triggered the input update
 * @param {any} value - the new value for the input
 */
function updateInput(event, value) {
    let direction;
    if(start_Game)
        checkKeys(direction,event, value);
}


/**
 * Check keys to determine the direction and update the keyboard object accordingly.
 * @param {string} direction - the current direction
 * @param {object} event - the event object
 * @param {boolean} value - the value to update the keyboard object
 */
function checkKeys(direction,event, value){
    if (event.target.id === 'leftButton'|| event.key === 'a' || event.key === 'ArrowLeft') 
        direction = "LEFT";
    if (event.target.id === 'rightButton' || event.key === 'd' || event.key === 'ArrowRight') 
        direction = "RIGHT";
    if (event.target.id === 'upButton' || event.key === 'w' || event.key === 'ArrowUp') 
        direction = "UP";
    if (event.target.id === 'downButton'|| event.key === 's' || event.key === 'ArrowDown') 
        direction = "DOWN";
    if (event.target.id === 'slapButton' || event.key === " ")
        direction = "SLAP";
    if (event.target.id === 'bubbleButton' || event.key === 'f')  
        direction = "BUBBLE";
    if (direction)
        keyboard[direction] = value;
}


/**
 * Initializes the canvas, world, and background sound for the game.
 */
function init() {    
    canvas = document.getElementById('canvas');
    world = new World(canvas,keyboard);
    playBackGroundSound();
}


/**
 * A function that shows controls by getting left and right DOM elements, hiding options, and animating the controls window.
 */
function showControls(){
    let left = document.getElementById('keys_left');
    let right = document.getElementById('keys_right');
    hideOptions();
    animateControlsWindow(left,right)
}


/**
 * Animates the controls window by adding and removing CSS classes for left and right elements
 * @param {Element} left - The left element to animate
 * @param {Element} right - The right element to animate
 * @return {void} This function does not return anything
 */
function animateControlsWindow(left,right){
    left.classList.remove('d_none');
    right.classList.remove('d_none');
    document.getElementById('close').classList.remove('d_none');
    setTimeout(() => { 
        right.classList.add('rightMove');
        left.classList.add('leftMove');
        openKeyDiv(left,right);
    }, 100);
}


/**
 * Sets the 'optionsFullSize' class on the left and right elements after a delay of 500ms, 
 * removes the 'pulse' class from both elements, and then calls the showKeys function.
 * @param {type} left - description of left parameter
 * @param {type} right - description of right parameter
 * @return {type} description of return value
 */
function openKeyDiv(left,right){
    setTimeout(() => { 
        right.classList.add('optionsFullSize');
        left.classList.add('optionsFullSize');
        right.classList.remove('pulse');
        left.classList.remove('pulse');
        showKeys();
    }, 500);    
}


/**
 * Hides keys and initiates a hide key animation after a delay.
 */
function hideKeys(){
    document.getElementById('close').setAttribute('onclick','');
    let left = document.getElementById('keys_left');
    let right = document.getElementById('keys_right');
    document.getElementById('move_keys_secondary_right').classList.add('d_none');
    document.getElementById('move_keys_secondary_left').classList.add('d_none');
    document.getElementById('move_keys_left').classList.add('d_none');
    document.getElementById('move_keys_right').classList.add('d_none');
    document.getElementById('move_keys_right_img').classList.add('d_none');
    document.getElementById('move_keys_left_img').classList.add('d_none');
    setTimeout(() => { 
        hideKeyAnimation(left,right)
    }, 500); 
}


/**
 * Hides the key animation by removing classes and adding pulse effect, then sets a timeout to hide the left and right elements and the close element, and finally calls the showOptions function.
 * @param {type} left - description of parameter
 * @param {type} right - description of parameter
 * @return {type} description of return value
 */
function hideKeyAnimation(left,right){
    right.classList.remove('optionsFullSize');
    left.classList.remove('optionsFullSize');
    right.classList.add('pulse');
    left.classList.add('pulse');
    setTimeout(() => {
        left.classList.add('d_none');
        right.classList.add('d_none');
        document.getElementById('close').classList.add('d_none');
        showOptions();
    }, 1000);
}


/**
 * Sets a timeout to show certain HTML elements after 1 second.
 * @param {} - No parameters
 * @return {} - No return value
 */
function showKeys(){
    setTimeout(() => { 
        document.getElementById('move_keys_secondary_right').classList.remove('d_none');
        document.getElementById('move_keys_secondary_left').classList.remove('d_none');
        document.getElementById('move_keys_left').classList.remove('d_none');
        document.getElementById('move_keys_right').classList.remove('d_none');
        document.getElementById('move_keys_right_img').classList.remove('d_none');
        document.getElementById('move_keys_left_img').classList.remove('d_none');
        document.getElementById('close').setAttribute('onclick','hideKeys()');
    }, 1000);
}


/**
 * Function to start the game if the world exists.
 */
function startGame(){
    if (world){
        document.getElementById('backToMenu').classList.remove('d_none');
        hideOptions(); 
        start_Game = true  
        world.drawGame()
        world.initGame();
    }
}


/**
 * Reset the world by initializing characters, bosses, bars, enemies, bubbles, canvas, context, camera, level, helper, and show options while muting all sounds.
 */
function resetWorld(){
    var highestIntervalId = setInterval(";");
    for (var i = 0 ; i < highestIntervalId ; i++) {
        clearInterval(i); 
    }      
    sound = undefined;
    start_Game = false;                
    level1 =level1Builder();
    showOptions();
    muteAllSounds();
    init();
}


/**
 * Refreshes the bars displaying different character attributes.
 */
function refreshBars(){
    world.coinbar.setPercentage(this.character.coins);
    world.statusbar.setPercentage(this.character.hitpoints);
    world.poisonbar.setPercentage(this.character.poisonEnergy);
}


/**
 * Hides the options for play, controls, and help.
 */
function hideOptions(){
    document.getElementById('play').classList.add('d_none');
    document.getElementById('controls').classList.add('d_none');
    document.getElementById('imprint').classList.add('d_none');
    document.getElementById('privacy').classList.add('d_none');
}


/**
 * Function to show options in the UI.
 */
function showOptions(){
    document.getElementById('play').classList.remove('d_none');
    document.getElementById('controls').classList.remove('d_none');
    document.getElementById('imprint').classList.remove('d_none');
    document.getElementById('privacy').classList.remove('d_none');
    document.getElementById('endGame').classList.add('d_none');
    document.getElementById('endScreen').classList.add('d_none');
    document.getElementById('backToMenu').classList.add('d_none');
    document.getElementById('endGame').classList.remove('win_Position');
    document.getElementById('endScreen').classList.remove('scaleImg');
}


/**
 * A function that displays the end screen based on the provided option.
 * @param {type} option - the option to determine the end screen content
 * @return {type} void
 */
function endScreen(option){
    document.getElementById('endScreen').classList.remove('d_none');
    if (world.boss.isDead){
        document.getElementById('endScreen').setAttribute('src',`./img/${option}.png`);
        document.getElementById('endGame').classList.remove('d_none');
        document.getElementById('endGame').classList.add('win_Position')
    } else {
        document.getElementById('endScreen').setAttribute('src',`./img/${option}.png`);
        document.getElementById('endScreen').classList.add('scaleImg');
        document.getElementById('endGame').classList.remove('d_none');
    }
}


/**
 * Plays a background sound at regular intervals, if sound is not currently playing.
 * @return {undefined} 
 */
function playBackGroundSound(){
    if(!sound){
        sound = setInterval(() => {
            if(!mute){
                if (!world.gameFinished)
                    playStandartSounds();
                else 
                    playWinLoseSounds();
            }
            else
                muteAllSounds();
        }, 100);    
    }
}


/**
 * Plays win or lose sounds based on game state.
 * @param {none} - No parameters
 * @return {none} - No return value
 */
function playWinLoseSounds(){
    if(world.gameFinished && world.boss.isDead){
        win_sound.play();
        game_sound.pause();
    }else {
        lose_sound.play();
        game_sound.pause();
    }
}


/**
 * Plays standard sounds based on the game state.
 */
function playStandartSounds(){
    if (!start_Game){
        menu_sound.play();
        game_sound.pause();
        win_sound.pause();
        lose_sound.pause();        
    }
    if (start_Game){
        game_sound.play();
        menu_sound.pause();
    }
}


/**
 * Toggles the mute state and updates the mute icon on the webpage.
 * @param {void}
 * @return {void}
 */
function toggleMute(){
    let imgID = document.getElementById('mute');
    if (!mute)
        imgID.src = "img/mute-6694067.svg";
    if (mute)
        imgID.src = "img/audio-on-6694070.svg";
    mute = !mute
}


/**
 * Toggles the fullscreen class for specified elements.
 * @param {string} id - The id of the element to toggle fullscreen class
 * @return {void} 
 */
function toggleScreensize() {
    let elemente = ['canvas', 'content', 'hud', 'options'];
    elemente.forEach(function(id) {
        let element = document.getElementById(id);
        if (element) {
            element.classList.toggle('fullscreen');
        }
    });
}


/**
 * Function to change the image displayed on the screen.
 * @param None
 * @return None
 */
function changeImg(){
    if(fullscreen){
        document.getElementById('screen').setAttribute('src','img/arrows-2816042.svg')
        fullscreen = false
    }
    else{
        document.getElementById('screen').setAttribute('src','img/recycle-159650.svg')
        fullscreen = true
    }
}


/**
 * Mutes all the sounds in the world.
 */
function muteAllSounds(){
    menu_sound.pause();
    game_sound.pause();
    win_sound.pause();
    lose_sound.pause();
    menu_sound.currentTime = 0;
    game_sound.currentTime = 0;
    win_sound.currentTime = 0;
    lose_sound.currentTime = 0;
}