import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as config from  '../../../server.config.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl: string = (config as any).apiurl;
  
  constructor(private http: HttpClient) { 

  }
  getbrands(){
    return this.http.get(`${this.apiUrl}/getbrand`);
  }
  getcategory(){
    return this.http.get(`${this.apiUrl}/getcategory`);
  }

  getproductDetails(params:any){
    return this.http.post(`${this.apiUrl}/getproductDetails`,params);

  } 
  createproduct(params: any){
      return this.http.post(`${this.apiUrl}/createproduct`,params);
  }

  getProduct(){
    return this.http.get(`${this.apiUrl}/getproductlist`);
  }

  updateProduct(params: any){
    return this.http.post(`${this.apiUrl}/updateproduct`,params);
  }

  addsoldProduct(params: any){
    return this.http.post(`${this.apiUrl}/addsoldproduct`,params);
  }

  getAllSales(){
    return this.http.get(`${this.apiUrl}/getsaleslist`);
  }

  deleteProduct(params: any){
    return this.http.post(`${this.apiUrl}/deleteproductid`,params);
  }

  generateInvoice(params: any){
    return this.http.post(`${this.apiUrl}/generateInvoice`,params);
  }
  
  downloadInvoice(invoiceId: string): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/${invoiceId}`, { responseType: 'blob' as 'json' });
  }

}
