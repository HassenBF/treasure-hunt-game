import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-map-tile',
  templateUrl: './map-tile.component.html',
  styleUrls: ['./map-tile.component.scss']
})
export class MapTileComponent implements OnInit {

  @Input() field: string;
  constructor() { }

  ngOnInit() {
  }

}
