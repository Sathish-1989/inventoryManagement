import { Component, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit,AfterViewInit {
  getUser:any;
  model: any={};
constructor(private router: Router, private renderer: Renderer2){

}
ngOnInit(){
  this.getUser = JSON.parse(localStorage.getItem('authUser') || 'null');
  console.log(this.getUser,"11111111")
  this.model.Username = this.getUser.firstname + " " + this.getUser.lastname;
  console.log(this.model.Username)
}
  // Runs after the view is fully rendered
  ngAfterViewInit(): void {
    console.log('AfterViewInit: View fully initialized.');

    const minimizeButton = document.querySelector('[data-bs-toggle="minimize"]');
    const sidebar = document.getElementById('sidebar');
    const canvasButton = document.querySelector('[data-bs-toggle="offcanvas"]');

    if (minimizeButton && sidebar) {
      this.renderer.listen(minimizeButton, 'click', () => {
        sidebar.classList.toggle('minimized');
        document.body.classList.toggle('sidebar-icon-only');
      });
    } else {
      console.error('Minimize button or sidebar not found');
    }

    if (canvasButton && sidebar) {
      this.renderer.listen(canvasButton, 'click', () => {
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-offcanvas-active');
      });
    } else {
      console.error('Canvas button or sidebar not found');
    }
  }

LogOut(){
    console.log("checking")
    localStorage.removeItem('authUser');
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }
   
}
