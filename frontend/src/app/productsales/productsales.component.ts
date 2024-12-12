import { Component, OnInit } from '@angular/core';
import { ProductService } from '../aServices/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-productsales',
  templateUrl: './productsales.component.html',
  styleUrl: './productsales.component.css'
})
export class ProductsalesComponent implements OnInit {
  model:any={};
  productList: any;
  customerNameError : string | null = null;
  customerPhoneError: string | null = null;
  customerMailError: string | null = null;
  productError : string | null = null;
  quantityError: string | null = null;
  limit: any; cost:any;
  soldList: any;
    constructor(private productService: ProductService, private router:Router, private toastrService: ToastrService ){

    }

ngOnInit(): void {
  this.getProductlist();
  var authUser = JSON.parse(localStorage.getItem('authUser') || "null");
  this.model.soldby = authUser.userId;
}



getProductlist(){
  this.productService.getProduct()
  .subscribe(data=>{
    console.log(data,"data")
    this.productList = data;
    // this.count = this.productList.length;
    // console.log(this.productList,this.count,"sss")
  })
}

getqtyCount(){
  // console.log((this.model.qtycount),"what is coming")
   this.limit = this.model.qtycount["product_qty"];
   this.cost = this.model.qtycount["price_per_qty"];
   this.model.productId = this.model.qtycount["product_id"];

}
// Validation for Customer Name
validateCustomerName() {
  if (!this.model.customername || this.model.customername === '') {
    this.customerNameError = 'This field is required.';
  } else {
    this.customerNameError = null;
  }
}

// Validation for Customer Mail Id
validateCustomerMail() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.model.customermailid || this.model.customermailid === '') {
        this.customerMailError = 'This field is required.';
      } else if (!emailRegex.test(this.model.customermailid)) {
        this.customerMailError = 'Enter a valid email address.';
      } else {
        this.customerMailError = null;
      }
}

// Validation for Customer Mail Id
validateMobileNumber() {
  const pattern = /^(3538\d{8}|08\d{8})$/; // Irish mobile number pattern
  if (!this.model.customerphone || this.model.customerphone === '') {
    this.customerPhoneError = 'Mobile number is required.';
  } else if (!pattern.test(this.model.customerphone)) {
    this.customerPhoneError = 'Enter a valid Irish mobile number (e.g., 353831234567 or 0831234567).';
  } else {
    this.customerPhoneError = null; // No error
  }
}


    // Validation for Select Product
    validateProduct() {
      if (this.model.qtycount === undefined || this.model.qtycount === 'undefined') {
        this.productError = 'Please select a Category';
      } else {
        this.productError = null;
      }
    }

validateQuantity() {
  const minLimit = 1; // Minimum value
  const maxLimit = this.limit; // Dynamic maximum value
  
  if (!this.model.qtylimit || this.model.qtylimit.trim() === '') {
    this.quantityError = 'This field is required.';
  } else if (isNaN(this.model.qtylimit)) {
    this.quantityError = 'Enter a valid number.';
  } else if (+this.model.qtylimit < minLimit) {
    this.quantityError = `Quantity must be at least ${minLimit}.`;
  } else if (+this.model.qtylimit > maxLimit) {
    this.quantityError = `Availabile Quantity is ${maxLimit}.`;
  } else {
    this.quantityError = null; // No error
  }
  this.model.pricevalue = (this.cost * this.model.qtylimit).toFixed(2);
}

soldproducts(){
var params={
  custname : this.model.customername,
  custmobile : this.model.customerphone,
  custmailid: this.model.customermailid,
  productId: this.model.productId,
  purchaseqty: this.model.qtylimit,
  totalprice: this.model.pricevalue,
  soldby:this.model.soldby
};
this.productService.addsoldProduct(params)
.subscribe(data=>{
  this.productList = data;
  console.log(this.productList,"this",this.productList["status"]);
      if(this.productList["status"]== 1){
        localStorage.setItem('addsales',JSON.stringify({data}));
        this.router.navigate(['/sales/list']);
      } else {
        this.toastrService.error(this.productList["message"], 'Error!'); 
      }

});

}

  Saleproducts(){
    this.validateCustomerMail();
    this.validateCustomerName();
    this.validateMobileNumber();
    this.validateProduct();
    this.validateQuantity();
    if(!this.customerNameError && !this.customerMailError && !this.customerPhoneError && !this.productError && !this.quantityError){
              this.soldproducts();
    }
  }
}
