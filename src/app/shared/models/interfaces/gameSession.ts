import {GameData, Player} from "./gameData";
import {GameMap} from "./game-map.interface";

export interface GameSession {
  gameData?:GameData;
  gameMap?:GameMap;
  player?:Player;
}
