import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// restriction of the compoenets after authentication
import { authGuard } from './authGuard/auth.guard';
/*important components*/
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdduserComponent } from './useradd/adduser.component';
import { ListuserComponent } from './userlist/listuser.component';
import { ModifyuserComponent } from './usermodify/modifyuser.component';

import { ProductaddComponent } from './productadd/productadd.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductmodifyComponent } from './productmodify/productmodify.component';

import { ProductsalesComponent } from './productsales/productsales.component';
import { SaleslistComponent } from './saleslist/saleslist.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent , canActivate:[authGuard]}, // Protected route
  { path:'user', 
    children:[
      {path:"",redirectTo: 'list', pathMatch: 'full'},
      {path:"add", component:AdduserComponent,canActivate:[authGuard]},
      { path: "list", component: ListuserComponent, canActivate:[authGuard]},
      { path: "modify/:userId", component: ModifyuserComponent, canActivate:[authGuard]},
    ]
  },
  { path:'products', 
    children:[
      {path:"",redirectTo: 'list', pathMatch: 'full'},
      {path:"add", component:ProductaddComponent,canActivate:[authGuard]},
      { path: "list", component: ProductlistComponent, canActivate:[authGuard]},
      { path: "modify/:pId", component: ProductmodifyComponent, canActivate:[authGuard]},
    ]
  },
  { path:'sales', 
    children:[
      {path:"",redirectTo: 'list', pathMatch: 'full'},
      {path:"add", component:ProductsalesComponent,canActivate:[authGuard]},
      { path: "list", component: SaleslistComponent, canActivate:[authGuard]},
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
