import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeliverypartnerService } from 'services/deliverypartner.service';
import { EditorderComponent } from '../editorder/editorder.component';

@Component({
  selector: 'app-deliverypartner',
  templateUrl: './deliverypartner.component.html',
  styleUrls: ['./deliverypartner.component.css']
})
export class DeliverypartnerComponent implements OnInit {
  orders: any;

  constructor(private deliveryPartnerSvc: DeliverypartnerService,private dialog:MatDialog) {

  }

  displayedColumns = ['Manage', 'orderId', 'customer', 'products', 'totalprice', 'paymethod', 'orderDate', 'shippingAddress', 'status']

  ngOnInit(): void {
    this.loadData()
  }

  loadData() {
    this.deliveryPartnerSvc.getAllDeliveryPartners().subscribe(res => {
      this.orders = res[0].orders
    })
  }

  onEditClick(id) {
    const dialogRef = this.dialog.open(EditorderComponent, {
      width: '1200px',
      data: {
        orderId: id
      }
    })
    dialogRef.componentInstance.dataUpdated.subscribe((_) => {
      this.loadData()
    })
  }
}
