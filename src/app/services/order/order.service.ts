import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../http.service";
import {Order} from "../../components/order/order.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'api/orders';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Order>) { }

  getAllOrders(): Observable<Order[]> {
    return this.httpService.getAll(this.apiUrl);
  }

  saveOrder(data: Object): Observable<Order> {
    return this.httpService.save(this.apiUrl,data);
  }

    getOrderById(id: string | null): Observable<Order> {
    return this.httpService.getById(this.apiUrl,<string>id);
  }

  getPendingApprovalOrders(type: string | null): Observable<Order[]> {
    return this.httpService.getAll(`${this.apiUrl}/Waiting for Approval/${type}`);
  }

  updateOrder(id: string, data:Object): Observable<Order> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  updateOrderStatus(id: string, data:Object): Observable<Order> {
    return this.httpService.update(this.apiUrl+"/status",id,data);
  }

  deleteOrder(id: string): Observable<Order> {
    return this.httpService.delete(this.apiUrl,id);
  }

  addComment(id: string, data:Object): Observable<Order> {
    console.log("addComment");
    return this.httpService.addComment(this.apiUrl,id,data);
  }


}
