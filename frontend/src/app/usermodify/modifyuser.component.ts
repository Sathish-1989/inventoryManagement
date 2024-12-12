import { Component, OnInit,Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../aServices/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modifyuser',
  templateUrl: './modifyuser.component.html',
  styleUrl: './modifyuser.component.css'
})
export class ModifyuserComponent implements OnInit{
  userId!: number;
  rolesData: any;
  myroles:any=[];
  model:any={};
  viewData : any;
  updateData: any;
  firstNameError: string | null = null;
  lastNameError: string | null = null;
  emailError: string | null = null;
  passwordError: string | null = null;
  roleError: string | null = null;
  constructor(private router:Router,private userService: UserService,private toastrService:ToastrService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = +params.get('userId')! || 0; // Use '!' to assert non-null, with fallback to 0
      console.log('Loaded user with ID:', this.userId);
      // Now, you can use this.userId safely
    });
    
    // this.model.userstatus = '0';
    var authUser = JSON.parse(localStorage.getItem('authUser') || "null");
    this.model.updatedby = authUser.userId;
    this.model.roleId = authUser.role_id;
    console.log(this.model,"tested",this.userId);
    this.getviewData();
    this.getRoles();

  }
  validateFirstName() {
    console.log(this.model.firstname,":sssssss")
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

  
  getviewData(){
    var params ={id:this.userId};
    this.userService.getViewData(params)
    .subscribe(data=>{
        this.viewData = data;
        // console.log(this.viewData,"sssss11");
        this.model.firstname = this.viewData[0].firstname;
        this.model.lastname = this.viewData[0].lastname;
        this.model.selectedRole = this.viewData[0].role_id_fk;
        this.model.email = this.viewData[0].emailId;
        this.model.userstatus = this.viewData[0].user_status == 1 ? "active" : "inactive";
    })
  }
  getRoles(){
    var params ={roleid: this.model.roleId};
    this.userService.getuseroles(params)
    .subscribe(data=>{
      this.rolesData = data;
    })
  }
cancelButton(){
  this.router.navigate(['/user/list']);
}

  updatefunction(){
    var params = {};
    params ={
      id: this.userId,
      firstname: this.model.firstname,
      lastname: this.model.lastname,
      roleid: this.model.selectedRole,
      status:this.model.userstatus == 'active' ? 1 :0,
      updatedby:this.model.updatedby
    };
    this.userService.updateUser(params)
    .subscribe(data=>{
      this.updateData = data;
      // console.log(this.userData,"this",this.userData["status"]);
          if(this.updateData["status"]== 1){
            localStorage.setItem('adduser',JSON.stringify({data}));
            this.router.navigate(['/user/list']);
          } else {
            this.toastrService.error(this.updateData["message"], 'Error!'); 
          }

    })
  }

  modifyUser(){
    this.validateFirstName();
    this.validateLastName();
    this.validateRole();
    this.validateEmail();    
    // Check if all fields are valid before calling addfunction
    if (!this.firstNameError && !this.lastNameError && !this.roleError && !this.emailError) {
      this.updatefunction();
    }

  }
}
