import {Component, Input, OnInit} from '@angular/core';
import {mapElement} from "../../../../shared/models/interfaces/game-map.interface";

@Component({
  selector: 'app-map-tile',
  templateUrl: './map-tile.component.html',
  styleUrls: ['./map-tile.component.scss']
})
export class MapTileComponent implements OnInit {

  @Input() field: mapElement;
  constructor() { }

  ngOnInit() {
  }

}
