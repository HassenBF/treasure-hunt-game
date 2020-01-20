import {Component, Input, OnInit} from '@angular/core';
import {GameData} from '../../../../shared/models/interfaces/gameData';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent implements OnInit {

  @Input() gameData: GameData;

  constructor() { }

  ngOnInit() {
  }

}
