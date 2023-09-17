import { Injectable } from '@angular/core';
import { Constants } from "@/helpers/constants";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public resourceUrl = `${Constants.SERVER_API_URL}/api/email`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.resourceUrl}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }
}
