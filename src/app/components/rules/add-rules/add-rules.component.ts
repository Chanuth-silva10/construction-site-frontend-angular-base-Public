import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Rules} from "../../rules/rules.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../services/feedback.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RulesService} from "../../../services/rules/rules.service";

@Component({
  selector: 'app-add-rules',
  templateUrl: './add-rules.component.html',
  styleUrls: ['./add-rules.component.css']
})
export class AddRulesComponent implements OnInit {

  apiUrl ='http://localhost:3001/api/rules';

  update:boolean;
  data:Rules;

// Form properties
  formName: string;
  title:string;
  addRulesForm!: FormGroup;
  loading = false;
  buttons = [
    { type: 'cancel', name: 'Cancel' },
    { type: 'save', name: 'Save',submit:true }
  ];


  userTypes = [
    { value: 'procurement_staff', viewValue: 'Procurement Staff'},
    { value: 'staff_supervisor', viewValue: 'Staff_Supervisor'},
    { value: 'site_manager', viewValue: 'Site Manager'}
  ];

  approvalTypes = [
    { value: 'single', viewValue: 'Single Approval'},
    { value: 'multiple', viewValue: 'Multiple Approval'}
  ];


  constructor(private fb: FormBuilder,
              private feedback: FeedbackService,
              private rulesService: RulesService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    if(Object.keys(history.state).length == 1){
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.rulesService.getRulesById(id).subscribe(
        data=>{
          this.data = data;
          this.update = true;

          this.name?.setValue(this.data?.name);
          this.limit?.setValue(this.data?.limit);
          this.description?.setValue(this.data?.description);
          this.approvals?.setValue(this.data?.approvals);
          this.approvalType?.setValue(this.data?.approvalType);
          this.formName = "updateRules";
          this.title = "Update Rules";
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

    this.formName = this.update ? 'updateRules' : 'addRules';
    this.title = this.update ? 'Update Rules' : 'Add Rules';

    this.buttons.map(button => {
      button['formName'] = this.formName;
    });



    // Initialise form inputs
    this.addRulesForm = this.fb.group({
      name: ['', Validators.required],
      limit:['', [
        Validators.required,
        Validators.pattern('^[1-9]\\d*$')
      ]],
      description: ['',Validators.required],
      approvals:['',Validators.required],
      approvalType:['',Validators.required],
    });
    // Prepopulate form values if provided
    if (this.update && this.data) {
      this.name?.setValue(this.data?.name);
      this.limit?.setValue(this.data?.limit);
      this.description?.setValue(this.data?.description);
      this.approvals?.setValue(this.data?.approvals);
      this.approvalType?.setValue(this.data?.approvalType);
      this.formName = "updateRules";
      this.title = "Update Rules";
    }

  }

  // Getters for form input values

  get name() {
    return this.addRulesForm.get('name');
  }
  get limit() {
    return this.addRulesForm.get('limit');
  }

  get description() {
    return this.addRulesForm.get('description');
  }
  get approvals() {
    return this.addRulesForm.get('approvals');
  }
  get approvalType() {
    return this.addRulesForm.get('approvalType');
  }

  // Submit form function
  submit(): void {
    console.log(this.addRulesForm.value);
    if (this.addRulesForm.valid) {
      this.loading = true;

      // Create rules object
      const rules = {
        // type:this.type?.setValue(this.data?.type),
        name: this.name?.value,
        limit:this.limit?.value,
        description: this.description?.value,
        approvals:this.approvals?.value,
        approvalType:this.approvalType?.value
      }

      if (!this.update) {
        this.rulesService.saveRules(rules).subscribe(
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
        this.rulesService.updateRules(this.data._id!, rules).subscribe(
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
    this.feedback.success(`Rules ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/rules']);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }



}
