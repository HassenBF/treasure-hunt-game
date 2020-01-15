import {Component, OnInit} from '@angular/core';
import {MapDataService} from "../../core/services/map-data/map-data.service";
import {gameDataInterface} from "../../core/models/interfaces/game-data.interface";
import {MapUtils} from "../map-utils/map-utils";
import {mapElement} from "../../core/models/interfaces/game-map.interface";
import {map} from "rxjs/operators";
import {PlayerUtils} from "../player-utils/player-utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  gameData: gameDataInterface;
  gameMap: mapElement[][];

  constructor(private mapDataService: MapDataService) {
  }

  ngOnInit() {
    this.fetchMapInitialGameData();
  }

  setPlayerPriority(gameData: gameDataInterface): gameDataInterface {
    gameData.players.forEach((player, index) => {
      player.priority = index;
    });
    return gameData;
  }

  fetchMapInitialGameData(): void {
    this.mapDataService.getGameInitialisationData().pipe(
      map(this.setPlayerPriority),
    ).subscribe((resp) => {
      this.gameData = resp;
      console.log('resp',this.gameData);
      this.gameMap = MapUtils.generateGameMap(resp);
      console.log(this.gameMap);
    });
  }

  runGame(): void {
    const gameSession = PlayerUtils.startTheChase(this.gameData,this.gameMap);
    this.gameMap = gameSession.gameMap;
    this.gameData = gameSession.gameData;
  }

}
