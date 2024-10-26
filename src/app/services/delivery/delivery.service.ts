import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../http.service";
import {Delivery} from "../../components/deliveries/delivery.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  private apiUrl = 'api/deliveries';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Delivery>) { }

  getAllDeliveries(): Observable<Delivery[]> {
    return this.httpService.getAll(this.apiUrl);
  }

  saveDelivery(data: Object): Observable<Delivery> {
    return this.httpService.save(this.apiUrl,data);
  }

  getDeliveryById(id: any): Observable<Delivery> {
    return this.httpService.getById(this.apiUrl,id);
  }

  updateDelivery(id: string, data:Object): Observable<Delivery> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deleteDelivery(id: string): Observable<Delivery> {
    return this.httpService.delete(this.apiUrl,id);
  }


}
