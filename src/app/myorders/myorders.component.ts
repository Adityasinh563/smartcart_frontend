import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'services/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {

  orders: any;
  subTotal: any;

   constructor(private orderSvc: OrdersService,private toastrSvc: ToastrService){

   }

   ngOnInit(){
    this.loadData()
   }

   loadData(){
    this.orderSvc.getOrdersByUser().subscribe(res => {
      this.orders = res.orders
      this.subTotal = this.parseData(res.orders)
      console.log(this.subTotal)
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
   }

   parseData(data){
    return data.reduce((acc,item) => {
      item.subTotal = this.calculateSubTotal(item)
      acc.push(item)
      return acc
    },[])
   }

  calculateSubTotal(item){
    return item.products.reduce((ac,it) => {
      ac = ac + it.qty * it.product.price
      return ac
    },0)
  }

}
