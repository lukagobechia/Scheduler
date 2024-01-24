import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FuncService } from 'src/app/services/func.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  EmailOrPassIncorrect: string = '';

  constructor(
    private fb: FormBuilder,
    private FuncService: FuncService,
    private router: Router,
    private translate: TranslateService
  ) {translate.setDefaultLang('en'); }

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){

  }

  @HostListener('document:keyup.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    this.Login();
  }
  
  Login(){
    if(this.loginForm.valid){
      const userData = this.loginForm.value;
      this.FuncService.logInUser(userData).subscribe({
        next:(response: any) => {
          console.log('logged in successfully: ',response);
          const jwtToken = response;
          localStorage.setItem('token', jwtToken);

           const decodedToken= this.decodeToken(jwtToken);
           const role= decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

           if(role==='1'){
             this.router.navigate(['/admin']);
           }else if(role=== '2'){
             this.router.navigate(['/worker']);
           }
           else{
             console.log('Login failed. Please check your credentials', 'Error');
           }
        },
        error:(error) =>{
          console.log('login failed: ',error);
        if (error.status === 500) {
          this.EmailOrPassIncorrect = this.translate.instant('validation.EmailOrPassIncorrect');
          console.log(this.EmailOrPassIncorrect);
        } else {
          console.log('Unexpected error during login');
        }
        }
      })
    }
  }
  
  private decodeToken(token: string): any{
    try{
      return JSON.parse(atob(token.split('.')[1]));
    }catch(e){
      console.error('Error decoding JWT token', e);
      return null;
    }
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

  val_pass() {
    if (this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched) {
      if (this.loginForm.get('password')?.errors?.['minlength']) {
        return this.translate.instant('validation.passwordLength');
      } else if (this.loginForm.get('password')?.errors?.['required']) {
        return this.translate.instant('validation.passwordRequired');
      } else {
        return this.translate.instant('validation.passwordInvalid');
      }
    }
    return null;
  }  

  isSignUpActive: boolean = false;

  togglePanel() {
    this.isSignUpActive = !this.isSignUpActive;
  }
  switchLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'ka' : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
