import {mapElement, gameMap} from "../../../shared/models/interfaces/game-map.interface";
import {gameData, player, singleMove, tileCoordinates} from "../../../shared/models/interfaces/game.data";
import {playerMovesEnum} from "../../../shared/models/enums/player-moves.enum";
import {mapElementsEnum} from "../../../shared/models/enums/map-elements.enum";
import {gameSession} from "../../../shared/models/interfaces/game.session";
import {directionsEnum} from "../../../shared/models/enums/directionsEnum";

export class PlayerUtils {

  /*
  * Gets next map tile player is supposed to move to
  */
  static getFuturePlayerPosition(player: player): tileCoordinates {
    if (player.direction === directionsEnum.NORTH) {
      return {x: player.positionX, y: player.positionY - 1};
    }
    if (player.direction === directionsEnum.SOUTH) {
      return {x: player.positionX, y: player.positionY + 1};
    }
    if (player.direction === directionsEnum.WEST) {
      return {x: player.positionX - 1, y: player.positionY};
    }
    if (player.direction === directionsEnum.EAST) {
      return {x: player.positionX + 1, y: player.positionY};
    }
  }

  static turnNorth(player: player, playerMove: string): player {
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.WEST
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.EAST
    }
    return player;
  }

  static turnSouth(player: player, playerMove: string): player {
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.EAST
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.WEST
    }
    return player;
  }

  static turnWest(player: player, playerMove: string): player {
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.SOUTH
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.NORTH
    }
    return player;
  }

  static turnEast(player: player, playerMove: string): player {
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.WEST
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.EAST
    }
    return player;
  }

  /*
  * Executes direction related moves
  */
  static setPlayerDirection(player: player, playerMove: string): player {
    switch (player.direction) {
      case "N":
        player = this.turnNorth(player, playerMove);
        break;
      case "S":
        player = this.turnSouth(player, playerMove);
        break;
      case "W":
        player = this.turnWest(player, playerMove);
        break;
      case "E":
        player = this.turnEast(player, playerMove);
        break;
    }
    return player;
  }

  static isNextTileMountain(tileCoordinates: tileCoordinates, gameMap: gameMap): boolean {
    //console.log('isMountain', gameMap.tiles[tileCoordinates.y][tileCoordinates.x] === mapElementsEnum.mountain);
    return gameMap.tiles[tileCoordinates.y][tileCoordinates.x] === mapElementsEnum.mountain;
  }

  /*
  * Checks if user is over a treasure
  */
  static lookForTreasure(player: player, gameData: gameData): gameSession {
    gameData.treasuresSpots.forEach((treasure, index) => {
      if (player.positionX === treasure.positionX && player.positionY === treasure.positionY) {
        player.isPlayerOnTreasure = true;
        player.lastTreasureFound = treasure;
        player.nbOfFoundTreasures += 1;
        gameData.treasuresSpots[index].nbOfTreasures -= 1;
        return {player, gameData}
      }
    });
    return {player, gameData};
  }


  static isEndOfMap(tileCoordinates: tileCoordinates, gameData: gameData): boolean {
    return tileCoordinates.x >= gameData.mapSize.nbHorizontalTiles
      || tileCoordinates.y >= gameData.mapSize.nbVerticalTiles
      || tileCoordinates.y < 0
      || tileCoordinates.x < 0
  }

  static isNextTileOccupiedByAnotherPlayer(tileCoordinates: tileCoordinates, gameMap: gameMap): boolean {
    return (gameMap.tiles[tileCoordinates.y][tileCoordinates.x]).startsWith(mapElementsEnum.player);
  }

  /*
  * Checks if the next tile the user is supposed to move is available and not blocked by a mountain
  */
  static isNextTileValid(player: player, gameMap: gameMap, gameData: gameData): boolean {
    const tileCoordinates = this.getFuturePlayerPosition(player);
    if (this.isEndOfMap(tileCoordinates, gameData)) {
      return false
    } else {
      return !this.isNextTileMountain(tileCoordinates, gameMap) && !this.isNextTileOccupiedByAnotherPlayer(tileCoordinates, gameMap);
    }
  }

  static moveNorth(player: player, gameMap: gameMap): gameSession {
    player.isPlayerOnTreasure = false;
    gameMap.tiles[player.positionY - 1][player.positionX] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    player.positionY -= 1;
    return {player, gameMap};
  }

  static moveSouth(player: player, gameMap: gameMap): gameSession {
    player.isPlayerOnTreasure = false;
    gameMap.tiles[player.positionY + 1][player.positionX] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    player.positionY += 1;
    return {player, gameMap};
  }

  static moveWest(player: player, gameMap: gameMap): gameSession {
    player.isPlayerOnTreasure = false;
    gameMap.tiles[player.positionY][player.positionX - 1] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    player.positionX -= 1;
    return {player, gameMap};
  }

  static moveEast(player: player, gameMap: gameMap): gameSession {
    player.isPlayerOnTreasure = false;
    gameMap.tiles[player.positionY][player.positionX + 1] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    player.positionX += 1;
    return {player, gameMap};
  }

  /*
  * Advances player to another tile
  */
  static movePlayer(player: player, gameMap: gameMap): gameSession {
    gameMap = this.clearOldPlayerTile(player, gameMap);
    switch (player.direction) {
      case "N": {
        return this.moveNorth(player, gameMap);
      }
      case "S": {
        return this.moveSouth(player, gameMap);
      }
      case "W": {
        return this.moveWest(player, gameMap);
      }
      case "E": {
        return this.moveEast(player, gameMap);
      }
    }
  }

  /*
 * Deletes executed moves from player's move sequence
 */
  static removeUsedMove(player: player): player {
    if (player.movesSequence.length > 0) {
      player.movesSequence = player.movesSequence.substr(1);
      return player;
    }
  }

  static playerStillHasMoves(player: player): boolean {
    return player.movesSequence.length != 0;
  }

  static getNextPlayerMove(player: player): singleMove {
    if (player.movesSequence.length > 0) {
      return player.movesSequence[0] as singleMove;
    }
  }

  /*
  * Gets total number of moves of all players in a game
  */
  static getTotalNumberOfMoves(gameData: gameData): number {
    let total = 0;
    for (let player of gameData.players) {
      total += player.movesSequence.length;
    }
    console.log('getTotalNumberOfMoves', total);
    return total;
  }

  static updateGameData(player: player, gameData: gameData): gameData {
    // looks for the index of the player by name inside gameData
    const playerIndex = gameData.players.findIndex(_player => _player.name === player.name);
    gameData.players[playerIndex] = player;
    return gameData;
  }


  static clearOldPlayerTile(player: player, gameMap: gameMap): gameMap {
    if (player.isPlayerOnTreasure) {
      gameMap.tiles[player.positionY][player.positionX] = `${mapElementsEnum.treasure}(${player.lastTreasureFound.nbOfTreasures})` as mapElement;
    } else {
      gameMap.tiles[player.positionY][player.positionX] = mapElementsEnum.plain;
    }
    return gameMap;
  }


  static playTurn(player: player, gameData: gameData, gameMap: gameMap): gameSession {
    let gameSession: gameSession = {};
    // get the next player move from the player moveSequence
    const move = this.getNextPlayerMove(player);
    // checks if player is going to advance and that destination tile is valid
    if (move === playerMovesEnum.advance && this.isNextTileValid(player, gameMap, gameData)) {
      // moves the player
      gameSession = this.movePlayer(player, gameMap);
      // checks and gather a treasure if there's any
      gameSession = this.lookForTreasure(player, gameData);
      // removes the executed move form the player's moveSequence
      gameSession.player = this.removeUsedMove(player);
      // updates gameData with the updated player
      gameSession.gameData = this.updateGameData(player, gameData)
      // checks if the player is going to advance with an invalid destination
    } else if (move === playerMovesEnum.advance && !this.isNextTileValid(player, gameMap, gameData)) {
      gameSession.player = this.removeUsedMove(player);
      gameSession.gameData = this.updateGameData(player, gameData)
    } else {
      // if used next move is a direction change updates player's direction
      gameSession.player = this.setPlayerDirection(player, move);
      gameSession.player = this.removeUsedMove(player);
      gameSession.gameData = this.updateGameData(player, gameData)
    }
    return gameSession
  }

  static startTheChase(gameData: gameData, gameMap: gameMap): gameSession {
    // Loops as many times as there are turns in total
    const totalNumberOfMoves = this.getTotalNumberOfMoves(gameData);
    for (let i = 0; i <= totalNumberOfMoves; i++) {
      console.log('i', i);
      // each player will play 1 turn
      for (let player of gameData.players) {
        if (this.playerStillHasMoves(player))
          this.playTurn(player, gameData, gameMap);
      }
    }
    return {gameData, gameMap}
  }
}
