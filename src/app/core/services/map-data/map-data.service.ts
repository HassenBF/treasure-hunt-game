import { Injectable } from '@angular/core';
import {gameDataInterface} from "../../models/interfaces/game-data.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  constructor( private http: HttpClient) { }

  getGameInitialisationData(): Observable<gameDataInterface> {
    return this.http.get<gameDataInterface>('./assets/data/game_data.json');
  }
}
