import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-site',
  templateUrl: './all-site.component.html',
  styleUrls: ['./all-site.component.css']
})
export class AllSiteComponent{


  buttons = [{type:"save",name:'+New Site',route:'sites/add'}]
  displayedColumns: string[] = ['select','siteId','siteName', 'siteAddress','manager','contact','actions'];
  url = "api/site";
  columns = [
    {
      heading:"Site Id",
      name:"siteId",
      type:'text'
    },
    {
      heading:"Site Name",
      name:"siteName",
      type:'text'
    },
    {
      heading:"Site Address",
      name:"siteAddress",
      type:'text'
    },
    {
      heading:"Manager",
      name:"manager",
      type: 'subpropertyConcat',
      properties: [
        ['manager', 'firstName'],
        ['manager', 'lastName']
      ],
    },
    {
      heading:"Contact",
      name:"contact",
      type:'text'
    }
  ]



}
