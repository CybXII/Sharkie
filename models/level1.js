let level1= level1Builder()


function level1Builder(){
    return new Level ([
        new Ground('img/3. Background/Layers/2. Floor/D1.png', 0, 0, 480, 1000),
        new Ground('img/3. Background/Layers/2. Floor/D2.png', 998, 0, 480, 1000),
        new Ground('img/3. Background/Layers/2. Floor/D1.png', 998 * 2, 0, 480, 1000),
        new Ground('img/3. Background/Layers/2. Floor/D2.png', 998 * 3, 0, 480, 1000),
    ],

    [
        new Background('img/3. Background/Layers/3.Fondo 1/D1.png', 0, 0, 480, 1000 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D2.png', 998, 0, 480, 1000 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D1.png', 998 * 2, 0, 480, 1000 ),
        new Background('img/3. Background/Layers/3.Fondo 1/D2.png', 998 * 3, 0, 480, 1000 ),
    ],

    [
        new Water('img/3. Background/Layers/5. Water/D1.png', 0,0,480,1000,1 ),
        new Water('img/3. Background/Layers/5. Water/D2.png',  998, 0, 480,1000 ,1),
        new Water('img/3. Background/Layers/5. Water/D1.png', 998*2,0,480,1000,1 ),
        new Water('img/3. Background/Layers/5. Water/D2.png',  998*3, 0, 480,1000 ,1),
    ],

    [
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D1.png', -500, 0, 480, 1000 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D2.png', 498, 0, 480, 1000 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D1.png', 498+998, 0, 480, 1000 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D2.png', 498+998 * 2, 0, 480, 1000 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D1.png', 498+998 * 2, 0, 480, 1000 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D2.png', 498+998 * 3, 0, 480, 1000 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D1.png', 498+998 * 3, 0, 480, 1000 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D2.png', 498+998 * 4, 0, 480, 1000 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D1.png', 498+998 * 4, 0, 480, 1000 ),
        new FarBackground('img/3. Background/Layers/4.Fondo 2/D2.png', 498+998 * 5, 0, 480, 1000 ),
    ] ,

    [
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
        new Coins('img/4. Marcadores/1. Coins/1.png',700+Math.random()*2000,Math.random()*450),
    ],

    [
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
        new Bottles('img/4. Marcadores/Posión/Animada/1.png',700+Math.random()*2000,Math.random()*450),
    ],)
}