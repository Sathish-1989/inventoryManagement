import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../aServices/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrl: './adduser.component.css'
})
export class AdduserComponent implements OnInit {
    rolesData: any;
    desData: any;
    myroles:any=[];
    model:any={};
    userData : any;
    firstNameError: string | null = null;
    lastNameError: string | null = null;
    emailError: string | null = null;
    passwordError: string | null = null;
    roleError: string | null = null;
    desError:string | null =null;
    constructor(private router:Router,private userService: UserService,private toastrService:ToastrService){}

    ngOnInit(): void {
      this.model.userstatus = 'active';
      var authUser = JSON.parse(localStorage.getItem('authUser') || "null");
      this.model.createdby = authUser.userId;
      this.model.roleId = authUser.role_id;
      console.log(this.model)
      this.getRoles();
      this.getDesignation();

    }

    validateFirstName() {
      if (!this.model.firstname || this.model.firstname === '') {
        this.firstNameError = 'This field is required.';
      } else {
        this.firstNameError = null;
      }
    }
    validateLastName() {
      if (!this.model.lastname || this.model.lastname === '') {
        this.lastNameError = 'This field is required.';
      } else {
        this.lastNameError = null;
      }
    }
  
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.model.email || this.model.email.trim() === '') {
        this.emailError = 'This field is required.';
      } else if (!emailRegex.test(this.model.email)) {
        this.emailError = 'Enter a valid email address.';
      } else {
        this.emailError = null;
      }
    }
  
    validatePassword() {
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!this.model.password || this.model.password.trim() === '') {
        this.passwordError = 'This field is required.';
      } else if (this.model.password.length < 6) {
        this.passwordError = 'Password must be at least 6 characters.';
      } else if(!passwordPattern.test(this.model.password)){
        this.passwordError ='Password must include at least one letter, one number, and one special character.';
      } else {
        this.passwordError = null;
      }
    }
  
      // Validation for select role
  validateRole() {
    if (this.model.selectedRole === undefined || this.model.selectedRole === 'undefined') {
      this.roleError = 'Please select a role.';
    } else {
      this.roleError = null;
    }
  }

  validateDesignation() {
    if (this.model.selectedDes === undefined || this.model.selectedDes === 'undefined') {
      this.desError = 'Please select a designation.';
    } else {
      this.desError = null;
    }
  }


    getRoles(){
      var params ={roleid: this.model.roleId};
      this.userService.getuseroles(params)
      .subscribe(data=>{
        this.rolesData = data;
      })
    }

    getDesignation(){
      var params ={roleid: this.model.roleId};
      this.userService.getUserDesignation(params)
      .subscribe(data=>{
        this.desData = data;
      })
    }

    addfunction(){
      var params = {};
      params ={
        firstname: this.model.firstname,
        lastname: this.model.lastname,
        password: this.model.password,
        roleid: this.model.selectedRole,
        desid: this.model.selectedDes,
        email: this.model.email,
        status:this.model.userstatus == 'active' ? 1 :0,
        createdby:this.model.createdby
      };
      this.userService.createuser(params)
      .subscribe(data=>{
        this.userData = data;
        console.log(this.userData,"this",this.userData["status"]);
            if(this.userData["status"]== 1){
              localStorage.setItem('adduser',JSON.stringify({data}));
              this.router.navigate(['/user/list']);
            } else {
              this.toastrService.error(this.userData["message"], 'Error!'); 
            }

      })
    }

    createUser() {
      // Perform validation here
      this.validateFirstName();
      this.validateLastName();
      this.validatePassword();
      this.validateRole();
      this.validateEmail();    
      this.validateDesignation();
      // Check if all fields are valid before calling addfunction
      if (!this.firstNameError && !this.lastNameError && !this.passwordError && !this.roleError && !this.emailError && !this.desError) {
        this.addfunction();
      }
    }
    
 
}
