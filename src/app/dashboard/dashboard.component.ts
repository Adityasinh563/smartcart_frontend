import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AssignDeliverypartnerComponent } from '../assign-deliverypartner/assign-deliverypartner.component';
import { AddDeliveryPartnerComponent } from '../add-delivery-partner/add-delivery-partner.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders: any;

  constructor(private orderSvc: OrdersService,private toastrSvc: ToastrService,private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.orderSvc.getOrders().subscribe((res) => {
      this.orders = res.orders
      console.log(this.orders)
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
  }

  displayedColumns = ['Manage','orderId', 'Customer', 'Product', 'totalPrice','payMethod','orderDate','shippingAddress','deliveryPartner','status']

  onAssignClick(id){
    const dialogRef = this.dialog.open(AssignDeliverypartnerComponent,{
      width: '1200px',
      data: {
        orderId: id
      }
    })
    dialogRef.componentInstance.dataUpdated.subscribe((_) =>{
      this.loadData()
    })
  }

  onAddDeliveryPartner(){
    this.dialog.open(AddDeliveryPartnerComponent,{
      width: '600px'
    })
  }
}
