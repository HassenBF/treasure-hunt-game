import {GameMap} from "../../../shared/models/interfaces/game-map.interface";
import {GameData, Player, singleMove, TileCoordinates} from "../../../shared/models/interfaces/gameData";
import {playerMovesEnum} from "../../../shared/models/enums/player-moves.enum";
import {mapElementsEnum} from "../../../shared/models/enums/map-elements.enum";
import {GameSession} from "../../../shared/models/interfaces/gameSession";
import {directionsEnum} from "../../../shared/models/enums/directionsEnum";

export class PlayerUtils {

  /*
  * Gets next map tile player is supposed to move to
  */
  static getFuturePlayerPosition(player: Player): TileCoordinates {
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

  static turnWhenDirectionIsNorth(player: Player, playerMove: string): Player {
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.WEST
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.EAST
    }
    return player;
  }

  static turnWhenDirectionIsSouth(player: Player, playerMove: string): Player {
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.EAST
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.WEST
    }
    return player;
  }

  static turnWhenDirectionIsWest(player: Player, playerMove: string): Player {
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.SOUTH
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.NORTH
    }
    return player;
  }

  static turnWhenDirectionIsEast(player: Player, playerMove: string): Player {
    if (playerMove === playerMovesEnum.left) {
      player.direction = directionsEnum.NORTH
    }
    if (playerMove === playerMovesEnum.right) {
      player.direction = directionsEnum.SOUTH
    }
    return player;
  }

  /*
  * Executes direction related moves
  */
  static setPlayerDirection(player: Player, playerMove: string): Player {
    switch (player.direction) {
      case "N":
        player = this.turnWhenDirectionIsNorth(player, playerMove);
        break;
      case "S":
        player = this.turnWhenDirectionIsSouth(player, playerMove);
        break;
      case "W":
        player = this.turnWhenDirectionIsWest(player, playerMove);
        break;
      case "E":
        player = this.turnWhenDirectionIsEast(player, playerMove);
        break;
    }
    return player;
  }

  static moveNorth(player: Player, gameMap: GameMap): GameSession {
    gameMap.tiles[player.positionY - 1][player.positionX] = `${mapElementsEnum.player}(${player.name})`;
    player.positionY -= 1;
    return {player, gameMap};
  }

  static moveSouth(player: Player, gameMap: GameMap): GameSession {
    gameMap.tiles[player.positionY + 1][player.positionX] = `${mapElementsEnum.player}(${player.name})`;
    player.positionY += 1;
    return {player, gameMap};
  }

  static moveWest(player: Player, gameMap: GameMap): GameSession {
    gameMap.tiles[player.positionY][player.positionX - 1] = `${mapElementsEnum.player}(${player.name})`;
    player.positionX -= 1;
    return {player, gameMap};
  }

  static moveEast(player: Player, gameMap: GameMap): GameSession {
    gameMap.tiles[player.positionY][player.positionX + 1] = `${mapElementsEnum.player}(${player.name})`;
    player.positionX += 1;
    return {player, gameMap};
  }

  /*
  * Advances player to another tile
  */
  static movePlayer(player: Player, gameMap: GameMap): GameSession {
    this.clearOldPlayerTile(player, gameMap);
    player.isPlayerOnTreasure = false;
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
  * Puts back the right tile on the old player's position
  */
  static clearOldPlayerTile(player: Player, gameMap: GameMap): GameMap {
    if (player.isPlayerOnTreasure) {
      gameMap.tiles[player.positionY][player.positionX] = `${mapElementsEnum.treasure}(${player.lastTreasureFound.nbOfTreasures})`;
    } else {
      gameMap.tiles[player.positionY][player.positionX] = mapElementsEnum.plain;
    }
    return gameMap;
  }

  /*
 * Deletes executed moves from player's move sequence
 */
  static removeUsedMove(player: Player): Player {
    if (player.movesSequence.length > 0) {
      player.movesSequence = player.movesSequence.substr(1);
      return player;
    }
  }

  static playerStillHasMoves(player: Player): boolean {
    return player.movesSequence.length != 0;
  }

  static getNextPlayerMove(player: Player): singleMove {
    if (player.movesSequence.length > 0) {
      return player.movesSequence[0] as singleMove;
    }
  }


  static isNextTileMountain(tileCoordinates: TileCoordinates, gameMap: GameMap): boolean {
    return gameMap.tiles[tileCoordinates.y][tileCoordinates.x] === mapElementsEnum.mountain;
  }

  static isEndOfMap(tileCoordinates: TileCoordinates, gameData: GameData): boolean {
    return tileCoordinates.x >= gameData.mapSize.nbHorizontalTiles
      || tileCoordinates.y >= gameData.mapSize.nbVerticalTiles
      || tileCoordinates.y < 0
      || tileCoordinates.x < 0
  }

  static isNextTileOccupiedByAnotherPlayer(tileCoordinates: TileCoordinates, gameMap: GameMap): boolean {
    return (gameMap.tiles[tileCoordinates.y][tileCoordinates.x]).startsWith(mapElementsEnum.player);
  }

  /*
  * Checks if the next tile the user is supposed to move to is valid , not occupied and not blocked by a mountain
  */
  static isNextTileValid(player: Player, gameMap: GameMap, gameData: GameData): boolean {
    const tileCoordinates = this.getFuturePlayerPosition(player);
    if (this.isEndOfMap(tileCoordinates, gameData)) {
      return false
    } else {
      return !this.isNextTileMountain(tileCoordinates, gameMap) && !this.isNextTileOccupiedByAnotherPlayer(tileCoordinates, gameMap);
    }
  }

  /*
  * Gets total number of moves of all players in a game
  */
  static getTotalNumberOfMoves(gameData: GameData): number {
    let total = 0;
    for (let player of gameData.players) {
      total += player.movesSequence.length;
    }
    console.log('getTotalNumberOfMoves', total);
    return total;
  }

  static updateGameData(player: Player, gameData: GameData): GameData {
    // looks for the index of the player by name inside gameData
    const playerIndex = gameData.players.findIndex(_player => _player.name === player.name);
    gameData.players[playerIndex] = player;
    return gameData;
  }

  /*
 * Checks if user is over a treasure
 */
  static lookForTreasure(player: Player, gameData: GameData): GameSession {
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


  static playTurn(player: Player, gameData: GameData, gameMap: GameMap): GameSession {
    let gameSession: GameSession = {};
    // get the next player move from the player moveSequence
    const move = this.getNextPlayerMove(player);
    // checks if player is going to advance and that destination tile is valid
    if (move === playerMovesEnum.advance && this.isNextTileValid(player, gameMap, gameData)) {
      // moves the player
      this.movePlayer(player, gameMap);
      // checks and gather a treasure if there's any
      this.lookForTreasure(player, gameData);
      // removes the executed move form the player's moveSequence
      this.removeUsedMove(player);
      // updates gameData with the updated player
      this.updateGameData(player, gameData)
      // checks if the player is going to advance with an invalid destination
    } else if (move === playerMovesEnum.advance && !this.isNextTileValid(player, gameMap, gameData)) {
      this.removeUsedMove(player);
      this.updateGameData(player, gameData)
    } else {
      // if  next move is a direction change then the new player direction is updated
      this.setPlayerDirection(player, move);
      this.removeUsedMove(player);
      this.updateGameData(player, gameData)
    }
    return {player, gameMap, gameData}
  }

  static startTheChase(gameData: GameData, gameMap: GameMap): GameSession {
    // Loops as many times as there are turns in total
    const totalNumberOfMoves = this.getTotalNumberOfMoves(gameData);
    for (let i = 0; i <= totalNumberOfMoves; i++) {
      console.log('i', i);
      // each player will play 1 turn
      for (let player of gameData.players) {
        if (this.playerStillHasMoves(player)) {
          this.playTurn(player, gameData, gameMap);
        }
      }
    }
    return {gameData, gameMap}
  }
}
