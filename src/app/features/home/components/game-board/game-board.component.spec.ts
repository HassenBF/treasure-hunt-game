import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameBoardComponent} from './game-board.component';
import {Component, Input} from '@angular/core';
import {MOCK_MAP_FULL} from '../../../../../test/mocks/game.mock';

@Component({
  selector: 'app-map-tile',
  template: '<span>Fake app-map-tile</span>',
})
class FakeMapTileComponent {
  @Input() field: string;
}
describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameBoardComponent,
        FakeMapTileComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    component = fixture.componentInstance;
    component.gameMap = {...MOCK_MAP_FULL};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
