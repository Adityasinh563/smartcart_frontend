import { Component, OnInit } from '@angular/core';
import { CartService } from 'services/cart.service';
import { FormGroup,FormControl } from '@angular/forms';
import { OrdersService } from 'services/orders.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userDetail:any;
  userAddress:any;
  products: any;
  subTotal: any;
  form: FormGroup;
  deliveryCharge: number = 20;
  grandTotal: number;

  constructor(private cartSvc: CartService,private orderSvc: OrdersService,private toastrSvc: ToastrService){

  }

   ngOnInit(): void {
     this.initForm();
     this.loadData();
     const user = localStorage.getItem('userDetail')
     if(user){
      this.userDetail = JSON.parse(user)
      this.userAddress = this.userDetail.address
     }
   }

   loadData(){
    this.cartSvc.getCart().subscribe(res => {
      this.products = res.products
      this.subTotal = this.calculateSubTotal()
      this.grandTotal = this.subTotal + this.deliveryCharge
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
   }

   calculateSubTotal(){
    return this.products.reduce((acc,item) => {
      acc = acc + item.qty * item.product.price
      return acc
    },0)
   }

   initForm(){
    this.form = new FormGroup({
      payMethod : new FormControl('')
    })
   }

   onQtyChange(){

   }

   placeOrder(){
    const value = this.form.value
    const body = this.generateBody(value)
    this.orderSvc.createOrder(body).subscribe((res) => {
      this.toastrSvc.success('Order Placed Successfully')
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
   }

   generateBody(value){
    return {
      customer: this.userDetail._id,
      products: this.products,
      payMethod: value.payMethod,
      totalPrice: this.grandTotal
    }
   }
}
