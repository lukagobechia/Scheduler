import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { FuncService } from 'src/app/services/func.service';

@Component({
  selector: 'app-delete-change-user',
  templateUrl: './delete-change-user.component.html',
  styleUrls: ['./delete-change-user.component.css']
})
export class DeleteChangeUserComponent implements OnInit {

  Users: any[] = [];
  roleForm!: FormGroup;

  constructor(private FuncService: FuncService, private fb: FormBuilder, private translate: TranslateService) {}

  ngOnInit(): void {
    this.FetchUserData();
    this.initForm();
  }

  initForm(): void {
    this.roleForm = this.fb.group({
      newRoleId: ['', Validators.required]
    });
  }

  FetchUserData(): void {
    this.FuncService.getUsers().subscribe({
      next: (response) => {
        console.log('Users:', response);
        this.Users = response;
      },
      error: (error) => {
        console.error('Error fetching job options: ', error);
      }
    });
  }

  DeleteUser(userId: number): void {
    this.FuncService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log(`User with ID ${userId} Deleted successfully.`, response);
        this.FetchUserData();
      },
      error: (error) => {
        console.error(`Error declining request with ID ${userId}: `, error);
      }
    });
  }

  ChangeRole(userId: number): void {

    const userData = {
      userId: userId,
      newRoleId: this.roleForm.value.newRoleId
    };
    this.FuncService.changeRole(userData).subscribe({
      next: (response) => {
        console.log('Schedule request sent successfully:', response);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error sending schedule request: ', error);
      },
    });
  }

  switchLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'ka' : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
