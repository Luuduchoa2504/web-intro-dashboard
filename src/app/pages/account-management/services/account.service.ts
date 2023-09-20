import { Injectable } from '@angular/core';
import { Constants } from "@/helpers/constants";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public resourceUrl = `${Constants.SERVER_API_URL}`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/api/user/getAll`);
  }

  delete(id) {
    return this.http.delete(`${this.resourceUrl}/api/delete/${id}`);
  }
}
