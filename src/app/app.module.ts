import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ButtonComponent } from './components/button/button.component';

// Material UI elements
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule} from "@angular/material/radio";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from "@angular/material/chips";
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { AddItemComponent } from './components/items/add-item/add-item.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import {AddContainerComponent} from "./components/container/add-container/add-container.component";
import {AllContainerComponent} from "./components/container/all-container/all-container.component";
import {QuillModule} from "ngx-quill";
import { AllItemComponent } from './components/items/all-item/all-item.component';
import { TableComponent } from './components/table/table.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AllCategoryComponent } from './components/category/all-category/all-category.component';
import { AddSupplierComponent } from './components/supplier/add-supplier/add-supplier.component';
import { AllSupplierComponent } from './components/supplier/all-supplier/all-supplier.component';
import { AddPermissionComponent } from './components/permission/add-permission/add-permission.component';
import { AllPermissionComponent } from './components/permission/all-permission/all-permission.component';
import { AddSiteComponent } from './components/site/add-site/add-site.component';
import { AddRulesComponent } from './components/rules/add-rules/add-rules.component';
import { AllSiteComponent } from './components/site/all-site/all-site.component';
import { AddOrderComponent } from './components/order/add-order/add-order.component';
import { AllOrderComponent } from './components/order/all-order/all-order.component';
import { LoginComponent } from './components/login/login.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { AllUsersComponent } from './components/users/all-users/all-users.component';
import { MatMenuModule } from '@angular/material/menu';
import { AllRulesComponent } from './components/rules/all-rules/all-rules.component';
import { AddDeliveryComponent } from './components/deliveries/add-delivery/add-delivery.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AllDeliveriesComponent } from './components/deliveries/all-deliveries/all-deliveries.component';
import { ViewOrderComponent } from './components/order/view-order/view-order.component';
import { PendingOrderComponent } from './components/order/pending-order/pending-order.component';
import { EditOrderComponent } from './components/order/edit-order/edit-order.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AddInvoiceComponent } from './components/invoices/add-invoice/add-invoice.component';
import { AllInvoicesComponent } from './components/invoices/all-invoices/all-invoices.component';




//
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopbarComponent,
    ButtonComponent,
    TitlebarComponent,
    AddItemComponent,
    AddCategoryComponent,
    AddContainerComponent,
    AllContainerComponent,
    AllItemComponent,
    TableComponent,
    DialogComponent,
    AllCategoryComponent,
    AddSupplierComponent,
    AllSupplierComponent,
    AddPermissionComponent,
    AllPermissionComponent,
    AddSiteComponent,
    AddRulesComponent,
    AllSiteComponent,
    AddOrderComponent,
    AllOrderComponent,
    LoginComponent,
    AddUserComponent,
    AllUsersComponent,
    AllRulesComponent,
    AddDeliveryComponent,
    AllDeliveriesComponent,
    ViewOrderComponent,
    AllDeliveriesComponent,
    PendingOrderComponent,
    EditOrderComponent,
    UserProfileComponent,
    FileUploadComponent,
    AddInvoiceComponent,
    AllInvoicesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatGridListModule,
    AppRoutingModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatChipsModule,
    QuillModule.forRoot(),
    MatMenuModule,
    NgMultiSelectDropDownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
