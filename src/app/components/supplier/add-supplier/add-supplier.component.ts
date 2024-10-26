import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../services/feedback.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Supplier} from "../supplier.model";
import {SupplierService} from "../../../services/supplier/supplier.service";

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  apiUrl ='http://localhost:3001/api/supplier';

  update:boolean;
  data:Supplier;

// Form properties
  formName: string;
  title:string;
  addSupplierForm!: FormGroup;
  loading = false;
  buttons = [
    { type: 'cancel', name: 'Cancel',submit:false },
    { type: 'save', name: 'Save',submit:true }
  ];

  statuses = [
    { value: 'available', viewValue: 'Available'},
    { value: 'NotAvailable', viewValue: 'Not Available'},

  ];

  constructor(
    private fb: FormBuilder,
    private feedback: FeedbackService,
    private supplierService: SupplierService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {

    if(Object.keys(history.state).length == 1){
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.supplierService.getSupplierById(id).subscribe(
        data=>{
          this.data = data;
          this.update = true;
          this.name?.setValue(this.data?.name);
          this.address?.setValue(this.data?.address);
          this.contact?.setValue(this.data?.contact);
          this.storeName?.setValue(this.data?.storeName);
          this.email?.setValue(this.data?.email);
          this.formName = "updateSupplier";
          this.title = "Update Supplier";
        },
        error => {
          this.error = error;
        }
      )
    }else{
      // Initialise view data
      this.data = history.state;
      this.activatedRoute.data.subscribe(data => {
        this.update = data.update;
      });
    }

    this.formName = this.update ? 'updateSupplier' : 'addSupplier';
    this.title = this.update ? 'Update Supplier' : 'Add Supplier';

    this.buttons.map(button => {
      button['formName'] = this.formName;
    });



    // Initialise form inputs
    this.addSupplierForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ]],
      storeName: ['', Validators.required],
    });
    // Prepopulate form values if provided
    if (this.update && this.data) {
      this.name?.setValue(this.data?.name);
      this.address?.setValue(this.data?.address);
      this.contact?.setValue(this.data?.contact);
      this.email?.setValue(this.data?.email);
      this.storeName?.setValue(this.data?.storeName);
      this.formName = "updateSupplier";
      this.title = "Update Supplier";
    }
  }

  // Getters for form input values
  get name() {
    return this.addSupplierForm.get('name');
  }

  get address() {
    return this.addSupplierForm.get('address');
  }

  get contact() {
    return this.addSupplierForm.get('contact');
  }


  get email() {
    return this.addSupplierForm.get('email');
  }
  get storeName() {
    return this.addSupplierForm.get('storeName');
  }



  // Submit form function
  submit(): void {
    if (this.addSupplierForm.valid) {
      this.loading = true;

      // Create supplier object
      const supplier = {
        name: this.name?.value,
        address: this.address?.value,
        contact: this.contact?.value,
        storeName: this.storeName?.value,
        email: this.email?.value
      }

      if (!this.update) {
        this.supplierService.saveSupplier(supplier).subscribe(
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
        console.log("In update");
        this.supplierService.updateSupplier(this.data._id!, supplier).subscribe(
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
    this.feedback.success(`Supplier ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/suppliers']);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }

}
