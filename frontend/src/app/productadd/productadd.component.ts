import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../aServices/product.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrl: './productadd.component.css'
})
export class ProductaddComponent {
  model:any={};
  brandDetails:any;  
  categoryDetails: any;
  prdDetails: any;
  productNameError: string | null = null;
  categoryError: string | null = null;
  brandError: string | null = null;
  quantityError: string | null = null;
  priceError: string | null = null;
  constructor(private prdtService: ProductService, private toastrService: ToastrService,private router: Router){}

  ngOnInit(): void {
      this.model.pdtstatus = "available";
      var authUser = JSON.parse(localStorage.getItem('authUser') || "null");
      this.model.createdby = authUser.userId;
      this.getbrand();
      this.getcategory();
  }


// Validation for Product Name
validateProductName() {
  if (!this.model.productname || this.model.productname === '') {
    this.productNameError = 'This field is required.';
  } else {
    this.productNameError = null;
  }
}
    // Validation for select category
    validateCategory() {
      if (this.model.category === undefined || this.model.category === 'undefined') {
        this.categoryError = 'Please select a Category';
      } else {
        this.categoryError = null;
      }
    }

  // Validation for select brand
  validateBrand() {
    if (this.model.branddetails === undefined || this.model.branddetails === 'undefined') {
      this.brandError = 'Please select a Brand';
    } else {
      this.brandError = null;
    }
  }

  // Validation for Quanity
validateQuantity() {
  if (!this.model.qty || this.model.qty === '') {
    this.quantityError = 'This field is required';
  } else {
    this.quantityError = null;
  }
}

  // Validation for Price
  validateCost() {
    if (!this.model.pricevalue || this.model.pricevalue === '') {
      this.priceError = 'This field is required';
    } else {
      this.priceError = null;
    }
  }


  getbrand(){
    this.prdtService.getbrands()
    .subscribe(data=>{
      this.brandDetails = data;
    });
  }

  getcategory(){
    this.prdtService.getcategory()
    .subscribe(data=>{
      this.categoryDetails = data;
    });
  }

newProduct(){
  var params ={
    productname: this.model.productname,
    categoryId: this.model.category,
    brandId:this.model.branddetails,
    qty:this.model.qty,
    cost:this.model.pricevalue,
    availability: this.model.pdtstatus == 'available' ?  1 : 0,
    createdby: this.model.createdby
  };
  this.prdtService.createproduct(params)
  .subscribe(data=>{
    this.prdDetails = data;
    console.log(this.prdDetails,"this",this.prdDetails["status"]);
        if(this.prdDetails["status"]== 1){
          localStorage.setItem('addproduct',JSON.stringify({data}));
          this.router.navigate(['/products/list']);
        } else {
          this.toastrService.error(this.prdDetails["message"], 'Error!'); 
        }
  })
}

  createproduct(){
    this.validateProductName();
    this.validateCategory();
    this.validateBrand();
    this.validateQuantity()
    this.validateCost();

    if(!this.productNameError && !this.categoryError && !this.brandError && !this.quantityError && !this.priceError){
      this.newProduct();
    }
  }
     

}
