import {GameData, Player} from "../../app/shared/models/interfaces/gameData";
import {GameMap} from "../../app/shared/models/interfaces/game-map.interface";

export const MOCK_GAME_DATA: GameData = {
  mapSize: {
    nbHorizontalTiles: 3,
    nbVerticalTiles: 4
  },
  mountains: [
    {
      positionX: 1,
      positionY: 0
    },
    {
      positionX: 2,
      positionY: 2
    }
  ],
  treasuresSpots: [
    {
      positionX: 0,
      positionY: 3,
      nbOfTreasures: 2
    },
    {
      positionX: 1,
      positionY: 1,
      nbOfTreasures: 3
    }
  ],
  players: [
    {
      name: "Lara",
      positionX: 1,
      positionY: 3,
      direction: "S",
      movesSequence: "AADADA",
    },
    {
      name: "Eric",
      positionX: 2,
      positionY: 1,
      direction: "S",
      movesSequence: "AADADA"
    },
  ]
};

export const MOCK_PLAYER: Player = {
  name: "Lara",
  positionX: 1,
  positionY: 3,
  direction: "S",
  movesSequence: "ADDAADAGAGA",
  isPlayerOnTreasure: false,
};

export const MOCK_PLAIN_MAP: GameMap = {
  tiles:
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."]
    ]
};
export const MOCK_MAP_WITH_MOUNTAINS: GameMap = {
  tiles:
    [
      [".", "M", "."],
      [".", ".", "."],
      [".", ".", "M"],
      [".", ".", "."]
    ]
};
export const MOCK_MAP_WITH_TREASURES: GameMap = {
  tiles:
    [
      [".", "M", "."],
      [".", "T(3)", "."],
      [".", ".", "M"],
      ["T(2)", ".", "."]
    ]
};

export const MOCK_MAP_FULL: GameMap = {
  tiles:
    [
      [".", "M", "."],
      [".", "T(3)", "A(Eric)"],
      [".", ".", "M"],
      ["T(2)", "A(Lara)", "."]
    ]
};
