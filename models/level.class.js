class Level{
    ground;
    background;
    water;
    farBackground;
    coins;
    bottles;

    /**
     * Constructor for setting initial values.
     * @param {type} ground - description of ground parameter
     * @param {type} background - description of background parameter
     * @param {type} water - description of water parameter
     * @param {type} farBackground - description of farBackground parameter
     * @param {type} coins - description of coins parameter
     * @param {type} bottles - description of bottles parameter
     * @return {type} description of return value
     */
    constructor(ground,background,water,farBackground,coins,bottles){
        this.ground = ground;
        this.background = background;
        this.water = water;
        this.farBackground = farBackground;
        this.coins = coins;
        this.bottles = bottles;
    }
}