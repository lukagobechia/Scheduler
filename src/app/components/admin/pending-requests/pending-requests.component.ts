import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FuncService } from 'src/app/services/func.service';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent implements OnInit {
  constructor(private FuncService: FuncService,private translate:TranslateService){}
  ngOnInit(): void {
    this.fetchRequests();
  }
  Requests: any[] = [];

  fetchRequests():void {
    this.FuncService.getRequests().subscribe({
     next: (response) => {
       console.log('Requests', response);
       this.Requests = response;
     },
     error: (error) => {
       console.error('Error fetching pending requests: ',error);
     }
    });
   }

   approveRequest(requestId: number): void {
    // Assuming requestId is equivalent to scheduleId
    const scheduleId = requestId;
  
    this.FuncService.approveRequest(scheduleId).subscribe({
      next: (response) => {
        console.log(`Request with ID ${scheduleId} approved successfully.`, response);
        // Refresh the list of requests after approval
        this.fetchRequests();
      },
      error: (error) => {
        console.error(`Error approving request with ID ${scheduleId}: `, error);
      }
    });
  }

  declineRequest(requestId: number): void {
    this.FuncService.deleteRequest(requestId).subscribe({
      next: (response) => {
        console.log(`Request with ID ${requestId} declined successfully.`, response);
        this.fetchRequests();
      },
      error: (error) => {
        console.error(`Error declining request with ID ${requestId}: `, error);
      }
    });
  }

  switchLanguage() {
    this.translate.use(this.translate.currentLang === 'en' ? 'ka' : 'en');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
}
