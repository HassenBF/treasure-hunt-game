import {TestBed} from '@angular/core/testing';

import {GameDataService} from './game-data.service';
import {HttpClientModule} from '@angular/common/http';
import {MOCK_GAME_DATA} from '../../../../test/mocks/game.mock';

describe('MapDataService', () => {
  let service: GameDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        GameDataService
      ],
    });
    service = TestBed.get(GameDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initiale game Data', (doneFn) => {
    service.getGameInitialisationData().subscribe((value) => {
      expect(value).toEqual(MOCK_GAME_DATA);
      doneFn();
    });
  });
});

