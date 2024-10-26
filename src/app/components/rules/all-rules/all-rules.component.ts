import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-rules',
  templateUrl: './all-rules.component.html',
  styleUrls: ['./all-rules.component.css']
})
export class AllRulesComponent implements OnInit {
  ngOnInit(): void {
      throw new Error('Method not implemented.');
  }

  buttons = [{type:"save",name:'+New Rule'}]
  displayedColumns: string[] = ['select','name', 'limit','approvalType','approvals','actions'];
  url = "api/rules";
  columns = [

    {
      heading:"Rule Name",
      name:"name",
      type:'text'
    },
    {
      heading:"Rule Limit",
      name:"limit",
      type:'text'
    },
    {
      heading:"Approval Type",
      name:"approvalType",
      type:'text'
    },
    {
      heading:"Required Approvals",
      name:"approvals",
      type:'text'
    },
  ]




}
