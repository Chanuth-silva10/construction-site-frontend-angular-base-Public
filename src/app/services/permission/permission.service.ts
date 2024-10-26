import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../http.service";
import {Permission} from "../../components/permission/permission.model";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private apiUrl = 'api/Permission';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Permission>) { }

  getAllPermissions(): Observable<Permission[]> {
    // return this.http.get<User[]>(this.apiUrl);
    return this.httpService.getAll(this.apiUrl);
  }

  savePermission(data: Object): Observable<Permission> {
    return this.httpService.save(this.apiUrl,data);
  }

  getPermissionById(id: string | null): Observable<Permission> {
    return this.httpService.getById(this.apiUrl,<string>id);
  }

  updatePermission(id: string, data:Object): Observable<Permission> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deletePermission(id: string): Observable<Permission> {
    return this.httpService.delete(this.apiUrl,id);
  }

}
