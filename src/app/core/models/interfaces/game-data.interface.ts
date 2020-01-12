export type direction = 'S' | 'N'

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
  initialPositionX: number,
  initialPositionY: number,
  direction: direction,
  movements: string,
}


export interface gameDataInterface {
  mapSize :mapSize
  mountains : Array<mountain>
  treasuresSpots: Array<treasures>
  players: Array<player>
}
