import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  hide:boolean = true;
  userDetail: any;
  form: FormGroup;
  data: any;

  constructor(private userSvc: UserService,private toastrSvc: ToastrService){

  }

  ngOnInit(){
    this.loadData()
    this.initForm();
    console.log(this.userDetail)
  }

  loadData(){
    this.userSvc.getUserById().subscribe(res => {
      this.userDetail = res
      this.setForm()
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
  }

  initForm(){
    this.form = new FormGroup({
      username: new FormControl('',Validators.required),
      address1: new FormControl('',Validators.required),
      address2: new FormControl(""),
      address3: new FormControl(""),
      city: new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      zip: new FormControl('',Validators.required)
    })
    console.log(this.form)
  }

  setForm(){
    this.form.get('username')?.setValue(this.userDetail.username)
    if(this.userDetail.address){
      this.form.get('address1')?.setValue(this.userDetail.address.street1)
      this.form.get('address2')?.setValue(this.userDetail.address.street2)
      this.form.get('address3')?.setValue(this.userDetail.address.street3)
      this.form.get('city')?.setValue(this.userDetail.address.city)
      this.form.get('state')?.setValue(this.userDetail.address.state)
      this.form.get('zip')?.setValue(this.userDetail.address.zip)
    }
  }

  onSubmit(){
    const body = this.generateBody();
    this.userSvc.editUser(body).subscribe((res) => {
      this.data = res
      console.log("User Edited Successfully")
      this.toastrSvc.success('User Details Updated Successfully')
      this.loadData()
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
  }

  generateBody(){
    const value = this.form.value;
    return {
      username: value.username,
      address: {
        street1: value.address1,
        street2: value.address2,
        street3: value.address3,
        city: value.city,
        state: value.state,
        zip: value.zip
      }
    }
  }
}
