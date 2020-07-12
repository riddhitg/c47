class Game {
  constructor(){

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

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.addImage("player1",Steve_img);
    player1.scale=0.5;
    player2 = createSprite(300,200);
    player2.addImage("player2",Steve_img);
    player2.scale=0.5;
    
    players = [player1, player2];
    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    Player.getPlayersAtEnd();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#c68767");
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);

     obstacle1 = createSprite(650,displayHeight-600);
     obstacle1.addImage("fox", fox_img);
     obstacle2 = createSprite(1250,displayHeight-600);
     obstacle2.addImage("fox", fox_img); 
     obstacle3 = createSprite(650,displayHeight-1500);
     obstacle3.addImage("cactus", cactus_img);
     obstacle4 = createSprite(1250,displayHeight-1500);
     obstacle4.addImage("cactus", cactus_img);

     obstacle1.scale=1.5;
     obstacle2.scale=1.5;
     obstacle3.scale=0.7;
     obstacle4.scale=0.7;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 550;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=100;
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance = player.distance-100;
      player.update();
    }
    
    if(player.distance>5010){
      gameState=2;
      Player.rank+=1;
      Player.updatePlayersAtEnd(Player.rank)
    }

    drawSprites();
  }
  end(){
    console.log("game ended");
    //game.update(2);
    console.log(Player.rank)
  }
}
