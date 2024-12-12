import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js/auto';
import { DashboardService } from '../aServices/dashboard.service';
import { UserService } from '../aServices/user.service';
import { ProductService } from '../aServices/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
  homeData: any;
  roleId: any;
  userList: any;
  count: any;
  productList: any;
  productCount: any;
  constructor(private toastrService: ToastrService,private userService: UserService, private dashoardService:DashboardService, private productService:ProductService){

  }
  ngOnInit(): void {
    var authUser = JSON.parse(localStorage.getItem('authUser') || "null");
    this.roleId = authUser.role_id;
    this.getMessage();
      this.getDetails();
      this.listuser();
      this.productlist();
  }

  getDetails(){
      this.dashoardService.getDetails()
      .subscribe(data=>{
          this.homeData = data;
          this.renderDoughnutChart();
    
      })
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

  getMessage(){
    const addusermessage = JSON.parse(localStorage.getItem('message') ?? "null");
      console.log(addusermessage,"checkmessage");
      if(addusermessage != null){
        if( addusermessage.data['status'] == 1){
          this.toastrService.success(addusermessage.data["message"], 'Success');
        } else {
          this.toastrService.error(addusermessage.data['message'],'Error');
        }
      }
   
      localStorage.removeItem('message');
}

productlist(){
  this.productService.getProduct()
  .subscribe(data=>{
    console.log(data,"data")
    this.productList = data;
    this.productCount = this.productList.length;
    console.log(this.productList,this.count,"sss")
  })
}

renderDoughnutChart(): void {
  console.log(this.homeData,"sssssssssss")
  
  var one =this.homeData[0].brand_name;
  var two =this.homeData[1].brand_name;
  // var three = this.homeData[2].brand_name;
  console.log(one,two,"sssssss122")
  const doughnutPieData = {
    datasets: [{
      data: [this.homeData[0].itemCount,this.homeData[1].itemCount],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)',
        'rgba(153, 102, 255, 0.5)',
        'rgba(255, 159, 64, 0.5)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
    }],
    labels: [one,two]
  };

  const doughnutPieOptions = {
    responsive: true,
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  const doughnutChartCanvas = document.getElementById('doughnutChart') as HTMLCanvasElement;
  if (doughnutChartCanvas) {
    new Chart(doughnutChartCanvas.getContext('2d')!, {
      type: 'doughnut',
      data: doughnutPieData,
      options: doughnutPieOptions
    });
  }
}

}
