export type direction = 'S' | 'N' | 'E' | 'W'
export type singleMove = 'A' |'G'| 'D'

export interface TileCoordinates {
  x:number;
  y:number;
}

export interface MapSize  {
  nbHorizontalTiles: number,
  nbVerticalTiles: number
}


export interface Mountain {
  positionX: number,
  positionY: number,
}

export interface Treasures {
  positionX: number,
  positionY: number,
  nbOfTreasures: number,
}

export interface Player {
  name: string,
  positionX: number,
  positionY: number,
  direction: direction,
  movesSequence: string ,
  priority?: number;
  nbOfFoundTreasures?: number;
  isPlayerOnTreasure?:boolean
  lastTreasureFound?: Treasures;
}


export interface GameData {
  mapSize :MapSize
  mountains : Array<Mountain>
  treasuresSpots: Array<Treasures>
  players: Array<Player>
}
