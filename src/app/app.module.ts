import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component'; 
import { MatSelectModule } from '@angular/material/select';
import { LogInterceptor } from 'log.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { UserComponent } from './user/user.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignDeliverypartnerComponent } from './assign-deliverypartner/assign-deliverypartner.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddDeliveryPartnerComponent } from './add-delivery-partner/add-delivery-partner.component';
import { DeliverypartnerComponent } from './deliverypartner/deliverypartner.component';
import { EditorderComponent } from './editorder/editorder.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    CheckoutComponent,
    DashboardComponent,
    AddproductComponent,
    UserComponent,
    MyordersComponent,
    AssignDeliverypartnerComponent,
    AddDeliveryPartnerComponent,
    DeliverypartnerComponent,
    EditorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    MatMenuModule,
    MatTableModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatAutocompleteModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
