import {gameData, player} from "./game.data";
import {mapElement, gameMap} from "./game-map.interface";

export interface gameSession {
  gameData?:gameData;
  gameMap?:gameMap;
  player?:player;
}
