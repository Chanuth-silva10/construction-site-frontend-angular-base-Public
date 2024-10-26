import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../http.service";
import {Invoice} from "../../components/invoices/invoice.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'api/payments';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Invoice>) { }

  getAllInvoices(): Observable<Invoice[]> {
    return this.httpService.getAll(this.apiUrl);
  }

  saveInvoice(data: Object): Observable<Invoice> {
    return this.httpService.save(this.apiUrl, data);
  }

  getInvoiceById(id: any): Observable<Invoice> {
    return this.httpService.getById(this.apiUrl,id);
  }

  updateInvoice(id: string, data:Object): Observable<Invoice> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deleteInvoice(id: string): Observable<Invoice> {
    return this.httpService.delete(this.apiUrl,id);
  }
}
