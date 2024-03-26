import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { UserComponent } from './user/user.component';
import { MyordersComponent } from './myorders/myorders.component';
import { DeliverypartnerComponent } from './deliverypartner/deliverypartner.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'addProduct',
    component: AddproductComponent
  },
  {
    path: 'userDetail',
    component: UserComponent
  },
  {
    path: 'myOrders',
    component: MyordersComponent
  },
  {
    path: 'assigned-orders',
    component: DeliverypartnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
