import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Site} from "../site.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../services/feedback.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SiteService} from "../../../services/site/site.service";
import {UserService} from "../../../services/users/user.service";
import {User} from "../../users/user.model";

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent implements OnInit {

  apiUrl ='http://localhost:3001/api/site';

  update:boolean;
  data:Site;

// Form properties
  formName: string;
  title:string;
  addSiteForm!: FormGroup;
  loading = false;
  buttons = [
    { type: 'cancel', name: 'Cancel',submit:false },
    { type: 'save', name: 'Save', submit:true }
  ];
  siteManagers:any[] = [];

  constructor(private fb: FormBuilder,
              private feedback: FeedbackService,
              private siteService: SiteService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private userService:UserService
  ) {
  }

  getAllSiteManagers(){
    this.loading = true;
    this.userService.getAllSiteManagers().subscribe(
      data => {
        this.loading = false;
        data.map( i =>{
          const name = i.firstName + " " + i.lastName;
          const manager = {
            name:(name),
            id:i._id
          }
          this.siteManagers.push(manager);
        })
      },
      error => {
        console.log("In error");
        this.loading = false;

      }
    )
  }
  ngOnInit(): void {
  this.getAllSiteManagers();
    if(Object.keys(history.state).length == 1){
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      this.siteService.getSiteById(id).subscribe(
        data=>{
          this.data = data;
          this.update = true;
          this.siteId?.setValue(this.data?.siteId);
          this.siteName?.setValue(this.data?.siteName);
          this.siteAddress?.setValue(this.data?.siteAddress);
          this.manager?.setValue(this.data?.manager);
          this.contact?.setValue(this.data?.contact);

          this.formName = "updateSite";
          this.title = "Update Site";
        },
        error => {
        }
      )
    }else{
      // Initialise view data
      this.data = history.state;
      this.activatedRoute.data.subscribe(data => {
        this.update = data.update;
      });
    }

    this.formName = this.update ? 'updateSite' : 'addSite';
    this.title = this.update ? 'Update Site' : 'Add Site';

    this.buttons.map(button => {
      button['formName'] = this.formName;
    });



    // Initialise form inputs
    this.addSiteForm = this.fb.group({
      siteId:['', Validators.required],
      siteName: ['', Validators.required],
      siteAddress: ['', Validators.required],
      manager: ['', Validators.required],
      contact: ['', Validators.required],
    });

    // Prepopulate form values if provided
    if (this.update && this.data) {
      this.siteId?.setValue(this.data?.siteId);
      this.siteName?.setValue(this.data?.siteName);
      this.siteAddress?.setValue(this.data?.siteAddress);
      this.manager?.setValue(this.data?. manager._id);
      this.contact?.setValue(this.data?.contact);
      this.formName = "updateSite";
      this.title = "Update Site";
    }

  }

  // Getters for form input values
  get siteName() {
    return this.addSiteForm.get('siteName');
  }
  get siteAddress() {
    return this.addSiteForm.get('siteAddress');
  }
  get manager() {
    return this.addSiteForm.get('manager');
  }
  get siteId() {
    return this.addSiteForm.get('siteId');
  }
  get contact() {
    return this.addSiteForm.get('contact');
  }




  // Submit form function
  submit(): void {
    if (this.addSiteForm.valid) {
      this.loading = true;

      // Create site object
      const site = {
        siteId:this.siteId?.value,
        siteName: this.siteName?.value,
        siteAddress: this.siteAddress?.value,
        manager: this.manager?.value,
        contact: this.contact?.value,
      }
      console.log(site);
      if (!this.update) {
        this.siteService.saveSite(site).subscribe(
          () => {
            this.success();
          },
          () => {
            console.log("error")
            this.displayError();
          },
        ).add(() => {
          this.loading = false;
        });
      } else {
        console.log("In update");
        this.siteService.updateSite(this.data.siteId!, site).subscribe(
          () => {
            this.success();
          },
          () => {
            this.displayError();
          }
        ).add(() => {
          this.loading = false;
        })
      }
    }
  }
  private success(): void {
    this.feedback.success(`Site ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/sites']);
  }

  private displayError(): void {
    this.feedback.error('Something went wrong, please try again...');
  }



}
