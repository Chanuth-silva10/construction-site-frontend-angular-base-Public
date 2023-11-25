import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Category} from "../category.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FeedbackService} from "../../../services/feedback.service";
import {CategoryService} from "../../../services/category/category.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  baseUrl:string = environment.baseUrl;
  apiUrl = this.baseUrl+'api/category';

  update:boolean;
  data:Category;
  id:string;

// Form properties
  formName: string;
  title:string;
  addCategoryForm!: FormGroup;
  loading = false;
  buttons = [
    { type: 'cancel', name: 'Cancel',submit:false },
    { type: 'save', name: 'Save',submit:true }
  ];

  constructor(private fb: FormBuilder,
              private feedback: FeedbackService,
              private categoryService: CategoryService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {


      const id = this.activatedRoute.snapshot.paramMap.get('id');
      console.log(id);
      if(id!=null) {
        this.categoryService.getCategoryById(id).subscribe(
          data => {
            console.log(data);
            this.data = data;
            this.update = true;
            this.name?.setValue(this.data?.name);
            this.description?.setValue(this.data?.description);
            this.title = "Update Category";
          },
          error => {
            console.log(error);
          }
        )
      }



    this.formName = this.update ? 'updateCategory' : 'addCategory';
    this.title = this.update ? 'Update Category' : 'Add Category';

    this.buttons.map(button => {
      button['formName'] = this.formName;
    });



    // Initialise form inputs
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });


  }

  // Getters for form input values
  get name() {
    return this.addCategoryForm.get('name');
  }

  get description() {
    return this.addCategoryForm.get('description');
  }


  // Submit form function
  submit(): void {
    console.log("In submit");
    console.log(this.addCategoryForm.value)
    if (this.addCategoryForm.valid) {
      this.loading = true;

      // Create category object
      const category = {
        name: this.name?.value,
        description: this.description?.value,
      }

      if (!this.update) {
        this.categoryService.saveCategory(category).subscribe(
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
        this.categoryService.updateCategory(this.data._id!, category).subscribe(
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
    this.feedback.success(`Category ${this.update ? 'updated' : 'added'} successfully!`);
    this.router.navigate(['/categories']);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }

}
