import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliverypartnerService } from 'services/deliverypartner.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'services/user.service';

@Component({
  selector: 'app-add-delivery-partner',
  templateUrl: './add-delivery-partner.component.html',
  styleUrls: ['./add-delivery-partner.component.css']
})
export class AddDeliveryPartnerComponent implements OnInit {

  form: FormGroup
  hide: boolean = true

  constructor(private deliveryPartnerSvc: DeliverypartnerService,private toastrSvc: ToastrService,private userSvc: UserService){

  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.form = new FormGroup({
      name: new FormControl('',Validators.required),
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
  }

  onAddNew(){
    const body = this.generateBody()
    this.deliveryPartnerSvc.addDeliveryPartner(body).subscribe((res) => {
      this.toastrSvc.success("Delivery Partner Added Successfully")
      this.register()
    },
    (error) => {
      this.toastrSvc.error(error.error.error)
    })
  }

  generateBody(){
    const value = this.form.value;
    return {
      name: value.name,
      username: value.username,
      password: value.password
    }
  }

  register(){
    const body = this.generateBodyForRegister()
    this.userSvc.register(body).subscribe((res) =>{
      console.log(res)
    },(error) => {
      this.toastrSvc.error(error)
    })
  }

  generateBodyForRegister(){
    const value = this.form.value
    return {
      username: value.username,
      password: value.password
    }
  }
}
