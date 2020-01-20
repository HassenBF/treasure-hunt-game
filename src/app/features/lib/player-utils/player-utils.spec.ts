import {PlayerUtils} from './player-utils';
import {MOCK_GAME_DATA, MOCK_MAP_FULL, MOCK_PLAYER} from '../../../../test/mocks/game.mock';
import {Player} from '../../../shared/models/interfaces/gameData';
import {GameSession} from '../../../shared/models/interfaces/gameSession';
import {GameMap} from '../../../shared/models/interfaces/game-map.interface';
import {mapElementsEnum} from '../../../shared/models/enums/map-elements.enum';


describe('PlayerUtils', () => {
  it('should create an instance', () => {
    expect(new PlayerUtils()).toBeTruthy();
  });

  it('should get next move to be executed by the current player', () => {
    expect(PlayerUtils.getNextPlayerMove({...MOCK_PLAYER})).toEqual('A');
  });

  it('should remove the executed move from player\'s move sequence', () => {
    const testOutputPlayer = PlayerUtils.removeUsedMove({...MOCK_PLAYER});
    expect(testOutputPlayer.movesSequence).toEqual('DDAADAGAGA');
  });

  it('it should get the sum of moves of all players in a game', () => {
    expect(PlayerUtils.getTotalNumberOfMoves({...MOCK_GAME_DATA})).toEqual(12);
  });


  it('should check if player still has moves in the current game', () => {
    const testEntryPlayer = {...MOCK_PLAYER};
    testEntryPlayer.movesSequence = '';
    expect(PlayerUtils.playerStillHasMoves(testEntryPlayer)).toEqual(false);
  });

  it('should check if next tile the player is moving to is valid ', () => {
    expect(PlayerUtils.isNextTileValid({...MOCK_PLAYER}, {...MOCK_MAP_FULL}, {...MOCK_GAME_DATA})).toEqual(false);
  });


  it('should get future player position', () => {
    const testEntryPlayer = MOCK_PLAYER;
    expect(PlayerUtils.getFuturePlayerPosition({...testEntryPlayer})).toEqual({x: 1, y: 4});
    testEntryPlayer.direction = 'N';
    expect(PlayerUtils.getFuturePlayerPosition({...testEntryPlayer})).toEqual({x: 1, y: 2});
    testEntryPlayer.direction = 'W';
    expect(PlayerUtils.getFuturePlayerPosition({...testEntryPlayer})).toEqual({x: 0, y: 3});
    testEntryPlayer.direction = 'E';
    expect(PlayerUtils.getFuturePlayerPosition({...testEntryPlayer})).toEqual({x: 2, y: 3});
  });

  it('should check if it\'s the end of the map ', () => {
    let futureTileCoordinates = {x: 1, y: 4};
    expect(PlayerUtils.isEndOfMap({...futureTileCoordinates}, {...MOCK_GAME_DATA})).toEqual(true);
    futureTileCoordinates = {x: 1, y: 2};
    expect(PlayerUtils.isEndOfMap({...futureTileCoordinates}, {...MOCK_GAME_DATA})).toEqual(false);
  });

  it('should check if the next tile is a mountain ', () => {
    let futureTileCoordinates = {x: 2, y: 2};
    expect(PlayerUtils.isNextTileMountain({...futureTileCoordinates}, {...MOCK_MAP_FULL})).toEqual(true);
    futureTileCoordinates = {x: 2, y: 1};
    expect(PlayerUtils.isNextTileMountain({...futureTileCoordinates}, {...MOCK_MAP_FULL})).toEqual(false);
  });

  it('should check if the next tile is a occupied by another player', () => {
    let futureTileCoordinates = {x: 2, y: 1};
    expect(PlayerUtils.isNextTileOccupiedByAnotherPlayer({...futureTileCoordinates}, {...MOCK_MAP_FULL})).toEqual(true);
    futureTileCoordinates = {x: 1, y: 2};
    expect(PlayerUtils.isNextTileOccupiedByAnotherPlayer({...futureTileCoordinates}, {...MOCK_MAP_FULL})).toEqual(false);
  });

  it('should Move player to the right direction', () => {
    // Entry test Data
    const testEntryPlayer: Player = {
      name: 'Lara', positionX: 1, positionY: 1, direction: 'N', movesSequence: 'ADDAADAGAGA', isPlayerOnTreasure: true,
      lastTreasureFound: {positionX: 0, positionY: 3, nbOfTreasures: 2},
    };
    const testEntryGameMap: GameMap = {tiles: [['.', '.', '.'], ['.', 'A(Lara)', '.'], ['.', '.', '.']]};

    // Case user direction is NORTH
    spyOn(PlayerUtils, 'moveNorth');
    PlayerUtils.movePlayer({...testEntryPlayer}, {...testEntryGameMap});
    expect(PlayerUtils.moveNorth).toHaveBeenCalled();

    // Case user direction is SOUTH
    testEntryPlayer.direction = 'S';
    spyOn(PlayerUtils, 'moveSouth');
    PlayerUtils.movePlayer({...testEntryPlayer}, {...testEntryGameMap});
    expect(PlayerUtils.moveSouth).toHaveBeenCalled();

    // Case user direction is WEST
    testEntryPlayer.direction = 'W';
    spyOn(PlayerUtils, 'moveWest');
    PlayerUtils.movePlayer({...testEntryPlayer}, {...testEntryGameMap});
    expect(PlayerUtils.moveWest).toHaveBeenCalled();

    // Case user direction is EAST
    testEntryPlayer.direction = 'E';
    spyOn(PlayerUtils, 'moveEast');
    PlayerUtils.movePlayer({...testEntryPlayer}, {...testEntryGameMap});
    expect(PlayerUtils.moveEast).toHaveBeenCalled();
  });

  it('Should move player North, South , West and East', () => {
    // Entry Test Data
    const testEntryPlayer: Player = {
      name: 'Lara', positionX: 1, positionY: 1, direction: 'N', movesSequence: 'ADDAADAGAGA', isPlayerOnTreasure: true
    };
    const testEntryGameMap: GameMap = {tiles: [['.', '.', '.'], ['.', 'A(Lara)', '.'], ['.', '.', '.']]};
    // Result Test Data
    let resultGameSession: GameSession;

    // case player Is moving North
    resultGameSession = PlayerUtils.moveNorth({...testEntryPlayer}, {...testEntryGameMap});
    expect(resultGameSession.gameMap.tiles[0][1]).toEqual(`${mapElementsEnum.player}(${testEntryPlayer.name})`);
    expect(resultGameSession.player.positionY).toEqual(0);

    // case player is moving South
    testEntryPlayer.direction = 'S';
    resultGameSession = PlayerUtils.moveSouth({...testEntryPlayer}, {...testEntryGameMap});
    expect(resultGameSession.gameMap.tiles[2][1]).toEqual(`${mapElementsEnum.player}(${testEntryPlayer.name})`);
    expect(resultGameSession.player.positionY).toEqual(2);

    // case player is moving West
    testEntryPlayer.direction = 'W';
    resultGameSession = PlayerUtils.moveWest({...testEntryPlayer}, {...testEntryGameMap});
    expect(resultGameSession.gameMap.tiles[1][0]).toEqual(`${mapElementsEnum.player}(${testEntryPlayer.name})`);
    expect(resultGameSession.player.positionX).toEqual(0);

    // case player is moving East
    testEntryPlayer.direction = 'E';
    resultGameSession = PlayerUtils.moveEast({...testEntryPlayer}, {...testEntryGameMap});
    expect(resultGameSession.gameMap.tiles[1][2]).toEqual(`${mapElementsEnum.player}(${testEntryPlayer.name})`);
    expect(resultGameSession.player.positionX).toEqual(2);
  });

  it('should put back the right tile on the old player\'s position', () => {
    // Entry Test Data
    let resultGameMap: GameMap;
    let testEntryPlayer: Player = {
      name: 'Lara', positionX: 0, positionY: 3, direction: 'N', movesSequence: 'ADDAADAGAGA', isPlayerOnTreasure: true,
      lastTreasureFound: {positionX: 0, positionY: 3, nbOfTreasures: 2},
    };
    const testEntryGameMap: GameMap = {tiles: [['.', 'M', '.'], ['.', 'T(3)', 'A(Eric)'], ['.', '.', 'M'], ['A(Lara)', '.', '.']]};

    // case player is on a treasure
    resultGameMap = PlayerUtils.clearOldPlayerTile({...testEntryPlayer}, {...testEntryGameMap});
    expect(resultGameMap.tiles[testEntryPlayer.positionY][testEntryPlayer.positionX])
      .toEqual(`${mapElementsEnum.treasure}(${testEntryPlayer.lastTreasureFound.nbOfTreasures})`);

    // Case user is not on a treasure
    testEntryPlayer = {
      name: 'Lara',
      positionX: 0,
      positionY: 3,
      direction: 'N',
      movesSequence: 'ADDAADAGAGA',
      isPlayerOnTreasure: false
    };
    resultGameMap = PlayerUtils.clearOldPlayerTile({...testEntryPlayer}, {...testEntryGameMap});
    expect(resultGameMap.tiles[testEntryPlayer.positionY][testEntryPlayer.positionX])
      .toEqual(mapElementsEnum.plain);

  });


  it('Should change player\'s direction to North, South,West or East ', () => {
    // Entry Test Data
    const testEntryPlayer: Player = {
      name: 'Lara', positionX: 1, positionY: 1, direction: 'N', movesSequence: 'D', isPlayerOnTreasure: true
    };
    let testResultPlayer: Player;

    // Case player direction in NORTH
    testResultPlayer = PlayerUtils.turnWhenDirectionIsNorth({...testEntryPlayer}, 'G');
    expect(testResultPlayer.direction).toEqual('W');
    testResultPlayer = PlayerUtils.turnWhenDirectionIsNorth({...testEntryPlayer}, 'D');
    expect(testResultPlayer.direction).toEqual('E');

    // Case player direction in South
    testEntryPlayer.direction = 'S';
    testResultPlayer = PlayerUtils.turnWhenDirectionIsSouth({...testEntryPlayer}, 'G');
    expect(testResultPlayer.direction).toEqual('E');
    testResultPlayer = PlayerUtils.turnWhenDirectionIsSouth({...testEntryPlayer}, 'D');
    expect(testResultPlayer.direction).toEqual('W');

    // Case player direction is West
    testEntryPlayer.direction = 'W';
    testResultPlayer = PlayerUtils.turnWhenDirectionIsWest({...testEntryPlayer}, 'G');
    expect(testResultPlayer.direction).toEqual('S');
    testResultPlayer = PlayerUtils.turnWhenDirectionIsWest({...testEntryPlayer}, 'D');
    expect(testResultPlayer.direction).toEqual('N');

    // Case player direction is East
    testEntryPlayer.direction = 'E';
    testResultPlayer = PlayerUtils.turnWhenDirectionIsEast({...testEntryPlayer}, 'G');
    expect(testResultPlayer.direction).toEqual('N');
    testResultPlayer = PlayerUtils.turnWhenDirectionIsEast({...testEntryPlayer}, 'D');
    expect(testResultPlayer.direction).toEqual('S');

  });

  it('Should set Player\'s direction ', () => {
    // Entry Test Data
    const testEntryPlayer: Player = {
      name: 'Lara', positionX: 1, positionY: 1, direction: 'N', movesSequence: 'D', isPlayerOnTreasure: true
    };
    // Case player direction in NORTH
    spyOn(PlayerUtils, 'turnWhenDirectionIsNorth');
    PlayerUtils.setPlayerDirection({...testEntryPlayer}, 'G');
    expect(PlayerUtils.turnWhenDirectionIsNorth).toHaveBeenCalled();

    // Case player direction in South
    testEntryPlayer.direction = 'S';
    spyOn(PlayerUtils, 'turnWhenDirectionIsSouth');
    PlayerUtils.setPlayerDirection({...testEntryPlayer}, 'G');
    expect(PlayerUtils.turnWhenDirectionIsSouth).toHaveBeenCalled();

    // Case player direction is West
    testEntryPlayer.direction = 'W';
    spyOn(PlayerUtils, 'turnWhenDirectionIsWest');
    PlayerUtils.setPlayerDirection({...testEntryPlayer}, 'G');
    expect(PlayerUtils.turnWhenDirectionIsWest).toHaveBeenCalled();

    // Case player direction is East
    testEntryPlayer.direction = 'E';
    spyOn(PlayerUtils, 'turnWhenDirectionIsEast');
    PlayerUtils.setPlayerDirection({...testEntryPlayer}, 'G');
    expect(PlayerUtils.turnWhenDirectionIsEast).toHaveBeenCalled();
  });

  it('Should dig for a treasure on the current player position ', () => {
    let gameSession: GameSession;
    // Entry Test Data
    const testEntryPlayer: Player = {
      name: 'Lara',
      positionX: 0,
      positionY: 3,
      direction: 'N',
      movesSequence: 'D',
      nbOfFoundTreasures: 0,
      isPlayerOnTreasure: false,
      lastTreasureFound: {positionX: 0, positionY: 3, nbOfTreasures: 2},
    };
    // Case user is on a treasure
    gameSession = PlayerUtils.lookForTreasure({...testEntryPlayer}, {...MOCK_GAME_DATA});
    expect(gameSession.player.isPlayerOnTreasure).toEqual(true);
    expect(gameSession.player.nbOfFoundTreasures).toEqual(1);
    expect(gameSession.player.lastTreasureFound).toEqual({positionX: 0, positionY: 3, nbOfTreasures: 1});
    expect(gameSession.gameData.treasuresSpots[0].nbOfTreasures).toEqual(1);

    // Case user is not on a treasure
    testEntryPlayer.positionY = 2;
    gameSession = PlayerUtils.lookForTreasure({...testEntryPlayer}, {...MOCK_GAME_DATA});
    expect(gameSession.player).toEqual(testEntryPlayer);
    expect(gameSession.gameData.treasuresSpots).toEqual(MOCK_GAME_DATA.treasuresSpots);
  });
});

