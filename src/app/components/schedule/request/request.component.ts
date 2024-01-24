import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncService } from 'src/app/services/func.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  scheduleForm!: FormGroup;

  constructor(private funcService: FuncService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      selectedDate: ['', Validators.required],
      selectedShift: ['', Validators.required]
    });
  }

  private decodeToken(token: any): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding JWT token', e);
      return null;
    }
  }

  addSchedule(): void {
    const formValue = this.scheduleForm.value;
    const selectedDate = new Date(formValue.selectedDate);
    
    let temp = '';
    const startTime = new Date(selectedDate);
    const endTime = new Date(selectedDate);
    
    if (formValue.selectedShift === 'Morning') {
      startTime.setHours(12, 0, 0, 0);
      endTime.setHours(20, 0, 0, 0);
      temp = 'Morning';
      console.log(temp);
      console.log('Start Time:', startTime.toISOString());
      console.log('End Time:', endTime.toISOString());
    } else if (formValue.selectedShift === 'Evening') {
      // Set the hours to 24 for the next day
      startTime.setHours(20, 0, 0, 0);
      endTime.setDate(endTime.getDate() + 1);
      endTime.setHours(4, 0, 0, 0);
      temp = 'Evvening';
      console.log(temp);
      console.log('Start Time:', startTime.toISOString());
      console.log('End Time:', endTime.toISOString());
    }
    
    

    const token = localStorage.getItem('token');
    const decodedToken = this.decodeToken(token);
    const userID = decodedToken?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

    const userData = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      userId: userID
    };

    


    this.funcService.sendRequest(userData).subscribe({
      next: (response) => {
        console.log('Schedule request sent successfully:', response);
      },
      error: (error) => {
        console.error('Error sending schedule request: ', error);
      },
    });
  }
}
