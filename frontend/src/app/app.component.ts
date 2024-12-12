import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  successUser: any;
  constructor(private router: Router){
    const getUser = localStorage.getItem('authUser');
    if(getUser == undefined){
      this.router.navigate([""]);
    } else {
      this.successUser = getUser != undefined ? JSON.parse(getUser) : null;
    }

  }


  changeofRoutes(){
      const getUser = localStorage.getItem('authUser');
      this.successUser = getUser != undefined ? JSON.parse(getUser) : null;
  }
}
