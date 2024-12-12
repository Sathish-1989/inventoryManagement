import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../aServices/product.service';

@Component({
  selector: 'app-productmodify',
  templateUrl: './productmodify.component.html',
  styleUrl: './productmodify.component.css'
})
export class ProductmodifyComponent implements OnInit{
  model:any={};
  brandDetails:any;  
  categoryDetails: any;
  prdDetails: any;
  pId!: number;
  productNameError: string | null = null;
  categoryError: string | null = null;
  brandError: string | null = null;
  quantityError: string | null = null;
  priceError: string | null = null;
  constructor(private productService: ProductService, private toastrService: ToastrService,private router: Router, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pId = +params.get('pId')! || 0; // Use '!' to assert non-null, with fallback to 0
      console.log('Loaded user with ID:', this.pId);
      // Now, you can use this.productId safely
    });
      this.model.pdtstatus = "1";
      var currentuser = JSON.parse(localStorage.getItem('authUser') || "null");
      this.model.updatedby = currentuser.userId;
      this.getbrand();
      this.getcategory();
      this.getProductDetails();
  }

    
  cancelButton(){
    this.router.navigate(['/products/list']);
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

  // Validation for Quanity
  validateCost() {
    if (!this.model.pricevalue || this.model.pricevalue === '') {
      this.priceError = 'This field is required';
    } else {
      this.priceError = null;
    }
  }



  getbrand(){
    this.productService.getbrands()
    .subscribe(data=>{
      this.brandDetails = data;
    });
  }

  getcategory(){
    this.productService.getcategory()
    .subscribe(data=>{
      this.categoryDetails = data;
    });
  }

  getProductDetails(){
    var params = { pId: this.pId}
      this.productService.getproductDetails(params)
      .subscribe(data=>{
          this.prdDetails = data;
          this.model.productname = this.prdDetails[0].product_name;
          this.model.category = this.prdDetails[0].category_id_fk;
          this.model.branddetails = this.prdDetails[0].brand_id_fk;
          this.model.qty = this.prdDetails[0].product_qty;
          this.model.pricevalue = this.prdDetails[0].total_price.toFixed(2);
          this.model.pdtstatus = this.prdDetails[0].product_status == 1 ? 'available' : 'unavailable';
      })
  }


  modifyProduct(){
    var params ={
      productname: this.model.productname,
      categoryId: this.model.category,
      brandId:this.model.branddetails,
      qty:this.model.qty,
      cost:this.model.pricevalue,
      availability: this.model.pdtstatus == 'available' ?  1 : 0,
      updatedby: this.model.updatedby,
      pId : this.pId
    };
    this.productService.updateProduct(params)
    .subscribe(data=>{
      this.prdDetails = data;
          if(this.prdDetails["status"]== 1){
            localStorage.setItem('addproduct',JSON.stringify({data}));
            this.router.navigate(['/products/list']);
          } else {
            this.toastrService.error(this.prdDetails["message"], 'Error!'); 
          }
    })
  }
  
  updateProduct(){
    this.validateProductName();
    this.validateCategory();
    this.validateBrand();
    this.validateQuantity()
    this.validateCost();

    if(!this.productNameError && !this.categoryError && !this.brandError && !this.quantityError && !this.priceError){
      this.modifyProduct();
    }
  }
}
