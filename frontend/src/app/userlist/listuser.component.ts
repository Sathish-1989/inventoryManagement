import { Component, OnInit } from '@angular/core';
import { Route,Router } from '@angular/router';
import { UserService } from '../aServices/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrl: './listuser.component.css'
})
export class ListuserComponent implements OnInit{
  userList: any;
  count: any;
  p: number=1;
  userId: any;
  roleId: any;
  deleteId!: number;
  deleteData: any;
  constructor(private router:Router,private userService: UserService,private toastrService:ToastrService){

  }
  
  ngOnInit(): void {
    var authUser = JSON.parse(localStorage.getItem('authUser') || "null");
    this.roleId = authUser.role_id;
    this.listuser();
    this.getMessage();
  }

  pageChangeEvent(event: number){
    this.p = event;
    this.listuser();
}
  listuser(){
    var params = {roleid :this.roleId};
      this.userService.listuser(params)
      .subscribe(data=>{
        console.log(data,"data")
        this.userList = data;
        this.count = this.userList.length;
        // console.log(this.userList,this.count,"sss")
      })
  }

  getUserID(userId: number){
    this.router.navigate(['/user/modify',userId]);
  }
  getdeleteId(id:any){
     this.deleteId = id;
  }
  deleteFn(){
    var params = { deleteID: this.deleteId};
    this.userService.deleteUser(params)
    .subscribe(data=>{
      this.deleteData = data;
      if(this.deleteData["status"] == 1){
        this.toastrService.success(this.deleteData["message"], 'Success');
      } else {
        this.toastrService.error(this.deleteData["message"],'Error');
      }
      this.listuser();
    })
  }
  getMessage(){
      const addusermessage = JSON.parse(localStorage.getItem('adduser') || "null");
        console.log(addusermessage,"checkmessage");
        if(addusermessage !=  null){
          if( addusermessage.data['status'] == 1){
            this.toastrService.success(addusermessage.data["message"], 'Success');
          } else {
            this.toastrService.error(addusermessage.data['message'],'Error');
          }
        }
    
        localStorage.removeItem('adduser');
  }
}
