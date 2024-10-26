import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddItemComponent} from "./components/items/add-item/add-item.component";
import {AddCategoryComponent} from "./components/category/add-category/add-category.component";
import {AllItemComponent} from "./components/items/all-item/all-item.component";
import {AllCategoryComponent} from "./components/category/all-category/all-category.component";
import {AddSupplierComponent} from "./components/supplier/add-supplier/add-supplier.component";
import {AllSupplierComponent} from "./components/supplier/all-supplier/all-supplier.component";
import {AddPermissionComponent} from "./components/permission/add-permission/add-permission.component";
import {AllPermissionComponent} from "./components/permission/all-permission/all-permission.component";
import {AddSiteComponent} from "./components/site/add-site/add-site.component";
import {AllSiteComponent} from "./components/site/all-site/all-site.component";
import {AddOrderComponent} from "./components/order/add-order/add-order.component";
import {AllOrderComponent} from "./components/order/all-order/all-order.component";
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { AddRulesComponent } from './components/rules/add-rules/add-rules.component';
import {AllRulesComponent} from "./components/rules/all-rules/all-rules.component";
import { AddDeliveryComponent } from './components/deliveries/add-delivery/add-delivery.component';
import { AllDeliveriesComponent } from './components/deliveries/all-deliveries/all-deliveries.component';
import {ViewOrderComponent} from "./components/order/view-order/view-order.component";
import {PendingOrderComponent} from "./components/order/pending-order/pending-order.component";
import {EditOrderComponent} from "./components/order/edit-order/edit-order.component";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddInvoiceComponent } from './components/invoices/add-invoice/add-invoice.component';
import { AllInvoicesComponent } from './components/invoices/all-invoices/all-invoices.component';

//route path
const appRoutes:Routes = [
  {path:'items/add',component:AddItemComponent},
  {path:'categories/add',component:AddCategoryComponent, data: { update: true }},
  {path:'categories/edit/:id',component:AddCategoryComponent},
  {path:'items',component:AllItemComponent},
  {path:'items/edit/:id',component:AddItemComponent, data: { update: true }},
  {path:'categories',component:AllCategoryComponent},
  {path:'suppliers/edit/:id',component:AddSupplierComponent,data: { update: true }},
  {path:'suppliers/add',component:AddSupplierComponent},
  {path:'suppliers', component:AllSupplierComponent},
  {path:'permissions/edit/:id',component:AddPermissionComponent,data: { update: true }},
  {path:'permissions/add',component:AddPermissionComponent},
  {path:'permissions', component:AllPermissionComponent},
  {path:'sites/edit/:id',component:AddSiteComponent,data: { update: true }},
  {path:'sites/add',component:AddSiteComponent},
  {path:'sites',component:AllSiteComponent},
  {path:'orders/add',component:AddOrderComponent},
  {path:'orders/pending',component:PendingOrderComponent},
  {path:'orders/edit/:id',component:EditOrderComponent, data: { update: true }},
  {path:'orders/:id',component:ViewOrderComponent},
  {path:'orders',component:AllOrderComponent},
  {path:'login', component: LoginComponent},
  {path:'staff', component: AllUsersComponent},
  {path:'staff/add', component: AddUserComponent},
  {path:'staff/edit/:id', component: AddUserComponent, data: { update: true }},
  {path:'rules/edit/:id',component:AddRulesComponent , data: { update: true }},
  {path:'rules/add',component:AddRulesComponent},
  {path:'rules',component:AllRulesComponent},
  {path:'staff/edit/:id', component: AddUserComponent, data: { update: true }},
  {path:'deliveries', component: AllDeliveriesComponent},
  {path:'deliveries/add', component: AddDeliveryComponent},
  {path:'deliveries/edit/:id', component: AddDeliveryComponent, data: { update: true }},
  {path:'user-profile', component: UserProfileComponent},
  {path:'invoices', component: AllInvoicesComponent},
  {path:'invoices/add', component: AddInvoiceComponent},
  {path:'invoices/edit/:id', component: AddInvoiceComponent, data: { update: true }},

]
@NgModule({
  imports: [

    RouterModule.forRoot(appRoutes,{enableTracing:false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
