import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as config from  '../../../server.config.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = (config as any).apiurl;

  constructor(private http:HttpClient) { }

  getuseroles(params:any){
      return this.http.post(`${this.apiUrl}/getroles`,params)
  }

  getUserDesignation(params:any){
    return this.http.post(`${this.apiUrl}/getDesignation`,params)
}
  
  listuser(params:any){
    return this.http.post(`${this.apiUrl}/getuser`,params);
  }

  createuser(params:any){
      return this.http.post(`${this.apiUrl}/createuser`,params);
  }

  getViewData(params:any){
    return this.http.post(`${this.apiUrl}/getviewData`,params);

  }
  updateUser(params:any){
    return this.http.post(`${this.apiUrl}/updateuser`,params);
  }

  deleteUser(params: any){
    return this.http.post(`${this.apiUrl}/deleteuserid`,params);
  }
}
