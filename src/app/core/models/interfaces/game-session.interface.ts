import {gameDataInterface, player} from "./game-data.interface";
import {mapElement} from "./game-map.interface";

export interface gameSessionInterface {
  gameData?:gameDataInterface;
  gameMap?:mapElement[][];
  player?:player;
}
