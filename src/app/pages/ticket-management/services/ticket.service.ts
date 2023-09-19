import { Constants } from '@/helpers/constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public resourceUrl = `${Constants.SERVER_API_URL}`;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.resourceUrl}/api/ticket`);
  }
}
