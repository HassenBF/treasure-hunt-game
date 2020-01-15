import {Component, Input, OnInit} from '@angular/core';
import {mapElement} from "../../../core/models/interfaces/game-map.interface";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {

  @Input() gameMap: mapElement[][];

  constructor() { }

  ngOnInit() {
  }

}
