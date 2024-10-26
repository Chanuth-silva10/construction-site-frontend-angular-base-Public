import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})
export class AllOrderComponent implements OnInit {
 
  displayedColumns: string[] = ['select', 'orderReferenceNo', 'supplier','site','expectedDeliveryDate','status','total','actions'];
  url = "api/orders";
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
  constructor() { }

  ngOnInit(): void {
  }

}
