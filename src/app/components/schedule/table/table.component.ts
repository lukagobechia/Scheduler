import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FuncService } from 'src/app/services/func.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  jobOptions: any[] = [];
  days: string[] = ['sunday','monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  dates: string[] = [];
  Requests: any[] = [];
  ApprovedRequests: any[] = [];
  currentWeekStartDate!: Date;
  worker: any[] = [];
  
    
    constructor(private FuncService: FuncService, private translate:TranslateService) {translate.setDefaultLang('en'); }

  ngOnInit(): void {
    this.initializeDates();
    this.fetchJobOptions();
    this. fetchRequests();
    this.fetchApprovedRequests();
  }
  
  initializeDates(): void {
    // Get the current date
    const currentDate = new Date();
    
    // Set the currentWeekStartDate to the beginning of the current week (Sunday)
    this.currentWeekStartDate = new Date(currentDate);
    this.currentWeekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
  
    // Initialize dates array based on the current week
    for (let i = 0; i < 7; i++) {
      const date = new Date(this.currentWeekStartDate);
      date.setDate(date.getDate() + i);
      const formattedDate = this.formatDate(date);
      this.dates.push(formattedDate);
    }
  }
  
  private formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}`;
  }
  

  getMonthAbbreviation(month: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month];
  }
  
  fetchJobOptions(): void {
    this.FuncService.getJobOptions().subscribe({
      next: (response) => {
        console.log('Job options:', response);
        this.jobOptions = response;
      },
      error: (error) => {
        console.error('Error fetching job options: ', error);
      },
    });
  }

  fetchRequests(): void {
    this.FuncService.getSchedules().subscribe({
      next: (response) => {
        console.log('Schedules', response);
        this.Requests = response;

      },
      error: (error) => {
        console.error('Error fetching schedules: ', error);
      },
    });
  }

  // Add this method to calculate ShiftType based on the start time
  calculateShiftType(startTime: string): string {
    // Log the original start time
    console.log('Original startTime:', startTime);
  
    // Assuming startTime is in the format "2024-01-12 12:00:00.0000000"
    const timeComponents = startTime.split('T')[1].split(':');
    const hour = parseInt(timeComponents[0], 10);

    console.log('Extracted hour:', hour);
      
    // Check if the hour is between 8 and 16
    if (hour >= 8 && hour < 16) {
      return 'Morning';
    } else {
      return 'Evening';
    }
  }
  
  fetchApprovedRequests(): void {
    this.FuncService.getSchedules().subscribe({
      next: (response) => {
        this.Requests = response;
  
        this.ApprovedRequests = this.Requests.filter(schedule => schedule.isApproved === true);

        this.ApprovedRequests.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

        // this.ApprovedRequests = this.ApprovedRequests.sort((a, b) => a.startTime - b.startTime);
        console.log('Approved Schedules', this.ApprovedRequests);
  
        this.ApprovedRequests.forEach(schedule => {
          this.worker.push({
            date: this.extractDate(schedule.startTime),
            jobTitle: schedule.jobTitle,
            info: `${this.calculateShiftType(schedule.startTime)} - ${schedule.firstName} ${schedule.lastName}`
          });
  
        });
      },
      error: (error) => {
        console.error('Error fetching schedules: ', error);
      },
    });
  }
  
  private extractDate(startTime: string): string {
    const [datePart, timePart] = startTime.split('T');
    const [year, month, day] = datePart.split('-');
    return `${month}-${day}`;
  }
  
  
  navigateWeek(offset: number): void {
    // Update the currentWeekStartDate based on the offset
    this.currentWeekStartDate.setDate(this.currentWeekStartDate.getDate() + offset);

    // Update the dates array based on the new week
    this.dates = [];
    for (let i = 0; i <7; i++) {
      const date = new Date(this.currentWeekStartDate);
      date.setDate(date.getDate() + i);
      const formattedDate = this.formatDate(date);
      this.dates.push(formattedDate);
    }

    // Fetch job options for the new week
    this.fetchJobOptions();
  }

  switchLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'ka' : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
