import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.css']
})       
export class PendingOrderComponent implements OnInit {
  buttons = [{type:"save",name:'+New Order'}]
  displayedColumns: string[] = ['select', 'orderReferenceNo', 'supplier','site','expectedDeliveryDate','status','total'];
  url = "";
  url2 = "";
  isAuthenticated = false;
  columns = [
    {
      heading:"Order #",
      name:"orderReferenceNo",
      type:'navigate',
      id:"_id",
      url:"/orders/"
    },
    {
      heading:"Supplier",
      name:"supplier",
      type:'object',
      subProperty:'storeName'
    },
    {
      heading:"Site",
      name:"site",
      type:'object',
      subProperty:'siteName'
    },
    {
      heading:"Expected Delivery",
      name:"expectedDeliveryDate",
      type:'date'
    },
    {
      heading:"Status",
      name:"status",
      type:'status'
    },
    {
      heading:"Total",
      name:"total",
      type:'price'
    },
  ]
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    console.log("OnInit");
    this.authService.loadUserInfo();
    this.authService.getUserInfo().subscribe(data=>{
      this.isAuthenticated = true;
      this.url = `api/orders/Waiting for Approval/${data.type}`;
      this.url2 = `api/orders/Partially Approved/${data.type}`;

    })
  }


}
