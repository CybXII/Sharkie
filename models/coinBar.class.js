class Coinbar extends Drawable{
    percentage = 100
    x = 0;
    y = 26;

    Images =[
        'img/4. Marcadores/Purple/0_ _1.png',
        'img/4. Marcadores/Purple/20_ .png',
        'img/4. Marcadores/Purple/40_ _1.png',
        'img/4. Marcadores/Purple/60_ _1.png',
        'img/4. Marcadores/Purple/80_ _1.png',
        'img/4. Marcadores/Purple/100__1.png',
    ];

    
    /**
     * A description of the entire function.
     */
    constructor(){
        super();
        this.loadImages(this.Images);
        this.setPercentage(50);
    }


    /**
     * Set the percentage and update the image accordingly.
     * @param {type} percentage - the new percentage to set
     * @return {type} undefined
     */
    setPercentage(percentage){
        this.percentage = percentage
        let path = this.Images[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }


    /**
     * Resolve the image index based on the percentage value.
     * @return {number} The image index determined by the percentage value.
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
