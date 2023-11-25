import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import {Category} from "../../components/category/category.model";
import {HttpService} from "../http.service";


@Injectable({

  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'api/category';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Category>) { }

  getAllCategory(): Observable<Category[]> {
    // return this.http.get<User[]>(this.apiUrl);
    return this.httpService.getAll(this.apiUrl);
  }

  saveCategory(data: Object): Observable<Category> {
    return this.httpService.save(this.apiUrl,data);
  }

  getCategoryById(id: string | null): Observable<Category> {
    return this.httpService.getById(this.apiUrl,<string>id);
  }

  updateCategory(id: string, data:Object): Observable<Category> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deleteCategory(id: string): Observable<Category> {
    return this.httpService.delete(this.apiUrl,id);
  }

}
