import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  buttons = [{ type: 'save', name: '+New User',route:'staff/add' }];
  displayColumns = ['select', 'firstName', 'lastName', 'type', 'email', 'status', 'actions'];
  url= 'api/employees';
  columns = [
    {
      heading: 'First Name',
      name: 'firstName',
      type: 'text'
    },
    {
      heading: 'Last Name',
      name: 'lastName',
      type: 'text'
    },
    {
      heading: 'User Type',
      name: 'type',
      type: 'text-formatted',
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
