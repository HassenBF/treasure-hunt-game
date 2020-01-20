import {Component} from '@angular/core';
import {GameData} from "./shared/models/interfaces/gameData";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data : GameData = {
    "mapSize": {
      "nbHorizontalTiles": 3,
      "nbVerticalTiles": 4
    },
    mountains : [
      {
        positionX: 1,
        positionY: 0
      },
      {
        "positionX": 2,
        "positionY": 1
      }
    ],
    treasuresSpots: [
      {
        positionX: 0,
        positionY: 3,
        nbOfTreasures: 2
      },
      {
        "positionX": 1,
        "positionY": 3,
        "nbOfTreasures": 3
      }
    ],
    "players": [
      {
        "name": "Lara",
        "positionX": 1,
        "positionY": 1,
        "direction": "S",
        "movesSequence": "AADADA"
      },
      {
        "name": "Eric",
        "positionX": 2,
        "positionY": 1,
        "direction": "S",
        "movesSequence": "AADADA"
      }
    ]
  }


}
