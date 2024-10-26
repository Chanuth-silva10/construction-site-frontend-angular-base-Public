import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../http.service";
import {Site} from "../../components/site/site.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private apiUrl = 'api/site';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Site>) {}


  getAllSite(): Observable<Site[]> {
    // return this.http.get<User[]>(this.apiUrl);
    return this.httpService.getAll(this.apiUrl);
  }

  saveSite(data: Object): Observable<Site> {
    return this.httpService.save(this.apiUrl,data);
  }

  getSiteById(id: string | null): Observable<Site> {
    return this.httpService.getById(this.apiUrl,<string>id);
  }

  updateSite(id: string, data:Object): Observable<Site> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deleteSite(id: string): Observable<Site> {
    return this.httpService.delete(this.apiUrl,id);
  }

}
