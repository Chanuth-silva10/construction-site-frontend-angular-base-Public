import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Order} from "../order.model";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../services/feedback.service";
import {ItemService} from "../../../services/item/item.service";
import {OrderService} from "../../../services/order/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierService} from "../../../services/supplier/supplier.service";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../users/user.model";
import {Permissions} from "../../../enums/Permission";
import {OrderStatus} from "../../../enums/OrderStatus";

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {


  total = 0;
  loading = false;
  authenticated =false;
  public user:User;
  public comment:string;
  public commentsArr:any = []
  public order:Order
  public permissions:number[] = [];
  public hasPermission=true;

  constructor(
    private fb: FormBuilder,
    private feedback: FeedbackService,
    private itemService: ItemService,
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService:AuthService

  ) { }



  ngOnInit(): void {

    if(Object.keys(history.state).length == 1){
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.authService.loadUserInfo();
      this.authService.getUserInfo().subscribe(data=>{
        this.user = data;
        console.log("user");
        console.log(this.user);
        this.permissions = data.permissions;
        if(!this.permissions.includes(Permissions.viewOrders)){
          this.router.navigate(["/"])
        }
        if(!this.permissions.includes(Permissions.approveOrders)){
          this.hasPermission=false;
        }
        this.authenticated=true;
      })
      this.orderService.getOrderById(id).subscribe(
        data => {
          this.loading = false;
          this.order = data;
          if(this.order.status!=OrderStatus.waiting && this.order.status!=OrderStatus.partiallyApproved){
            this.hasPermission=false;
          }
          this.commentsArr = this.order.comments;
          console.log(data);
        },
        error => {
          console.log("In error");
          this.loading = false;
        })
    }

  }
  public addComment(){
    // let today:number = Date.now();
    let date:Date = new Date();
    let comment={
      user:this.user.firstName + " " + this.user.lastName,
      body:this.comment,
      date:date
    }
    this.commentsArr.push(comment);

    this.orderService.addComment(this.order._id,comment).subscribe(data=>{})

  this.comment="";
    // this.comments?.setValue("");
    console.log(this.commentsArr);
  }

  public setOrderStatus(status:String){
    const payload = {
      id:this.order._id,
      status:status,
      empType:this.user.type,
      empId:this.user._id
    }
    this.orderService.updateOrderStatus(this.order._id,payload).subscribe(
      data=>{
        this.success();
      },
      error => {
        this.error();
      }
    )
  }

  private success(): void {
    this.feedback.success("Order Status Updated Successfully");
    this.router.navigate(["/orders/pending"]);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }



}
