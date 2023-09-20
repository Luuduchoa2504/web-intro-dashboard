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
    return this.http.delete(`${this.resourceUrl}/api/user/${id}`);
  }

  create(req : any) {
    const payload = {
      email: req.email,
      name: req.name,
      phone: req.phone,
      password: req.password,
      role: 0
    }
    return this.http.post(`${this.resourceUrl}/api/create`, payload)
  }

  edit(req: any) {
    const payload = {
      _id: req._id,
      email: req.email,
      name: req.name,
      phone: req.phone,
      password: req.password,
      role: 0,
    }
    return this.http.put(`${this.resourceUrl}/api/user/${req._id}`, payload)
  }
}
