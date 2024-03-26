import { Component, OnInit } from '@angular/core';
import { ProductService } from 'services/products.service';
import { CartService } from 'services/cart.service';
import { Router } from '@angular/router';
import { UserService } from 'services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  cartItemCount: number = 0;
  cartItems: any = [];
  userDetail:any;
  userId: any;
  addedToCart: boolean = false;
  qty:number = 1; 
  toggleDropdown: boolean;
  constructor(private productSvc:ProductService,private cartSvc: CartService,private router: Router,private userSvc: UserService,private toastrSvc: ToastrService){

  }

  ngOnInit(): void {
    this.getCartDetail();
    this.userDetail = localStorage.getItem('userDetail')
    if(this.userDetail){
      this.userDetail = JSON.parse(this.userDetail)
      this.userId = this.userDetail._id
    }
  }

  loadData(){
    this.productSvc.getProducts().subscribe(res => {
      console.log(res)
      this.products = res ? this.parseData(res) : []
      console.log(this.products)
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    } )
  }

  parseData(data){
    return data.reduce((acc,item) => {
      item.addedToCart = false;
      for(let i=0;i< this.cartItems?.length;i++){
        if(this.cartItems[i].product._id == item._id){
          item.addedToCart = true
          item.qty = this.cartItems[i].qty
          break;
        }
      }
      acc.push(item)
      return acc
    },[]) 
  }

  getCartDetail(){
    this.cartSvc.getCart().subscribe(res => {
      console.log(res)
      this.cartItems =res?.products
      this.cartItemCount = res?.products ? res.products.length : 0 
      this.loadData();
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
  }

  addToCart(item){
    const body = this.generateBody(item);
    this.cartSvc.addToCart(body).subscribe(res => {
      console.log("added to cart")
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
    this.addedToCart = true;
    item.addedToCart = true;
    this.cartItemCount++;
    item.qty = 1
  }

  generateBody(item){
    return {
      user : this.userId,
      products : [
        {
          product : item._id,
          qty : 1
        }
      ]
    }
  }

  onPlusClick(item){
    const body = this.generateBody(item);
    this.cartSvc.addToCart(body).subscribe(res => {
      console.log("added to cart")
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
    item.qty++
  }

  onMinusClick(item){
    const body = this.generateBody(item);
    this.cartSvc.removeCart(body).subscribe(res => {
      console.log("removed from cart")
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
    item.qty--
    if(item.qty == 0){
      item.addedToCart = false
      this.cartItemCount--
    }
  }

  onToggleDropdown(){
    this.toggleDropdown = !this.toggleDropdown
  }

  navigateToCheckout(){
    this.router.navigate(['/checkout'])
  }

  logout(){
    this.userSvc.logout({}).subscribe((res) => {
      console.log(res,"logged out successfully")
      this.router.navigate(['/'])
      localStorage.clear()
    },
    (error) => {
      this.toastrSvc.error(error.error.message)
    })
  }

  onAccountDetailClick(){
    this.router.navigate(['/userDetail'])
  }
}
