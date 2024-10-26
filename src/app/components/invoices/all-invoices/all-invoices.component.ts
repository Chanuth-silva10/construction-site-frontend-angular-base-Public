import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.css']
})
export class AllInvoicesComponent implements OnInit {
  buttons = [{ type: 'save', name: '+New Invoice',route:'invoices/add' }];
  displayColumns = ['select', 'paymentId', 'orderId', 'date', 'actions'];
  url= 'api/payments';
  columns = [
    {
      heading: 'Payment',
      name: 'paymentId',
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
      heading: 'Status',
      name: 'status',
      type: 'button'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
