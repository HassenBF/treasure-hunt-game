import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {GameDashboardComponent} from "./game-dashboard/game-dashboard.component";
import { GameBoardComponent } from './game-board/game-board.component';
import { MapTileComponent } from './game-board/map-tile/map-tile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    HomeComponent,
    GameDashboardComponent,
    GameBoardComponent,
    MapTileComponent,
  ],
  providers: [],
  exports: [
    GameDashboardComponent
  ]
})
export class HomeModule {
}
