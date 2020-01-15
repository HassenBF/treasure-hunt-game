export type direction = 'S' | 'N' | 'E' | 'W'
export type singleMove = 'A' |'G'| 'D'

export interface tileCoordinates {
  x:number;
  y:number;
}

export interface mapSize  {
  nbHorizontalTiles: number,
  nbVerticalTiles: number
}

export interface mountain {
  positionX: number,
  positionY: number,
}

export interface treasures {
  positionX: number,
  positionY: number,
  nbOfTreasures: number,
}

export interface player {
  name: string,
  positionX: number,
  positionY: number,
  direction: direction,
  movesSequence: string | singleMove,
  priority?: number;
  nbOfFoundTreasures?: number;
}


export interface gameDataInterface {
  mapSize :mapSize
  mountains : Array<mountain>
  treasuresSpots: Array<treasures>
  players: Array<player>
}
