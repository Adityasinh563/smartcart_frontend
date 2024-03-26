import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  form: FormGroup
  selectedFile: any;
  userDetail: any = localStorage.getItem('userDetail') 
  notAuthorised: boolean = false;
  constructor(private productSvc: ProductService,private toastrSvc: ToastrService){

  }

  ngOnInit(): void {
    this.initForm();
    this.userDetail = JSON.parse(this.userDetail)
    if(!this.userDetail.isAdmin){
      this.notAuthorised = true
    }
  }

  initForm(){
    this.form = new FormGroup({
      name : new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
      price: new FormControl('',Validators.required),
      stockQuantity: new FormControl('',Validators.required)
    })
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
        this.selectedFile = file;
    }
}

  addProduct(){
    const formData = this.generateFormData()
    this.productSvc.addProduct(formData).subscribe(res => {
      this.toastrSvc.success('Product Added Successfully')
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
  }

  generateFormData(){
    const value = this.form.value;
    const formData = new FormData()
    formData.append('name',value.name)
    formData.append('description',value.description)
    formData.append('category',value.category)
    formData.append('price',value.price)
    formData.append('stockQuantity',value.stockQuantity)
    formData.append('productImage',this.selectedFile)
    return formData
  }
}
