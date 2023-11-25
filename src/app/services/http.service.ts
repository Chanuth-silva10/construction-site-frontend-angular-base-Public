import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {
  baseUrl:string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
    }),
  }

  getAll(url:string){
    return this.http.get<T[]>(this.baseUrl+url);
  }
  save(url:string, data: Object): Observable<T> {
    return this.http.post<T>(this.baseUrl+url, data, this.httpOptions);
  }

  getById(url: string,id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl+url}/${id}`);
  }

  update(url: string,id: string, data:Object): Observable<T> {
    return this.http.put<T>(`${this.baseUrl+url}/${id}`,data, this.httpOptions);
  }

  delete(url: string,id: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl+url}/${id}`);
  }
  updateStatus(url: string, data:Object): Observable<T> {
    return this.http.put<T>(`${this.baseUrl+url}/status`,data);
  }

  addComment(url: string,id:string, data:Object): Observable<T> {
    console.log(`${this.baseUrl+url}/comments/${id}`);
    return this.http.post<T>(`${this.baseUrl+url}/comments/${id}`,data);
  }
}

