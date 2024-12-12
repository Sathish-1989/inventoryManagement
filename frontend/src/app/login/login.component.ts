import { Component, OnInit } from '@angular/core';
import { AuthServices } from '../aServices/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any={};
  success: any={};
  tempuser :any={};
  message:any={};
  testfile : any ={};
  returnUrl: any={};

  constructor(private authServices: AuthServices,  private route: ActivatedRoute, private router : Router, private toastrService: ToastrService) { 
    
  }

  ngOnInit(): void {
    const collection = document.getElementById("dynamic-component");
    if (collection) {
      collection.style.marginLeft = "0px"
    }
    console.log(collection)
    const Semidata = localStorage.getItem('authUser');
    this.tempuser =  Semidata != null ? JSON.parse(Semidata) : null;
    if(this.tempuser != null){
      this.router.navigate(['/dashboard']);
    } 
  }

  authlogin(){
    var params = this.model;
    this.authServices.login(params)
    .subscribe(data => {
      this.success = data;
      if(this.success['status'] == 1){
      this.testfile = this.success['userId'];
       this.message = localStorage.setItem('message',JSON.stringify({data}));
       this.router.navigate(['/dashboard']);
      } else {
        this.toastrService.error(this.success["message"], 'Error!');
      }
  
    })
  }
}

