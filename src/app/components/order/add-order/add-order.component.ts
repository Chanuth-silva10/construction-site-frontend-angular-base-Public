import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {FeedbackService} from "../../../services/feedback.service";
import {ItemService} from "../../../services/item/item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SupplierService} from "../../../services/supplier/supplier.service";
import {Order} from "../order.model";
import {OrderService} from "../../../services/order/order.service";
import {DatePipe} from "@angular/common";
import {SiteService} from "../../../services/site/site.service";
import {AuthService} from "../../../services/auth.service";
import {User} from "../../users/user.model";
import {Permissions} from "../../../enums/Permission";

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  update: boolean;
  data: Order;

  // Form properties
  formName: string;
  title: string;
  addOrderForm!: FormGroup;
  loading = false;
  itemCount = 1;
  suppliers:any = [];
  items:any = []
  supplierWiseItems:any = []
  selectedSupplier = null;
  total = 0;
  sites:any = [];
  buttons = [
    { type: 'cancel', name: 'Cancel',submit: false },
    { type: 'save', name: 'Save',submit:true }
  ];
  user:User;
  public permissions:number[] = [];
  public commentsArr:any = []

  constructor(
    private fb: FormBuilder,
    private feedback: FeedbackService,
    private itemService: ItemService,
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private supplierService:SupplierService,
    private siteService:SiteService,
    private authService:AuthService
  ) { }
  @ViewChildren('unit') components:QueryList<any>;

  createItem():FormGroup{
    console.log("In create Item");
    return this.fb.group({
      itemId:[null,Validators.required],
      qty:['', [
        Validators.required,
        Validators.pattern('^[1-9]\\d*$')
      ]],
      price:[''],
    })
  }
  getItemBySupplierId(supplierId){
    this.loading = true;
    this.itemService.getItemsBySupplierId(supplierId).subscribe(
      (data:any) => {
        console.log(data);
        data.map( i =>{
          const item = {
            itemName:i.name,
            qty:i._id
          }
          this.items.push(item);
        })
        this.loading = false;
        this.supplierWiseItems = data;
      },
      error => {
        console.log("In error");
        this.loading = false;
        this.error = error
      }
    )
  }
  getAllSuppliers(){
    this.loading = true;
    this.supplierService.getAllSuppliers().subscribe(
      data => {
        this.loading = false;
        console.log(data);
        data.map( i =>{
          const supplier = {
            name:i.storeName,
            id:i._id
          }
          this.suppliers.push(supplier);
        })

      },
      error => {
        console.log("In error");
        this.loading = false;
        this.error = error
      }
    )
  }
  getAllSites(){
    this.loading = true;
    this.siteService.getAllSite().subscribe(
      data => {
        this.loading = false;
        console.log(data);
        data.map( i =>{
          const site = {
            name:i.siteName,
            id:i._id,
            address:i.siteAddress
          }
          this.sites.push(site);
        })

      },
      error => {
        console.log("In error");
        this.loading = false;
        this.error = error
      }
    )
  }
  ngOnInit(): void {

    this.authService.getUserInfo().subscribe(data=>{
      this.user = data;
      this.permissions = data.permissions;
      if(!this.permissions.includes(Permissions.createOrders)){
        this.router.navigate(["/"])
      }
    })
    this.getAllSuppliers();
    this.getAllSites();
    // Initialise view data
    this.data = history.state;
    this.activatedRoute.data.subscribe(data => {
      this.update = data.update;
    });

    this.formName = this.update ? 'updateOrder' : 'addOrder';
    this.title = this.update ? 'Update Orders' : 'Add Orders';

    this.buttons.map(button => {
      button['formName'] = this.formName;
    });

    // Initialise form inputs
    this.addOrderForm = this.fb.group({
      site: ['', Validators.required],
      supplier: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      expectedDeliveryDate: ['', Validators.required],
      comments:[''],
      items: this.fb.array([this.createItem()],Validators.required),
      orderNotes:['']

    });

    // Prepopulate form values if provided
    if (this.update && this.data) {
      // this.itemName?.setValue(this.data?.itemName);
      // this.defaultUnit?.setValue(this.data?.defaultUnit);
      // this.supplier?.setValue(this.data?.supplier);
    }

    this.supplier?.valueChanges.subscribe(value => {
      this.selectedSupplier = value;

      this.getItemBySupplierId(value);
    })

    this.site?.valueChanges.subscribe(value => {
      const  filteredSite = this.sites.filter(site=>site.id==value);
      this.deliveryAddress?.setValue(filteredSite[0].address);
      // this.getItemBySupplierId(value);
    })

    this.orderItems?.valueChanges.subscribe(value => {
      console.log(value);
    })



  }
  addItem(){
    this.orderItems.push(this.createItem());
  }
  removeItem(i){
    this.orderItems.removeAt(i)
  }

  selectItem(i,itemId){
    console.log(this.selectedSupplier)
    const selectedItem = this.supplierWiseItems.filter(item => item._id == itemId);
    const selectedSupplierItem = selectedItem[0].supplier.filter(supplier => supplier.supplierId == this.selectedSupplier)
    this.components.get(i).nativeElement.innerText = selectedItem[0].defaultUnit;
    this.orderItems.at(i).get('price')?.patchValue(selectedSupplierItem[0].unitPrice);

    this.orderItems.at(i).get('price')?.setValue(selectedSupplierItem[0].unitPrice);
    this.orderItems.at(i).get('price')?.disable();
    this.calculateTotal();
  }

  calculateTotal(){
    let sum = 0;
    for(let i=0;i<this.orderItems.length;i++){
      sum = sum + ( this.orderItems.at(i).get('qty')?.value * this.orderItems.at(i).get('price')?.value );
    }
    this.total = sum;
  }

  // Getters for form input values
  get site() {
    return this.addOrderForm.get('site');
  }
  get supplier() {
    return this.addOrderForm.get('supplier');
  }
  get deliveryAddress() {
    return this.addOrderForm.get('deliveryAddress');
  }
  get expectedDeliveryDate() {
    return this.addOrderForm.get('expectedDeliveryDate');
  }
  get comments() {
    return this.addOrderForm.get('comments');
  }
  get orderNotes() {
    return this.addOrderForm.get('orderNotes');
  }
  get orderItems():FormArray {
    return <FormArray> this.addOrderForm.get('items');
  }

  public addComment(){
    // let today:number = Date.now();
    let date:Date = new Date();
    let comment={
      user:this.user.firstName + " " + this.user.lastName,
      body:this.comments?.value,
      date:date
    }
    this.commentsArr.push(comment);
    this.comments?.setValue("");
    console.log(this.commentsArr);
  }


  // Submit form function
  submit(): void {
    if (this.addOrderForm.valid) {
      this.loading = true;
      console.log(this.addOrderForm.getRawValue().items);
      // Create Item object
      const order: any = {
        site:this.site?.value,
        supplier:this.supplier?.value,
        deliveryAddress:this.deliveryAddress?.value,
        expectedDeliveryDate:this.expectedDeliveryDate?.value,
        orderNotes:this.orderNotes?.value,
        total:this.total,
        items:this.addOrderForm.getRawValue().items,
        comments:this.commentsArr,
        createdBy:this.user._id
      }

      console.log(order);

      // Call save/update function from Item service
      if (!this.update) {
        this.orderService.saveOrder(order).subscribe(
          () => {
            this.success();
          },
          () => {
            this.error();
          },
        ).add(() => {
          this.loading = false;
        });
      } else {
        this.orderService.updateOrder(this.data._id!, order).subscribe(
          () => {
            this.success();
          },
          () => {
            this.error();
          }
        ).add(() => {
          this.loading = false;
        })
      }
    }
  }

  private success(): void {
    this.feedback.success(`Order ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/Items']);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }


}
