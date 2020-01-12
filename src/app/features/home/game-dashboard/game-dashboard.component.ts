import {Component, Input, OnInit} from '@angular/core';
import {gameDataInterface} from "../../../core/models/interfaces/game-data.interface";

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.scss']
})
export class GameDashboardComponent implements OnInit {

  @Input() gameData : gameDataInterface;

  constructor() { }

  ngOnInit() {
  }

}
