import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StartScreenComponent} from './start-screen.component';
import {Component, Input} from '@angular/core';
import {GameData} from '../../../../shared/models/interfaces/gameData';
import {GameMap} from '../../../../shared/models/interfaces/game-map.interface';
import {HttpClientModule} from '@angular/common/http';
import {GameDataService} from '../../../../core/services/map-data/game-data.service';
import {of} from 'rxjs';
import {MOCK_GAME_DATA} from '../../../../../test/mocks/game.mock';

@Component({
  selector: 'app-game-results',
  template: '<span>Fake app-game-results</span>',
})
export class FakeGameResultsComponent {
  @Input() gameData: GameData;
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
  const customerDemandServiceSpy = jasmine.createSpyObj('GameDataService', [ 'getGameInitialisationData' ]);
  customerDemandServiceSpy.getGameInitialisationData.and.returnValue(of(MOCK_GAME_DATA));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StartScreenComponent ,
        FakeGameResultsComponent,
        FakeGameBoardComponent
      ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        {provide: GameDataService, useValue: customerDemandServiceSpy},
      ],

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
