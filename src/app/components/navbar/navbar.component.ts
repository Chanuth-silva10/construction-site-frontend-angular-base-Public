import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Permissions} from "../../enums/Permission";

interface NavButton {
  text: string,
  icon: string,
  url: string,
  subButtons?: Array<SubNavButton>,
  hasPermission:boolean
}

interface SubNavButton {
  text: string,
  url: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public permissions: number[] = [];
  loading = false;
  buttons: Array<NavButton> = []

  openedBtn?: NavButton;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.authService.getUserInfo().subscribe(data => {
      this.permissions = data.permissions;
      this.loading = false;

      this.buttons = [
        // { text: 'Dashboard', icon: 'home', url: '/',hasPermission:true },
        {
          text: 'Items',
          icon: 'all_inbox',
          url: 'items',
          subButtons: [
            {text: 'All Items', url: 'items'},
            {text: 'Add Item', url: 'items/add'},
          ],
          hasPermission: this.permissions.includes(Permissions.manageItems)
        },
        {
          text: 'Orders',
          icon: 'add_box',
          url: 'orders',
          subButtons: [
            {text: 'All Orders', url: 'orders'},
            {text: 'Add Order', url: 'orders/add'}
          ],
          hasPermission: this.permissions.includes(Permissions.viewOrders) && this.permissions.includes(Permissions.createOrders)
        },
        {
          text: 'View Orders',
          icon: 'add_box',
          url: 'orders',
          hasPermission: this.permissions.includes(Permissions.viewOrders) && !this.permissions.includes(Permissions.createOrders)
        },
        {
          text: 'Add Orders',
          icon: 'add_box',
          url: 'orders/add',
          hasPermission: !this.permissions.includes(Permissions.viewOrders) && this.permissions.includes(Permissions.createOrders)
        },
        {
          text: 'Pending Approvals',
          icon: 'pending',
          url: 'orders/pending',
          hasPermission: this.permissions.includes(Permissions.approveOrders)
        },
        {
          text: 'Deliveries',
          icon: 'local_shipping',
          url: 'deliveries',
          subButtons: [
            {text: 'All Deliveries', url: 'deliveries'},
            {text: 'Add Delivery', url: 'deliveries/add'},
          ],
          hasPermission: this.permissions.includes(Permissions.manageDeliveries)
        },
        {
          text: 'Categories',
          icon: 'view_quilt',
          url: 'categories',
          subButtons: [
            {text: 'All Categories', url: 'categories'},
            {text: 'Add Category', url: 'categories/add'},
          ],
          hasPermission: this.permissions.includes(Permissions.manageCategories)
        },
        {
          text: 'Staff',
          icon: 'supervised_user_circle',
          url: 'staff',
          subButtons: [
            {text: 'All Staffs', url: 'staff'},
            {text: 'Add Staff', url: 'staff/add'},
          ],
          hasPermission: this.permissions.includes(Permissions.managerUsers)
        },
        {
          text: 'Suppliers',
          icon: 'people',
          url: 'suppliers',
          subButtons: [
            {text: 'All Suppliers', url: 'suppliers'},
            {text: 'Add Supplier', url: 'suppliers/add'},
          ],
          hasPermission: this.permissions.includes(Permissions.manageSuppliers)
        },
        {
          text: 'Invoices',
          icon: 'receipt',
          url: 'invoices',
          subButtons: [
            {text: 'All Invoices', url: 'invoices'},
            {text: 'Add Invoice', url: 'invoices/add'},
          ],
          hasPermission: this.permissions.includes(Permissions.manageInvoices)
        },
        {
          text: 'Sites',
          icon: 'business',
          url: 'sites',
          subButtons: [
            {text: 'All Sites', url: 'sites'},
            {text: 'Add Site', url: 'sites/add'},
          ],
          hasPermission: this.permissions.includes(Permissions.manageSites)
        },
        {
          text: 'Rules',
          icon: 'gavel',
          url: 'rules',
          subButtons: [
            {text: 'All Rules', url: 'rules'},
            {text: 'Add Rule', url: 'rules/add'},
          ],
          hasPermission: this.permissions.includes(Permissions.manageRules)
        },
        {
          text: 'Permissions',
          icon: 'local_police',
          url: 'permissions',
          subButtons: [
            {text: 'All Permissions', url: 'permissions'},
            {text: 'Add Permission', url: 'permissions/add'},
          ],
          hasPermission: this.permissions.includes(Permissions.managePermissions)
        },
        {text: 'Settings', icon: 'settings', url: 'user-profile', hasPermission: true}
      ]

    })
  }

  handleOpened(button: NavButton): void {
    this.openedBtn = button;
  }

}
