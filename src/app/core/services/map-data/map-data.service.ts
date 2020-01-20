import {Injectable} from '@angular/core';
import {GameData} from "../../../shared/models/interfaces/gameData";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapDataService {

  constructor( private http: HttpClient) { }

  getGameInitialisationData(): Observable<GameData> {
    return this.http.get<GameData>('./assets/data/game_data.json');
  }
}
