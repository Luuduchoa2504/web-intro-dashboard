import { Injectable } from '@angular/core';
import {Constants} from "@/helpers/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public resourceUrl = `${Constants.SERVER_API_URL}`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/api/admin/getAll`);
  }

  create(user: any): Observable<any> {
    return this.http.post(`${this.resourceUrl}/create`, user);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/api/delete/${id}`)
  }
}
