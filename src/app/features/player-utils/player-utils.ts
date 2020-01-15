import {mapElement} from "../../core/models/interfaces/game-map.interface";
import {gameDataInterface, player, singleMove, tileCoordinates} from "../../core/models/interfaces/game-data.interface";
import {playerMovesEnum} from "../../core/models/enums/player-moves.enum";
import {mapElementsEnum} from "../../core/models/enums/map-elements.enum";
import {gameSessionInterface} from "../../core/models/interfaces/game-session.interface";
import {directionsEnum} from "../../core/models/enums/directionsEnum";

export class PlayerUtils {

  static getFuturePlayerPosition(player:player): tileCoordinates {
    if (player.direction === directionsEnum.NORTH) {
      return {x:player.positionX,y:player.positionY + 1};
    }
    if (player.direction === directionsEnum.SOUTH) {
      return {x:player.positionX,y:player.positionY -1};
    }
    if (player.direction === directionsEnum.WEST) {
      return {x:player.positionX+1,y:player.positionY};
    }
    if (player.direction === directionsEnum.NORTH) {
      return {x:player.positionX-1,y:player.positionY};
    }
  }

  static turnNorth(player:player ,playerMove: string): player{
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.WEST
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.EAST
    }
    return player;
  }
  static turnSouth(player:player ,playerMove: string): player{
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.EAST
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.WEST
    }
    return player;
  }
  static turnWest(player:player ,playerMove: string): player{
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.SOUTH
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.NORTH
    }
    return player;
  }
  static turnEast(player:player ,playerMove: string): player{
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.WEST
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.EAST
    }
    return player;
  }


  static setPlayerDirection(player:player ,playerMove: string):player {
    switch (player.direction) {
      case "N":
        player = this.turnNorth(player,playerMove);
        break;
      case "S":
        player = this.turnSouth(player,playerMove);
        break;
      case "W":
        player = this.turnWest(player,playerMove);
        break;
      case "E":
        player = this.turnEast(player,playerMove);
        break;
    }
    return player;
  }

  static isNextTileMountain(tileCoordinates: tileCoordinates,gameMap:mapElement[][]):boolean {
    return gameMap[tileCoordinates.x][tileCoordinates.y] === mapElementsEnum.mountain;
  }

  isNextTileTreasure(tileCoordinates: tileCoordinates,gameMap:mapElement[][],gameData: gameDataInterface):boolean {
    for (let treasure of  gameData.treasuresSpots) {
      if (gameMap[tileCoordinates.x][tileCoordinates.y] === `${mapElementsEnum.treasure}(${treasure.nbOfTreasures})`)
        return true
    }
    return false;
  }

  static isEndOfMap(tileCoordinates: tileCoordinates,gameData:gameDataInterface): boolean{
   return tileCoordinates.x> gameData.mapSize.nbHorizontalTiles || tileCoordinates.y > gameData.mapSize.nbVerticalTiles;
  }


  static isNextTileOccupiedByPlayer(tileCoordinates: tileCoordinates,gameMap:mapElement[][],gameData: gameDataInterface):boolean {
    for (let player of  gameData.players) {
      if (gameMap[tileCoordinates.x][tileCoordinates.y] === `${mapElementsEnum.player}(${player.name})`)
        return true
    }
    return false;
  }

  static isNextTileValid(player: player,gameMap:mapElement[][],gameData:gameDataInterface):boolean{
    const tileCoordinates = this.getFuturePlayerPosition(player);
    return!this.isNextTileMountain(tileCoordinates,gameMap) ||
    !this.isNextTileOccupiedByPlayer(tileCoordinates,gameMap,gameData) ||
    !this.isEndOfMap(tileCoordinates,gameData);
  }

  static moveNorth(player:player, gameMap:mapElement[][]): any{
    gameMap[player.positionX][player.positionY+1] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    player.positionY+= 1;
    return {player,gameMap};
  }

  static moveSouth(player:player, gameMap:mapElement[][]): any{
    gameMap[player.positionX][player.positionY-1] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    player.positionY-= 1;
    return {player,gameMap};
  }

  static moveWest(player:player, gameMap:mapElement[][]): any{
    gameMap[player.positionX-1][player.positionY] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    player.positionX-= 1;
    return {player,gameMap};
  }

  static moveEast(player:player, gameMap:mapElement[][]): any{
    gameMap[player.positionX+1][player.positionY] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    player.positionX+= 1;
    return {player,gameMap};
  }

  static cleanAfterPlayerMove(player:player, gameMap:mapElement[][]): mapElement[][]{
    gameMap[player.positionX][player.positionY] = mapElementsEnum.plain;
    return gameMap;
  }

  static movePlayer(player:player, gameMap:mapElement[][]): gameSessionInterface{
    let gameSession : gameSessionInterface;
    switch (player.direction) {
      case "N":{
        gameSession = this.moveNorth(player,gameMap);
        break;
      }
      case "S":{
        gameSession = this.moveSouth(player,gameMap);
        break;
      }
      case "W":{
        gameSession = this.moveWest(player,gameMap);
        break;
      }
      case "E":{
        gameSession = this.moveEast(player,gameMap);
        break;
      }
    }
   gameSession.gameMap = this.cleanAfterPlayerMove(player,gameMap);
    return gameSession;
  }

  static removeUsedMove(player:player): player {
    if (player.movesSequence.length > 0) {
      player.movesSequence = player.movesSequence.substr(1);
      return player;
    }
  }

  static playerStillHasMoves (player:player): boolean {
    return player.movesSequence.length != 0;
  }

  static getNextPlayerMove(player:player):singleMove{
    if (player.movesSequence.length > 0) {
      return player.movesSequence[0] as singleMove;
    }
  }

  static getTreasure(player:player,gameData:gameDataInterface, gameMap:mapElement[][]): gameSessionInterface {
    return {gameData,gameMap}
  }

  static getTotalNumberOfMoves(gameData:gameDataInterface) : number {
    let total = 0;
    for (let player of gameData.players) {
      total += player.movesSequence.length;
    }
    return total;
  }

  static updateGameData(player:player,gameData:gameDataInterface): gameDataInterface {
    // looks for the index of the player by name inside gameData
    const playerIndex =  gameData.players.findIndex(_player => _player.name === player.name);
    gameData.players[playerIndex] = player;
    return gameData;
  }






  static playTurn(currentPlayer : player,gameData: gameDataInterface, gameMap: mapElement[][]): gameSessionInterface {
    let gameSession : gameSessionInterface;
    // get the next player move from the player moveSequence
    const move = this.getNextPlayerMove(currentPlayer);
    // checks if player is going to advance and that destination tile is valid
    if (move === playerMovesEnum.advance && this.isNextTileValid(currentPlayer,gameMap,gameData)){
        // moves the player and updates the concerned data (player and gameMap)
        gameSession = this.movePlayer(currentPlayer,gameMap);
        // removes the executed move form the player's moveSequence
        gameSession.player = this.removeUsedMove(currentPlayer);
        // updates gameData with the updated player
        gameSession.gameData= this.updateGameData(currentPlayer,gameData)
    }else {
      // if used next move is a direction change updates player's direction
      currentPlayer= this.setPlayerDirection(currentPlayer,move);
      gameSession.player = this.removeUsedMove(currentPlayer);
      gameSession.gameData= this.updateGameData(currentPlayer,gameData)
    }
    return gameSession
  }

  static startTheChase(gameData:gameDataInterface, gameMap:mapElement[][]): gameSessionInterface {
    // Loops as many times as there are turns in total
    for (let i=0; i<= this.getTotalNumberOfMoves(gameData); i++){
      // each player will play 1 turn
      for (let player of gameData.players){
        if (this.playerStillHasMoves(player))
          this.playTurn(player,gameData,gameMap);
      }
    }
    return {gameData, gameMap}
  }
}
