var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var players, player1, player2;
var track, Steve_img;

var fox_image, cactus_image;

var obstacle1, obstacle2, obstacle3, obstacle4

function preload(){
  track=loadImage("track.jpg");
  Steve_img=loadImage("Steve.png");
  fox_img=loadImage("Fox.png");
  cactus_img=loadImage("Cactus.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end();
  }
}
