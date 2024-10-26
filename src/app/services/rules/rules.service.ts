import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../http.service";
import {Rules} from "../../components/rules/rules.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RulesService {


  private apiUrl = 'api/rules';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }



  constructor(private http: HttpClient, private httpService:HttpService<Rules>) { }

  getAllRules(): Observable<Rules[]> {
    // return this.http.get<User[]>(this.apiUrl);
    return this.httpService.getAll(this.apiUrl);
  }

  saveRules(data: Object): Observable<Rules> {
    return this.httpService.save(this.apiUrl,data);
  }

  getRulesById(id: string | null): Observable<Rules> {
    return this.httpService.getById(this.apiUrl,<string>id);
  }

  updateRules(id: string, data:Object): Observable<Rules> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deleteRules(id: string): Observable<Rules> {
    return this.httpService.delete(this.apiUrl,id);
  }

}
