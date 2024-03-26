import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, startWith } from 'rxjs';
import { OrdersService } from 'services/orders.service';
import { DeliverypartnerService } from 'services/deliverypartner.service';
import { ToastrService } from 'ngx-toastr';

export interface User {
  _id:string;
  name: string;
}

@Component({
  selector: 'app-assign-deliverypartner',
  templateUrl: './assign-deliverypartner.component.html',
  styleUrls: ['./assign-deliverypartner.component.css']
})
export class AssignDeliverypartnerComponent implements OnInit {

  @Output() dataUpdated:EventEmitter<any> = new EventEmitter<any>();
  myControl = new FormControl<string | User>('');
  data: any;
  filteredOptions: any;
  options:User[];
  deliveryPartnerId: string;

  constructor(@Inject(MAT_DIALOG_DATA) public orderId:any,private orderSvc: OrdersService,private deliveryPartnerSvc: DeliverypartnerService,private toastrSvc: ToastrService,private dialogRef: MatDialogRef<AssignDeliverypartnerComponent>){

  }

  ngOnInit(): void {
    console.log(this.orderId)
    this.loadData()
  }

  loadData(){
    this.orderSvc.getOrderByOrderId(this.orderId.orderId).subscribe((res) => {
      this.data = res[0]
      this.loadDeliveryPartner()
    })
  }

  loadDeliveryPartner(){
    this.deliveryPartnerSvc.getAllDeliveryPartners().subscribe((res) => {
      this.options = res
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.options.slice();
        }),
      );
    })
  }

  private _filter(name: string) {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(user): string{
    return user && user.name ? user.name : '';
  }

  optionSelected(event: any) {
    if (event.option.value && event.option.value._id) {
      this.deliveryPartnerId = event.option.value._id;
    }
  }

  onSave(){
    const body = this.generateBody()
    this.deliveryPartnerSvc.assignOrderToDeliveryPartner(body).subscribe((res) => {
      this.updateOrder()
      this.toastrSvc.success("Order Assigned Successfully")
      this.dataUpdated.emit()
      this.dialogRef.close()
    })
  }

  generateBody(){
    return {
      deliveryPartnerId : this.deliveryPartnerId,
      orderIds: [
        this.data._id
      ]
    }
  }

  updateOrder(){
    const body = this.generateBodyForOrder()
    this.orderSvc.updateOrder(body).subscribe((res) =>{
      console.log(res)
    },(error) =>{
      this.toastrSvc.error(error)
    })
  }

  generateBodyForOrder(){
    return {
      orderId: this.data._id,
      deliveryPartner: this.deliveryPartnerId
    }
  }
}
