import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-supplier',
  templateUrl: './all-supplier.component.html',
  styleUrls: ['./all-supplier.component.css']
})
export class AllSupplierComponent {

  buttons = [{type:"save",name:'+New Supplier',route:'suppliers/add'}]
  displayedColumns: string[] = ['select','name','contact', 'email', 'storeName','address','actions'];
  url = "api/supplier";
  columns = [

    {
      heading:"Name",
      name:"name",
      type:'text'
    },

    {
      heading:"Contact",
      name:"contact",
      type:'text'
    },
    {
      heading:"Email",
      name:"email",
      type:'text'
    },
    {
      heading:"Store Name",
      name:"storeName",
      type:'text'
    },
    {
      heading:"Address",
      name:"address",
      type:'text'
    },

  ]


}
