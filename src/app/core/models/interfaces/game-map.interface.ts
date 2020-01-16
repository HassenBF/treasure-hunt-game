export type mapElement = '.' | 'M' | 'A' | 'T(1)' | 'T(2)' | 'T(3)' | 'T(4)' | 'T(5)';


export interface gameMap {
    tiles: mapElement[][];
}
