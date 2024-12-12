import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Route,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../aServices/product.service';
import * as config from  '../../../server.config.json';

@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrl: './saleslist.component.css'
})
export class SaleslistComponent implements OnInit{
  private apiUrl: string = (config as any).apiurl;
  salesList: any;
  count: any;
  p: number=1;
  roleId: any;
  userId: any;
  invoiceData: any;
  constructor(private router:Router,private productService: ProductService,private toastrService:ToastrService,private http: HttpClient){

  }
  ngOnInit(): void {
    this.Saleslist();
    this.getMessage();
    var authUser = JSON.parse(localStorage.getItem('authUser') || "null");
    this.roleId = authUser.role_id;
    this.userId = authUser.userId;
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.Saleslist();
}

getProductId(pId: number){
  this.router.navigate(['/products/modify',pId]);
}
generateInvoice(invoiceDetails: any){
  console.log(invoiceDetails,"ssssssssss")
  var params={invoiceDetails, userId:this.userId};
  this.productService.generateInvoice(params)
  .subscribe(data =>{
      this.invoiceData = data;
      if( this.invoiceData['status'] == 1){
        this.toastrService.success(this.invoiceData["message"], 'Success');
      } else {
        this.toastrService.error(this.invoiceData['message'],'Error');
      }
      this.Saleslist();
  })
}
Saleslist(){
  this.productService.getAllSales()
  .subscribe(data=>{
    console.log(data,"data")
    this.salesList = data;
    this.count = this.salesList.length;
    console.log(this.salesList,this.count,"sss")
  })
}


downloadInvoice(invoiceId: string): void {
  const invoiceUrl = `${this.apiUrl}/invoices/${invoiceId}.pdf`;  // URL of the invoice

  // Use fetch to get the file as a Blob
  fetch(invoiceUrl)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);  // Create an object URL for the Blob
      link.href = url;
      link.download = `${invoiceId}.pdf`;  // Suggest the filename for download
      link.click();
      window.URL.revokeObjectURL(url);  // Revoke the object URL to release memory
    })
    .catch(error => {
      console.error('Error downloading the invoice:', error);
    });
}

deleteFn(params : any){

}
getMessage(){
  const addproductmessage = JSON.parse(localStorage.getItem('addsales') ?? "null");
    console.log(addproductmessage,"addproductmessage");
    if(addproductmessage && addproductmessage.data){
      if( addproductmessage.data['status'] == 1){
        this.toastrService.success(addproductmessage.data["message"], 'Success');
      } else {
        this.toastrService.error(addproductmessage.data['message'],'Error');
      }
    }
 
    localStorage.removeItem('addsales');
}
}
