import { Constants } from '@/helpers/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public resourceUrl = `${Constants.SERVER_API_URL}/api/ticket`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.resourceUrl}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  create(req : any) {
    const payload = {
      email: req.email,
      name: req.name,
      phone: req.phone,
      content: req.content
    }
    return this.http.post(`${this.resourceUrl}`, payload)
  }

  edit(req: any) {
    const payload = {
      _id: req._id,
      email: req.email,
      name: req.name,
      phone: req.phone,
      content: req.content
    }
    return this.http.put(`${this.resourceUrl}/${req._id}`, payload)
  }
}
