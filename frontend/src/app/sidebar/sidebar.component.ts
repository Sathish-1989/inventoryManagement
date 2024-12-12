import { Component, OnInit } from '@angular/core';
import { Collapse } from 'bootstrap';

document.addEventListener('DOMContentLoaded', (): void => {
  const collapses: NodeListOf<HTMLElement> = document.querySelectorAll('.collapse');
  const buttons: NodeListOf<HTMLElement> = document.querySelectorAll('[data-bs-toggle="collapse"]');

  buttons.forEach((button: HTMLElement): void => {
    button.addEventListener('click', (): void => {
      const targetId: string | null = button.getAttribute('data-bs-target');
      if (targetId) {
        const targetCollapse: HTMLElement | null = document.querySelector(targetId);

        collapses.forEach((collapse: HTMLElement): void => {
          if (collapse !== targetCollapse && collapse.classList.contains('show')) {
            const bsCollapse = Collapse.getInstance(collapse);
            if (bsCollapse) {
              bsCollapse.hide();
            }
          }
        });
      }
    });
  });
});

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit{
  isUsersCollapsed: boolean = false;
  isMaterialsCollapsed: boolean = false;
  isSidebarMinimized = false;
  getUser:any;
  model: any={};

  ngOnInit() {
    // Ensure both menus are collapsed on initialization
    this.isUsersCollapsed = false;
    this.isMaterialsCollapsed = false;
    this.getUser = JSON.parse(localStorage.getItem('authUser') || 'null');
    this.model.Username = this.getUser.firstname + " " + this.getUser.lastname;
    this.model.role = this.getUser.rolename;
    this.model.roleId = this.getUser.role_id;
  }

  toggleUsersCollapse() {
    this.isUsersCollapsed = !this.isUsersCollapsed;
    // Close the other menu if needed
    this.isMaterialsCollapsed = false;
  }

  toggleMaterialsCollapse() {
    this.isMaterialsCollapsed = !this.isMaterialsCollapsed;
    // Close the other menu if needed
    this.isUsersCollapsed = false;
  }
}
