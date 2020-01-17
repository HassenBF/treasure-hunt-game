import { Injectable } from '@angular/core';
import {gameData} from "../../../shared/models/interfaces/game.data";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  constructor( private http: HttpClient) { }

  getGameInitialisationData(): Observable<gameData> {
    return this.http.get<gameData>('./assets/data/game_data.json');
  }
}
