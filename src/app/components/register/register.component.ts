import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Job } from 'src/app/interfaces/job';
import { FuncService } from 'src/app/services/func.service';
import { CustomValidator } from 'src/app/validators/val.Validators';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordMismatch: true };
  }

  return null;
};

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  jobOptions: Job[] = [];

  constructor(
    private fb: FormBuilder,
    private FuncService: FuncService,
    private router: Router,
    private translate: TranslateService
  ) {translate.setDefaultLang('en'); }
  
  ngOnInit(): void {
     this.createForm();
     this.fetchJobOptions();
  }
  createForm(): void {
    this.registrationForm = this.fb.group({
      firstName: [null, [Validators.required,CustomValidator.noSpaceValidator]],
      lastName: [null, [Validators.required,CustomValidator.noSpaceValidator]],
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required],
      jobId:  [null,Validators.required]
    }, {validators: passwordMatchValidator});
  }

  val_fn() {
    if (this.registrationForm.get('firstName')?.invalid && this.registrationForm.get('firstName')?.touched) {
      if (this.registrationForm.get('firstName')?.errors?.['noSpaceValidator']) {
        return this.translate.instant('validation.spaceValidator');
      } else if (this.registrationForm.get('firstName')?.errors?.['required']) {
        return this.translate.instant('validation.firstNameRequired');
      }
    }
    return null;
  }
  val_ln() {
    if (this.registrationForm.get('lastName')?.invalid && this.registrationForm.get('lastName')?.touched) {
      if (this.registrationForm.get('lastName')?.errors?.['noSpaceValidator']) {
        return this.translate.instant('validation.spaceValidator');
      } else if (this.registrationForm.get('lastName')?.errors?.['required']) {
        return this.translate.instant('validation.lastNameRequired');
      }
    }
    return null;
  }
  val_email(){
    if(this.registrationForm.get('email')?.invalid && this.registrationForm.get('email')?.touched){
      return this.translate.instant('validation.emailInvalid');
    }
    return null;
  }

  val_pass() {
    if (this.registrationForm.get('password')?.invalid && this.registrationForm.get('password')?.touched) {
      if (this.registrationForm.get('password')?.errors?.['minlength']) {
        return this.translate.instant('validation.passwordLength');
      } else if (this.registrationForm.get('password')?.errors?.['required']) {
        return this.translate.instant('validation.passwordRequired');
      } else return this.translate.instant('validation.passwordInvalid');
    } 
    return null;
  }
  val_conf_pass1(){
    return this.registrationForm.get('confirmPassword')?.invalid && this.registrationForm.get('confirmPassword')?.touched;
  }
  val_confirm_pass2(){
    return this.registrationForm.get('confirmPassword')?.errors?.['passwordMatchValidator'];
  }
  onSubmit(){
    console.log(this.registrationForm);
  }

    Register(){
      if(this.registrationForm.valid){
        const {confirmPassword, jobId, ...userData} = this.registrationForm.value;
        const job = jobId as Job;

        this.FuncService.registerUser({...userData, JobId: job.id}).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log('Registration failed: ', error);
          }
        });
      }
    }

    
  fetchJobOptions():void {
   this.FuncService.getJobOptions().subscribe({
    next: (response) => {
      console.log('Job options:', response);
      this.jobOptions = response;
    },
    error: (error) => {
      console.error('Error fetching job options: ',error);
    }
   });
  }

  isSignUpActive: boolean = true;

  togglePanel() {
    this.isSignUpActive = !this.isSignUpActive;
  }

  goToLogIn(){
    this.router.navigate(['/login']);
  }
  switchLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'ka' : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
