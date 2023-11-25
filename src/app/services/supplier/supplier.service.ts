import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HttpService} from "../http.service";
import {Supplier} from "../../components/supplier/supplier.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'api/Supplier';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<Supplier>) { }

  getAllSuppliers(): Observable<Supplier[]> {
    // return this.http.get<User[]>(this.apiUrl);
    return this.httpService.getAll(this.apiUrl);
  }

  saveSupplier(data: Object): Observable<Supplier> {
    return this.httpService.save(this.apiUrl,data);
  }

  getSupplierById(id: string | null): Observable<Supplier> {
    return this.httpService.getById(this.apiUrl,<string>id);
  }

  updateSupplier(id: string, data:Object): Observable<Supplier> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  deleteSupplier(id: string): Observable<Supplier> {
    return this.httpService.delete(this.apiUrl,id);
  }

}
