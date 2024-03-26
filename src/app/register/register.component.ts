import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;
  form: FormGroup;

  constructor(private userSvc: UserService,private toastrSvc: ToastrService){

  }

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.form = new FormGroup({
      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required)
    })
  }

  register(){
    if(this.form.invalid) return
    const body = this.generateBody();
    this.userSvc.register(body).subscribe(res => {
      console.log("registered successfully")
      console.log(res)
      this.toastrSvc.success('Registered Successfully')
      this.initForm()
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
  }

  generateBody(){
    const value = this.form.value;
    return {
      username : value.username,
      password : value.password
    }
  }
}
