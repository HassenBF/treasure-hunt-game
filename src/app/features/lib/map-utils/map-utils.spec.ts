import {MapUtils} from './map-utils';
import {
  MOCK_GAME_DATA,
  MOCK_MAP_WITH_MOUNTAINS,
  MOCK_MAP_FULL,
  MOCK_MAP_WITH_TREASURES,
  MOCK_PLAIN_MAP
} from "../../../../test/mocks/game.mock";

describe('MapUtils', () => {


  it('should create an instance', () => {
    expect(new MapUtils()).toBeTruthy();
  });

  it('should generate a plain map', () => {
    expect(MapUtils.addPlains(MOCK_GAME_DATA.mapSize)).toEqual(MOCK_PLAIN_MAP);
  });

  it('should generate add mountains to a generated map', () => {
    expect(MapUtils.addMountains(MOCK_PLAIN_MAP,MOCK_GAME_DATA.mountains)).toEqual(MOCK_MAP_WITH_MOUNTAINS);
  });

  it('should generate add treasures to a generated map', () => {
    expect(MapUtils.addTreasures(MOCK_MAP_WITH_MOUNTAINS,MOCK_GAME_DATA.treasuresSpots)).toEqual(MOCK_MAP_WITH_TREASURES);
  });

  it('should generate add players to a generated map', () => {
    expect(MapUtils.addPlayers(MOCK_MAP_WITH_TREASURES,MOCK_GAME_DATA.players)).toEqual(MOCK_MAP_FULL);
  })

  it('should generate a full map', () => {
    expect(MapUtils.generateGameMap(MOCK_GAME_DATA)).toEqual(MOCK_MAP_FULL);
  })
});
