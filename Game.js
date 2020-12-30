 class Game {
  constructor(){
    this.reset=createButton('Reset')
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
  reset_car_end(value)
  {
    database.ref('/').update({
      CarsAtEnd: value
    });
  }

  async start(){
    if(gameState === 0){
      background(ground)
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();

      this.reset.mousePressed(()=>{
        player.updateCount(0);
        game.update(0)
        game.reset_car_end(0)
        
       
      })
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_i)
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_i)
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_i)
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_i)
    cars = [car1, car2, car3, car4];
  }

  play(){
   form.hide();

    Player.getPlayerInfo();
    player.getCarsAtEnd();
    this.reset.position(displayWidth-100,20);
    
    if(allPlayers !== undefined){
      background("skyblue")
      
      //var display_position = 100;
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        /*y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;*/
        y = displayHeight - allPlayers[plr].distance;
        x=displayWidth - allPlayers[plr].xwastaken - index*200;
       cars[index-1].x =x;
       cars[index-1].y = y;
       car1.bounce(car2)
       car2.bounce(car3)
       car3.bounce(car4)
       car2.bounce(car4)
       car1.bounce(car3)
       car2.bounce(car1)
       car1.bounce(car4)
       car3.bounce(car2)
       car4.bounce(car3)

        if (index === player.index){
          stroke (10);
          fill ("pink");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    /*if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }*/
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.xwastaken += 5
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.xwastaken -=5
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if (player.distance<0){
      player.distance=40
    }
    if (player.xwastaken< -700){
      player.xwastaken= -660
    }
    if (player.xwastaken>700 ){
      player.xwastaken= 700-40
    }
    if(player.distance>3860){
      gameState=2;
      player.rank+=1
      Player.updateCarsAtEnd(player.rank)
    }

    drawSprites();
  }
  end(){
    console.log("END");
    console.log(player.rank);
  }
}
