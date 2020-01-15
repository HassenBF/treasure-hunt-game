import {gameDataInterface, mountain, player, treasures} from "../../core/models/interfaces/game-data.interface";
import {mapElementsEnum} from "../../core/models/enums/map-elements.enum";
import {mapElement} from "../../core/models/interfaces/game-map.interface";

export class MapUtils {

  static addPlains(gameData: gameDataInterface){
    return Array(gameData.mapSize.nbVerticalTiles).fill(mapElementsEnum.plain)
      .map(x => Array(gameData.mapSize.nbHorizontalTiles).fill(mapElementsEnum.plain));
  }

  static addMountains(gameMap: mapElement[][], mountains:mountain[]){
    console.log('mountains', mountains);
    for (let mountain of mountains ){
      gameMap[mountain.positionY][mountain.positionX] = mapElementsEnum.mountain;
    }
    return gameMap;
  }

  static addTreasures(gameMap: mapElement[][], treasures:treasures[]) {
    for (let treasure of treasures) {
      gameMap[treasure.positionY][treasure.positionX] = `${mapElementsEnum.treasure}(${treasure.nbOfTreasures})` as mapElement;
    }
    return gameMap;
  }

  static addPlayers(gameMap: mapElement[][], players:player[]) {
    for (let player of players) {
      gameMap[player.positionY][player.positionX] = `${mapElementsEnum.player}(${player.name})` as mapElement;
    }
    return gameMap;
  }

  static generateGameMap(gameData: gameDataInterface): any {
    console.log('gameData', gameData);
    let gameMap: mapElement[][];
     gameMap = MapUtils.addPlains(gameData);
     gameMap = MapUtils.addMountains(gameMap, gameData.mountains);
     gameMap = MapUtils.addTreasures(gameMap, gameData.treasuresSpots);
     gameMap = MapUtils.addPlayers(gameMap, gameData.players);
     return gameMap;
  }
}

