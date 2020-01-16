import {Component, OnInit} from '@angular/core';
import {MapDataService} from "../../core/services/map-data/map-data.service";
import {gameData} from "../../core/models/interfaces/game.data";
import {MapUtils} from "../lib/map-utils/map-utils";
import {mapElement, gameMap} from "../../core/models/interfaces/game-map.interface";
import {map} from "rxjs/operators";
import {PlayerUtils} from "../lib/player-utils/player-utils";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  gameData: gameData;
  gameMap: gameMap;

  constructor(private mapDataService: MapDataService) {
  }

  ngOnInit() {
    this.fetchMapInitialGameData();
  }

  setPlayerPriority(gameData: gameData): gameData {
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
    });
  }

  runGame(): void {
    this.mapDataService.getGameInitialisationData().pipe(
      map(this.setPlayerPriority),
    ).subscribe((resp) => {
      this.gameData = resp;
      console.log('resp',this.gameData);
      this.gameMap= MapUtils.generateGameMap(resp);
      console.log(this.gameMap);
      const gameSession = PlayerUtils.startTheChase(this.gameData,this.gameMap);
      this.gameMap = gameSession.gameMap;
      this.gameData = gameSession.gameData;
    });

  }

}