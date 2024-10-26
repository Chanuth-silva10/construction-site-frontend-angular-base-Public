import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-permission',
  templateUrl: './all-permission.component.html',
  styleUrls: ['./all-permission.component.css']
})
export class AllPermissionComponent {


  buttons = [{type:"save",name:'+New Permission',route:'permissions/add'}]
  displayedColumns: string[] = ['select','permissionId','name', 'description','actions'];
  url = "api/permission";
  columns = [
    {
      heading:"Permission Id",
      name:"permissionId",
      type:'text'
    },
    {
      heading:"Name",
      name:"name",
      type:'text'
    },
    {
      heading:"Description",
      name:"description",
      type:'text'
    },

  ]


}
