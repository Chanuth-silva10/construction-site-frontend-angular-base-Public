import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../../services/item/item.service";

@Component({  
  selector: 'app-all-item',
  templateUrl: './all-item.component.html',
  styleUrls: ['./all-item.component.css']
})
export class AllItemComponent implements OnInit {
  buttons = [{type:"save",name:'+New Item',route:'items/add'}]
  displayedColumns: string[] = ['select', 'itemName', 'itemCode','supplier','defaultUnit','actions'];
  url = "api/items";
  columns = [
    {
      heading:"Item Name",
      name:"itemName",
      type:'text'
    },
    {
      heading:"Item Code",
      name:"itemCode",
      type:'text'
    },
    {
      heading:"Supplier / Unit Price",
      name:"supplier",
      type:"supplier"
    },
    {
      heading:"Default Unit",
      name:"defaultUnit",
      type:'text'
    },
  ]


  constructor(public itemService:ItemService) {
  }



  ngOnInit() {

  }

}
