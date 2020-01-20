import {GameData, MapSize, Mountain, Player, Treasures} from '../../../shared/models/interfaces/gameData';
import {mapElementsEnum} from '../../../shared/models/enums/map-elements.enum';
import {GameMap} from '../../../shared/models/interfaces/game-map.interface';

export class MapUtils {

  static addPlains(mapSize: MapSize): GameMap {
      return {tiles: Array(mapSize.nbVerticalTiles).fill(mapElementsEnum.plain)
      .map(x => Array(mapSize.nbHorizontalTiles).fill(mapElementsEnum.plain))};
  }

  static addMountains(gameMap: GameMap, mountains: Mountain[]) {
    for (const mountain of mountains ) {
      gameMap.tiles[mountain.positionY][mountain.positionX] = mapElementsEnum.mountain;
    }
    return gameMap;
  }

  static addTreasures(gameMap: GameMap, treasures: Treasures[]) {
    for (const treasure of treasures) {
      gameMap.tiles[treasure.positionY][treasure.positionX] = `${mapElementsEnum.treasure}(${treasure.nbOfTreasures})`;
    }
    return gameMap;
  }

  static addPlayers(gameMap: GameMap, players: Player[]) {
    for (const player of players) {
      gameMap.tiles[player.positionY][player.positionX] = `${mapElementsEnum.player}(${player.name})`;
    }
    return gameMap;
  }

  static generateGameMap(gameData: GameData): any {
    let gameMap: GameMap;
    gameMap = MapUtils.addPlains(gameData.mapSize);
    gameMap = MapUtils.addMountains(gameMap, gameData.mountains);
    gameMap = MapUtils.addTreasures(gameMap, gameData.treasuresSpots);
    gameMap = MapUtils.addPlayers(gameMap, gameData.players);
    return gameMap;
  }

}

