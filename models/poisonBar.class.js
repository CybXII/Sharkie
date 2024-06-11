class Poisonbar extends Drawable{
    percentage = 100
    x = 0;
    y = 60;

    Images =[
        'img/4. Marcadores/Purple/0_.png',
        'img/4. Marcadores/Purple/20_.png',
        'img/4. Marcadores/Purple/40_.png',
        'img/4. Marcadores/Purple/60_.png',
        'img/4. Marcadores/Purple/80_.png',
        'img/4. Marcadores/Purple/100_.png',
    ];


    /**
     * Constructor for initializing the object.
     *
     */
    constructor(){
        super();
        this.loadImages(this.Images);
        this.setPercentage(0);
    }


    /**
     * Set the percentage value and update the displayed image accordingly.
     * @param {number} percentage - The new percentage value to set
     */
    setPercentage(percentage){
        this.percentage = percentage
        let path = this.Images[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }


    /**
     * A function to determine the image index based on the percentage value.
     * @return {number} The calculated image index.
     */
    resolveImageIndex(){
        if(this.percentage ==100 )
            return 5
        if(this.percentage<100 && this.percentage >=80 )
            return 4
        if(this.percentage<80 && this.percentage >=60 )
            return 3
        if(this.percentage<60 && this.percentage >=40 )
            return 2
        if(this.percentage<40 && this.percentage >0 )
            return 1
        if(this.percentage <=0 )
            return 0
    }
}
