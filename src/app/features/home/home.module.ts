import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StartScreenComponent} from './containers/start-screen/start-screen.component';
import {GameResultsComponent} from "./components/game-results/game-results.component";
import {GameBoardComponent} from './components/game-board/game-board.component';
import {MapTileComponent} from './components/game-board/map-tile/map-tile.component';

const routes: Routes = [
  {
    path: '',
    component: StartScreenComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    StartScreenComponent,
    GameResultsComponent,
    GameBoardComponent,
    MapTileComponent,
  ],
  providers: [],
  exports: [
    GameResultsComponent
  ]
})
export class HomeModule {
}
