import {Component, OnInit} from '@angular/core';
import {MapDataService} from "../../../../core/services/map-data/map-data.service";
import {GameData} from "../../../../shared/models/interfaces/gameData";
import {MapUtils} from "../../../lib/map-utils/map-utils";
import {GameMap} from "../../../../shared/models/interfaces/game-map.interface";
import {map} from "rxjs/operators";
import {PlayerUtils} from "../../../lib/player-utils/player-utils";

@Component({
  selector: 'app-home',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {


  gameData: GameData;
  gameMap: GameMap;

  constructor(private mapDataService: MapDataService) {
  }

  ngOnInit() {
    this.fetchMapInitialGameData();
  }

  initPlayersData(gameData: GameData): GameData {
    gameData.players.forEach((player, index) => {
      player.priority = index;
      player.nbOfFoundTreasures = 0;
    });
    return gameData;
  }

  fetchMapInitialGameData(): void {
    this.mapDataService.getGameInitialisationData().pipe(
      map(this.initPlayersData),
    ).subscribe((resp) => {
      this.gameData = resp;
      console.log('resp',this.gameData);
      this.gameMap = MapUtils.generateGameMap(resp);
      console.log(this.gameMap);
    });
  }

  runGame(): void {
    this.mapDataService.getGameInitialisationData().pipe(
      map(this.initPlayersData),
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
