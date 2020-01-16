import {gameData, mountain, player, treasures} from "../../../core/models/interfaces/game.data";
import {mapElementsEnum} from "../../../core/models/enums/map-elements.enum";
import {gameMap, mapElement} from "../../../core/models/interfaces/game-map.interface";
import {pipe} from "rxjs";

export class MapUtils {
  pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

  static addPlains(gameData: gameData):gameMap {
      return {tiles: Array(gameData.mapSize.nbVerticalTiles).fill(mapElementsEnum.plain)
      .map(x => Array(gameData.mapSize.nbHorizontalTiles).fill(mapElementsEnum.plain))};
  }

  static addMountains(gameMap: gameMap, mountains:mountain[]){
    for (let mountain of mountains ){
      gameMap.tiles[mountain.positionY][mountain.positionX] = mapElementsEnum.mountain;
    }
    return gameMap;
  }

  static addTreasures(gameMap: gameMap, treasures:treasures[]) {
    for (let treasure of treasures) {
      gameMap.tiles[treasure.positionY][treasure.positionX] = `${mapElementsEnum.treasure}(${treasure.nbOfTreasures})` as mapElement;
    }
    return gameMap;
  }

  static addPlayers(gameMap: gameMap, players:player[]) {
    for (let player of players) {
      gameMap.tiles[player.positionY][player.positionX] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    }
    return gameMap;
  }

  static generateGameMap(gameData: gameData): any {
    let gameMap: gameMap;
     gameMap = MapUtils.addPlains(gameData);
     gameMap = MapUtils.addMountains(gameMap, gameData.mountains);
     gameMap = MapUtils.addTreasures(gameMap, gameData.treasuresSpots);
     gameMap = MapUtils.addPlayers(gameMap, gameData.players);
     return gameMap;
  }
}

