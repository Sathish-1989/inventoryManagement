import { Component, OnInit } from '@angular/core';
import { Route,Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../aServices/product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent implements OnInit{

  productList: any;
  count: any;
  p: number=1;
  roleId: any;
  deleteId!: number;
  deleteData: any;
  constructor(private router:Router,private productService: ProductService,private toastrService:ToastrService){

  }
  ngOnInit(): void {
    this.productlist();
    this.getMessage();
    var authUser = JSON.parse(localStorage.getItem('authUser') || "null");
    this.roleId = authUser.role_id;
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.productlist();
}

getProductId(pId: number){
  this.router.navigate(['/products/modify',pId]);
}

productlist(){
  this.productService.getProduct()
  .subscribe(data=>{
    console.log(data,"data")
    this.productList = data;
    this.count = this.productList.length;
    console.log(this.productList,this.count,"sss")
  })
}

getdeleteId(id:any){
  this.deleteId = id;
}
deleteFn(){
 var params = { deleteID: this.deleteId};
 this.productService.deleteProduct(params)
 .subscribe(data=>{
   this.deleteData = data;
   if(this.deleteData["status"] == 1){
     this.toastrService.success(this.deleteData["message"], 'Success');
   } else {
     this.toastrService.error(this.deleteData["message"],'Error');
   }
   this.productlist();
 })
}

getMessage(){
  const addproductmessage = JSON.parse(localStorage.getItem('addproduct') ?? "null");
    console.log(addproductmessage,"addproductmessage");
    if(addproductmessage && addproductmessage.data){
      if( addproductmessage.data['status'] == 1){
        this.toastrService.success(addproductmessage.data["message"], 'Success');
      } else {
        this.toastrService.error(addproductmessage.data['message'],'Error');
      }
    }
 
    localStorage.removeItem('addproduct');
}
}
