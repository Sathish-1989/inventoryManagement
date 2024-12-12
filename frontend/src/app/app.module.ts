import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { AdduserComponent } from './useradd/adduser.component';
import { ModifyuserComponent } from './usermodify/modifyuser.component';
import { ListuserComponent } from './userlist/listuser.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductmodifyComponent } from './productmodify/productmodify.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ProductsalesComponent } from './productsales/productsales.component';
import { SaleslistComponent } from './saleslist/saleslist.component';

// import Services
import { AuthServices } from './aServices/auth.service';
import { UserService } from './aServices/user.service';
import { ProductService } from './aServices/product.service';
import { DashboardService } from './aServices/dashboard.service';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    AdduserComponent,
    ModifyuserComponent,
    ListuserComponent,
    ProductlistComponent,
    ProductmodifyComponent,
    ProductaddComponent,
    LoginComponent,
    ProductsalesComponent,
    SaleslistComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000, // 3 seconds
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [
    AuthServices,
    UserService,
    ProductService,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
