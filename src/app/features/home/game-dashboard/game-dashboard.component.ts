import {Component, Input, OnInit} from '@angular/core';
import {gameData} from "../../../shared/models/interfaces/game.data";

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.scss']
})
export class GameDashboardComponent implements OnInit {

  @Input() gameData : gameData;

  constructor() { }

  ngOnInit() {
  }

}
