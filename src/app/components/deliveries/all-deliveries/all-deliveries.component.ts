import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-deliveries',
  templateUrl: './all-deliveries.component.html',
  styleUrls: ['./all-deliveries.component.css']
})
export class AllDeliveriesComponent implements OnInit {
  buttons = [{ type: 'save', name: '+New Delivery' ,route:'deliveries/add' }];
  displayColumns = ['select', 'deliveryId', 'date', 'orderId', 'supplierId', 'actions'];
  url= 'api/deliveries';
  columns = [
    {
      heading: 'Delivery',
      name: 'deliveryId',
      type: 'id'
    },
    {
      heading: 'Date',
      name: 'date',
      type: 'date'
    },
    {
      heading: 'Order',
      name: 'orderId',
      type: 'subpropertyId',
      subprop: 'orderReferenceNo'
    },
    {
      heading: 'Supplier',
      name: 'supplierId',
      type: 'subproperty',
      subprop: 'storeName'
    },
    {
      heading: 'Email',
      name: 'email',
      type: 'text'
    },
    {
      heading: 'Status',
      name: 'status',
      type: 'button'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
