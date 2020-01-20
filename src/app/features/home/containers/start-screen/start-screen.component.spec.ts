import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartScreenComponent} from './start-screen.component';
import {Component, Input} from "@angular/core";
import {GameData} from "../../../../shared/models/interfaces/gameData";
import {GameMap} from "../../../../shared/models/interfaces/game-map.interface";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-game-results',
  template: '<span>Fake app-game-results</span>',
})
export class FakeGameResultsComponent {
  @Input() gameData:GameData;
}

@Component({
  selector: 'app-game-board',
  template: '<span>Fake app-game-board</span>',
})
export class FakeGameBoardComponent {
  @Input() gameMap: GameMap;
}

describe('StartScreenComponent', () => {
  let component: StartScreenComponent;
  let fixture: ComponentFixture<StartScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StartScreenComponent ,
        FakeGameResultsComponent,
        FakeGameBoardComponent
      ],
      imports: [
        HttpClientModule,
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
