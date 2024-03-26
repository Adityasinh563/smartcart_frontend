import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersService } from 'services/orders.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editorder',
  templateUrl: './editorder.component.html',
  styleUrls: ['./editorder.component.css']
})
export class EditorderComponent implements OnInit {

  @Output() dataUpdated: EventEmitter<any> = new EventEmitter<any>();
  orderstatus = [
    {
      name: 'Placed',
      value: 'placed'
    },
    {
      name: 'Dispatched',
      value: 'dispatched'
    },
    {
      name: 'Delivered',
      value: 'delivered'
    }
  ]
  selectedValue: any = this.orderstatus[0].value;
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public orderId:any, private orderSvc: OrdersService,private toastrSvc: ToastrService,private dialogRef: MatDialogRef<EditorderComponent>){

  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.orderSvc.getOrderByOrderId(this.orderId.orderId).subscribe((res) => {
      this.data = res[0]
    })
  }

  onSave(){
    const body = this.generateBodyForOrder()
    this.orderSvc.updateOrder(body).subscribe((res) =>{
      console.log(res)
      this.dataUpdated.emit()
      this.dialogRef.close()
    },(error) =>{
      this.toastrSvc.error(error)
    })
  }

  generateBodyForOrder(){
    return {
      orderId: this.data._id,
      status: this.selectedValue
    }
  }
}
