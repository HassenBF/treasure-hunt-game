import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameResultsComponent} from './game-results.component';
import {MOCK_GAME_DATA} from '../../../../../test/mocks/game.mock';

describe('GameResultsComponent', () => {
  let component: GameResultsComponent;
  let fixture: ComponentFixture<GameResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultsComponent);
    component = fixture.componentInstance;
    component.gameData = {...MOCK_GAME_DATA};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
