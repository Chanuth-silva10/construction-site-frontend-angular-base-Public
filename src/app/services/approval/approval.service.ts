import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import {HttpService} from "../http.service";

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

  private apiUrl = 'api/approvals';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Approval>) { }

  getAllApprovals(): Observable<Approval[]> {
    return this.httpService.getAll(this.apiUrl);
  }

  saveApproval(data: Object): Observable<Approval> {
    return this.httpService.save(this.apiUrl,data);
  }

  getApprovalById(id: string): Observable<Approval> {
    return this.httpService.getById(this.apiUrl,id);
  }

  updateApproval(id: string, data:Object): Observable<Approval> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deleteApproval(id: string): Observable<Approval> {
    return this.httpService.delete(this.apiUrl,id);
  }

}
