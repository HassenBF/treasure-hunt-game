import { Component, OnInit } from '@angular/core';
import {MapDataService} from "../../core/services/map-data/map-data.service";
import {gameDataInterface} from "../../core/models/interfaces/game-data.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  gameData: gameDataInterface;
  constructor( private mapDataService: MapDataService) { }

  ngOnInit() {
    this.fetchMapInitialGameData();
  }

  fetchMapInitialGameData(): void {
  this.mapDataService.getGameInitialisationData().subscribe((resp)=> {
    this.gameData = resp;
    console.log('gamedata',resp);
  });
  }

}
