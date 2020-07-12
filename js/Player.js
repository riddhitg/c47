class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank=null;
    this.x = 0;
    this.y = 0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count,
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      x: 200,
      y:this.y
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }

  static getPlayersAtEnd(){
    database.ref('playersAtEnd').on("value", (data)=>{
      this.rank=data.val();
    })
  }

  static updatePlayersAtEnd(rank){
    database.ref('/').update({
      playersAtEnd:rank
    })
  }
}
