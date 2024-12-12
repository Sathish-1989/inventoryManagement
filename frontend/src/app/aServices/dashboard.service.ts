import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as config from  '../../../server.config.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    private apiUrl: string = (config as any).apiurl;
  
    constructor(private http: HttpClient) { 
  
    }
    getDetails(){
      return this.http.get(`${this.apiUrl}/getDetails`);
    }

}