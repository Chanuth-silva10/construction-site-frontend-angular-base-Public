import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ObservedValueOf } from 'rxjs';
import { Item } from '../../components/items/item.model';
import {HttpService} from "../http.service";
import {Order} from "../../components/order/order.model";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'api/items';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Item>) { }

  getAllItems(): Observable<Item[]> {
    return this.httpService.getAll(this.apiUrl);
  }

  saveItem(data: Object): Observable<Item> {
    return this.httpService.save(this.apiUrl,data);
  }

    getItemById(id: string | null): Observable<Item> {
    return this.httpService.getById(this.apiUrl,<string>id);
  }

  updateItem(id: string, data:Object): Observable<Item> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deleteItem(id: string): Observable<Item> {
    return this.httpService.delete(this.apiUrl,id);
  }

  getItemsBySupplierId(id: string): Observable<Item> {
    return this.httpService.getById(this.apiUrl+"/supplier",id);
  }
}
