import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from 'services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  form: FormGroup;

  constructor(private userSvc: UserService, private router: Router, private toastrSvc: ToastrService) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    if (this.form.invalid) return
    const body = this.generateBody();
    this.userSvc.login(body).subscribe(res => {
      console.log("logged in successfully")
      console.log(res)
      localStorage.setItem("userDetail", JSON.stringify(res.user))
      this.toastrSvc.success(res.message)
      if (res.user.isDeliveryPartner) {
        this.router.navigate(['/assigned-orders']);
      } else if (!res.user.isAdmin) {
        this.router.navigate(['/products']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    },
      (error) => {
        this.toastrSvc.error(error.error.message)
      })
  }

  generateBody() {
    const value = this.form.value;
    return {
      username: value.username,
      password: value.password
    }
  }
}
