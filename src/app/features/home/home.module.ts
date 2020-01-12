import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {GameDashboardComponent} from "./game-dashboard/game-dashboard.component";

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
  ],
  providers: [],
  exports: [
    GameDashboardComponent
  ]
})
export class HomeModule {
}
