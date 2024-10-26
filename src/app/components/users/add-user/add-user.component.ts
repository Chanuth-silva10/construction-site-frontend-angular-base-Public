import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { User } from '../user.model';
import { UserService } from 'src/app/services/users/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionService } from 'src/app/services/permissions/permission.service';
import { Permission } from '../../permissions/permission.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  update: boolean;
  data: User;
  permissionSubscription?: Subscription;
  error?:string;

  // Form properties
  formName: string;
  title: string;
  addUserForm!: FormGroup;
  showPass = false;
  loading = false;
  permissions: Permission[] = [];
  permissionControl: any;
  updatePermissions: any = [];

  types = [
    { value: 'procurement_staff', viewValue: 'Procurement Staff'},
    { value: 'staff_supervisor', viewValue: 'Staff_supervisor'},
    { value: 'site_manager', viewValue: 'Site Manager'}
  ];

  buttons = [
    { type: 'cancel', name: 'Cancel', submit: false },
    { type: 'save', name: 'Save', submit: true }
  ];

  constructor(
    private fb: FormBuilder,
    private feedback: FeedbackService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    // Initialise view data
    this.data = history.state;
    this.activatedRoute.data.subscribe(data => {
      this.update = data.update;
    });

    this.formName = this.update ? 'updateUser' : 'addUser';
    this.title = this.update ? 'Update Staff' : 'Add Staff';

    this.buttons.map(button => {
      button['formName'] = this.formName;
    });

    this.getAllPermissions();

    if(Object.keys(history.state).length == 1){
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.userService.getUserById(id).subscribe(
        data => {
          this.data = data;
          this.update = true;
          this.firstName?.setValue(this.data?.firstName);
          this.lastName?.setValue(this.data?.lastName);
          this.email?.setValue(this.data?.email);
          this.phone?.setValue(this.data?.phone);
          this.type?.setValue(this.data?.type);
          this.updatePermissions = this.data?.permissions;
          this.getAllPermissions();
          this.formName = "updateUser";
          this.title = "Update Staff";
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

    // Initialise form inputs
    this.addUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*')
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ]],
      type: ['procurement_staff', Validators.required],
      permissions: this.fb.array(this.permissions.map(x => false)),
    });

    // Prepopulate form values if provided
    if (this.update && this.data) {
      this.firstName?.setValue(this.data?.firstName);
      this.lastName?.setValue(this.data?.lastName);
      this.email?.setValue(this.data?.email);
      this.phone?.setValue(this.data?.phone);
      this.type?.setValue(this.data?.type);
      this.updatePermissions = this.data?.permissions;
    }
  }

  // Getters for form input values
  get firstName() {
    return this.addUserForm.get('firstName');
  }

  get lastName() {
    return this.addUserForm.get('lastName');
  }

  get email() {
    return this.addUserForm.get('email');
  }

  get password() {
    return this.addUserForm.get('password');
  }

  get phone() {
    return this.addUserForm.get('phone');
  }

  get type() {
    return this.addUserForm.get('type');
  }

  getAllPermissions(){
    this.loading = true;
    this.permissionService.getAllPermissions().subscribe(
      data => {
        console.log(data);
        this.loading = false;
        this.permissions = data;
        this.addUserForm.controls.permissions=this.fb.array(this.permissions.map(x => false))
        this.permissionControl = (this.addUserForm.controls.permissions as FormArray);
        this.permissionSubscription = this.permissionControl.valueChanges.subscribe(permission => {
          this.permissionControl.setValue(
            this.permissionControl.value.map((value, i) => value ? this.permissions[i].permissionId : false),
            { emitEvent: false }
          );
        });
        //Pre select the permissions on edit
        if(this.updatePermissions.length > 0){
          this.permissionControl.setValue(
            this.permissionControl.value.map((value, i) =>{
              if(this.updatePermissions.includes(this.permissions[i].permissionId)){
                return  this.permissions[i].permissionId;
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

  // Submit form function
  submit(): void {
    const permissionControl = (this.addUserForm.controls.permissions as FormArray);

    if (this.addUserForm.valid) {
      this.loading = true;

      // Create user object
      const user: User = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        password: this.password?.value,
        phone: this.phone?.value,
        type: this.type?.value,
        permissions: permissionControl.value.filter(value => !!value),
      }
      console.log(user);

      // Call save/update function from user service
      if (!this.update) {
        this.userService.saveUser(user).subscribe(
          () => {
            this.successFeedback();
          },
          () => {
            this.errorFeedback();
          },
        ).add(() => {
          this.loading = false;
        });
      } else {
        let formData = new FormData();
        formData.append('data', JSON.stringify(user));

        this.userService.updateUser(this.data._id!, formData).subscribe(
          () => {
            this.successFeedback();
          },
          () => {
            this.errorFeedback();
          }
        ).add(() => {
          this.loading = false;
        })
      }
    }
  }

  private successFeedback(): void {
    this.feedback.success(`Staff ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/staff']);
  }

  private errorFeedback(): void {
    this.feedback.error('Something went wrong, please try again...');
  }

}
