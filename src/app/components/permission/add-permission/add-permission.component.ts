import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../services/feedback.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Permission} from "../permission.model";
import {PermissionService} from "../../../services/permission/permission.service";

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {

  apiUrl ='http://localhost:3001/api/permission';

  update:boolean;
  data:Permission;

// Form properties
  formName: string;
  title:string;
  addPermissionForm!: FormGroup;
  loading = false;
  buttons = [
    { type: 'cancel', name: 'Cancel',submit: false },
    { type: 'save', name: 'Save',submit:true }
  ];


  constructor( private fb: FormBuilder,
               private feedback: FeedbackService,
               private permissionService: PermissionService,
               private router:Router,
               private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    if(Object.keys(history.state).length == 1){
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.permissionService.getPermissionById(id).subscribe(
        data=>{
          this.data = data;
          this.update = true;
          this.name?.setValue(this.data?.name);
          this.description?.setValue(this.data?.description);
          this.formName = "updatePermission";
          this.title = "Update Permission";
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

    this.formName = this.update ? 'updatePermission' : 'addPermission';
    this.title = this.update ? 'Update Permission' : 'Add Permission';

    this.buttons.map(button => {
      button['formName'] = this.formName;
    });


    // Initialise form inputs
    this.addPermissionForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],

    });
    // Prepopulate form values if provided
    if (this.update && this.data) {
      this.name?.setValue(this.data?.name);
      this.description?.setValue(this.data?.description);
      this.formName = "updatePermission";
      this.title = "Update Permission";
    }
  }

  // Getters for form input values
  get name() {
    return this.addPermissionForm.get('name');
  }

  get description() {
    return this.addPermissionForm.get('description');
  }


  // Submit form function
  submit(): void {
    if (this.addPermissionForm.valid) {
      this.loading = true;

      // Create supplier object
      const permission = {
        name: this.name?.value,
        description: this.description?.value,

      }

      if (!this.update) {
        this.permissionService.savePermission(permission).subscribe(
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
        this.permissionService.updatePermission(this.data._id!, permission).subscribe(
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
    this.feedback.success(`Permission ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/permissions']);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }

}
