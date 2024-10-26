import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/users/user.service';
import { environment } from 'src/environments/environment';

const DEFAULT_AVATAR = "assets/images/default-avatar.png";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  baseUrl = 'http://localhost:3001/';
  userSubscription: Subscription;
  user: any;
  section = 'personalInfo';
  showPass = false;
  editMode = false;
  avatarEditMode = false;
  loading = false;
  personalInfoForm!: FormGroup;
  changePasswordForm!: FormGroup;
  image: any;
  personalInfoFormName = "personalInfo";
  changePasswordFormName = "changePassword";
  title:string;
  avatarPath = DEFAULT_AVATAR;
  nameString?: string;
  roleString?: string;
  emailString?: string;
  phoneString?: string;

  buttons = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private feedback: FeedbackService,
  ) {
    this.userSubscription = this.authService.getUserInfo()
      .subscribe(user => {
        if (user && user._id) {
          this.user = user;
          this.setUserDetails();
        }
      });
  }

  ngOnInit(): void {
    this.personalInfoForm = this.fb.group({
      avatar: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('[0-9]{10}')
      ]]
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*')
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    });

    const user = this.authService.getUserObject();
    if (user && user._id) {
      this.user = user;
      this.setUserDetails();
    }
  }

  private setUserDetails() {
    if (this.user && this.user._id) {
      // Set display values
      this.nameString = `${this.user.firstName} ${this.user.lastName}`;
      this.roleString = this.formatText(this.user.type);
      this.emailString = this.user.email;
      this.phoneString = this.user.phone;
      this.title = `${this.user.firstName} ${this.user.lastName}`;
      // Set form values
      this.avatar?.setValue(this.user.avatar);
      this.firstName?.setValue(this.user.firstName);
      this.lastName?.setValue(this.user.lastName);
      this.email?.setValue(this.user.email);
      this.phone?.setValue(this.user.phone);

      // Disable the form
      this.personalInfoForm.disable()

      // Set avatar path
      if (this.avatar?.value) {
        this.avatarPath = `${this.baseUrl}api/employees/image/${this.avatar.value}`;
      }
    }
  }

  addImage(file: File) {
    this.image = file;
  }

  formatText(text: string) {
    const words = text.split("_");
    const capitalizedWords =  words.map(word => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    });
    return capitalizedWords.join(" ");
  }

  checkPasswordMatch() {
    if (this.newPassword?.value !== this.confirmPassword?.value) {
      this.confirmPassword?.setErrors({ noMatch: true });
    } else {
      this.confirmPassword?.setErrors(null);
    }
  }

  get avatar() {
    return this.personalInfoForm.get('avatar');
  }

  get firstName() {
    return this.personalInfoForm.get('firstName');
  }

  get lastName() {
    return this.personalInfoForm.get('lastName');
  }

  get email() {
    return this.personalInfoForm.get('email');
  }

  get phone() {
    return this.personalInfoForm.get('phone');
  }

  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  toggleEditMode(state?: 'on' | 'off') {
    switch (state) {
      case 'on':
        this.editMode = true;
        break;
      case 'off':
        this.editMode = false;
        break;
      default:
        this.editMode = !this.editMode;
    }

    this.editMode
      ? this.personalInfoForm.enable()
      : this.personalInfoForm.disable();
        this.resetData();
        this.avatarEditMode = false;
        this.image = null;
  }

  toggleAvatarEditMode() {
    this.avatarEditMode = !this.avatarEditMode;
  }

  resetData() {
    this.avatar?.setValue(this.user.avatar);
    this.firstName?.setValue(this.user.firstName);
    this.lastName?.setValue(this.user.lastName);
    this.email?.setValue(this.user.email);
    this.phone?.setValue(this.user.phone);
    this.currentPassword?.setValue('');
    this.newPassword?.setValue('');
    this.confirmPassword?.setValue('');
    this.personalInfoForm.markAsUntouched();
    this.changePasswordForm.markAsUntouched();
  }

  submitPersonalInfo() {
    if (this.personalInfoForm.valid) {
      this.loading = true;

      // Create user object
      const user = {
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        email: this.email?.value,
        phone: this.phone?.value,
      }

      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('data', JSON.stringify(user));

      // Call update function from user service
      this.userService.updateUser(this.user._id!, formData).subscribe(
        () => {
          this.success();
          this.toggleEditMode('off');
          this.authService.loadUserInfo();
        },
        () => {
          this.error();
        }
      ).add(() => {
        this.loading = false;
      })
    }
  }

  submitPasswordChange() {
    if (this.changePasswordForm.valid) {
      this.loading = true;

      const data = {
        email: this.user.email,
        currentPassword: this.currentPassword?.value,
        newPassword: this.newPassword?.value
      }

      this.userService.changePassword(this.user._id, data).subscribe(data => {
        if (data._id) {
          this.feedback.success('Password updated successfully!');
          this.toggleEditMode('off');
          this.section = 'personalInfo';
        }
      }, error => {
        if (error.status === 401) {
          this.feedback.error('Current password is incorrect.');
          this.currentPassword?.setErrors({ incorrect: true });
        }
      })
    }
  }

  private success(): void {
    this.feedback.success(`Profile changes saved successfully!`);
  }

  private error(): void {
    this.feedback.error('Something went wrong, please try again...');
  }
}
