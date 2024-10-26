import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from '../../components/permissions/permission.model';
import {HttpService} from "../http.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private apiUrl = 'api/permission';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Permission>) { }

  getAllPermissions(): Observable<Permission[]> {
    return this.httpService.getAll(this.apiUrl);
  }

  savePermission(data: Object): Observable<Permission> {
    return this.httpService.save(this.apiUrl,data);
  }

  getPermissionById(id: any): Observable<Permission> {
    return this.httpService.getById(this.apiUrl,id);
  }

  updatePermission(id: string, data:Object): Observable<Permission> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deletePermission(id: string): Observable<Permission> {
    return this.httpService.delete(this.apiUrl,id);
  }

}
