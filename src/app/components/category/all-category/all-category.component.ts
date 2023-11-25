import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css']
})
export class AllCategoryComponent {

  buttons = [{type:"save",name:'+New Category',route:'categories/add'}]
  displayedColumns: string[] = ['select','name', 'items','actions'];
  url = "api/category";
  columns = [

    {
      heading:"Name",
      name:"name",
      type:'text'
    },
    {
      heading:"No of Items",
      name:"items",
      type:'count'
    }
  ]

}
