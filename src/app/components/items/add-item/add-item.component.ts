import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FeedbackService } from 'src/app/services/feedback.service';
import {ItemService} from "../../../services/item/item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Item} from "../item.model";
import {Subscription} from "rxjs";
import {Category} from "../../category/category.model";
import {CategoryService} from "../../../services/category/category.service";
import {SupplierService} from "../../../services/supplier/supplier.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  update: boolean;
  data: Item;

  // Form properties
  formName: string;
  title: string;
  addItemForm!: FormGroup;
  loading = false;
  categorySubscription?:Subscription;
  categoryControl:any;
  categories:Category[] = []
  supplierCount = 1;
  suppliers:any = [];
  updateCategories:any = [];


  buttons = [
    { type: 'cancel', name: 'Cancel',submit:false },
    { type: 'save', name: 'Save',submit:true  }
  ];

  constructor(
    private fb: FormBuilder,
    private feedback: FeedbackService,
    private itemService: ItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService:CategoryService,
    private supplierService:SupplierService
  ) { }

  incrementSupplier(){
    this.supplierCount += 1;
  }
  createSupplierItem():FormGroup{
    return this.fb.group({
      supplierId:[null,Validators.required],
      qty:['', [
        Validators.required,
        Validators.pattern('^[1-9]\\d*$')
      ]],
      unitPrice:['', [
      Validators.required,
      Validators.pattern('^[1-9]\\d*$')
    ]],
    })
  }
  getAllCategories(){
    this.loading = true;
    this.categoryService.getAllCategory().subscribe(
      data => {
        this.loading = false;
        this.categories = data;
        this.addItemForm.controls.categories=this.fb.array(this.categories.map(x => false))
        this.categoryControl = (this.addItemForm.controls.categories as FormArray);
        this.categorySubscription = this.categoryControl.valueChanges.subscribe(category => {
          this.categoryControl.setValue(
            this.categoryControl.value.map((value, i) => value ? this.categories[i]._id : false),
            { emitEvent: false }
          );
        });
        //Pre select the categories on edit
        if(this.updateCategories.length > 0){
          this.categoryControl.setValue(
            this.categoryControl.value.map((value, i) =>{
              if(this.updateCategories.includes(this.categories[i]._id)){
                return  this.categories[i]._id;
              }else{
                return false;
              }
            } ),
            { emitEvent: false }
          );
        }
      },
      error => {
        this.loading = false;
        this.error = error;
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
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllSuppliers();
    // Initialise view data
    this.data = history.state;
    this.activatedRoute.data.subscribe(data => {
      this.update = data.update;
    });

    if(Object.keys(history.state).length == 1) {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.itemService.getItemById(id).subscribe(
        (data:any) => {
          this.data = data;
          this.update = true;

          this.itemName?.setValue(data.itemName);
          this.defaultUnit?.setValue(data.defaultUnit);
          this.itemCode?.setValue(data.itemCode);
          this.updateCategories = this.data?.categories;
          this.getAllCategories();
          this.formName = "updateItem";
          this.title = "Update Item";
          let i =0;
          data.supplier.map(supplier=>{
            //Skip in 1st instance
            if(i != 0){
              this.addSupplierItem();
            }
            this.supplier.at(i).get('supplierId')?.setValue(supplier.supplierId);
            this.supplier.at(i).get('qty')?.setValue(supplier.qty);
            this.supplier.at(i).get('unitPrice')?.setValue(supplier.unitPrice);
            i++;
          })
        }
      );
    }



    this.formName = this.update ? 'updateItem' : 'addItem';
    this.title = this.update ? 'Update Items' : 'Add Items';

    this.buttons.map(button => {
      button['formName'] = this.formName;
    });

    // Initialise form inputs
    this.addItemForm = this.fb.group({
      itemName: ['', Validators.required],
      itemCode: ['', Validators.required],
      defaultUnit: ['', Validators.required],

      supplier: this.fb.array([this.createSupplierItem()],Validators.required),
      categories:this.fb.array(this.categories.map(x => false))
    });

    // Prepopulate form values if provided
    if (this.update && this.data) {
      console.log(this.data);
      this.itemName?.setValue(this.data.itemName);
      this.defaultUnit?.setValue(this.data.defaultUnit);
      this.itemCode?.setValue(this.data.itemCode);
      this.updateCategories = this.data?.categories;
      this.getAllCategories();
      this.formName = "updateItem";
      this.title = "Update Item";
      let i =0;
      this.data.supplier.map((supplier:any)=>{
        //Skip in 1st instance
        if(i != 0){
          this.addSupplierItem();
        }
        this.supplier.at(i).get('supplierId')?.setValue(supplier.supplierId._id);
        this.supplier.at(i).get('qty')?.setValue(supplier.qty);
        this.supplier.at(i).get('unitPrice')?.setValue(supplier.unitPrice);
        i++;
      })
    }
  }
  addSupplierItem(){
    this.supplier.push(this.createSupplierItem());
  }
  // Getters for form input values
  get itemName() {
    return this.addItemForm.get('itemName');
  }
  get itemCode() {
    return this.addItemForm.get('itemCode');
  }
  get defaultUnit() {
    return this.addItemForm.get('defaultUnit');
  }

  get supplier():FormArray {
    return <FormArray> this.addItemForm.get('supplier');
  }

  get category() {
    return this.addItemForm.get('categories');
  }



  // Submit form function
  submit(): void {

    const categoryControl = (this.addItemForm.controls.categories as FormArray);

    if (this.addItemForm.valid) {
      console.log(this.addItemForm);
      this.loading = true;

   // Create Item object
      const Item: Item = {
        itemName: this.itemName?.value,
        itemCode: this.itemCode?.value,
        defaultUnit: this.defaultUnit?.value,
        supplier: this.supplier?.value,
        categories: categoryControl.value.filter(value => !!value),
      }
      console.log(Item)
      // Call save/update function from Item service
      if (!this.update) {
        this.itemService.saveItem(Item).subscribe(
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
        this.itemService.updateItem(this.data._id!, Item).subscribe(
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
    this.feedback.success(`Item ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/items']);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }

}
