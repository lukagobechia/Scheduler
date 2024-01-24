import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Job } from 'src/app/interfaces/job';
import { FuncService } from 'src/app/services/func.service';

@Component({
  selector: 'app-add-delete-job',
  templateUrl: './add-delete-job.component.html',
  styleUrls: ['./add-delete-job.component.css']
})
export class AddDeleteJobComponent implements OnInit {

  constructor(private FuncService: FuncService, private fb: FormBuilder, private translate: TranslateService) { }
  
  jobOptions: Job[] = [];
  jobForm!:FormGroup;

  ngOnInit(): void {
    this.fetchJobOptions();
    this.initForm();
  }
  

  initForm(){
    this.jobForm = this.fb.group({
      title: ['', Validators.required]
    })
  }

  fetchJobOptions(): void {
    this.FuncService.getJobOptions().subscribe({
      next: (response) => {
        console.log('Job options:', response);
        this.jobOptions = response;
      },
      error: (error) => {
        console.error('Error fetching job options: ', error);
      }
    });
  }

  DeleteJob(jobId: number): void {
    this.FuncService.deleteJob(jobId).subscribe({
      next: (response) => {
        console.log(`Job with ID ${jobId} Deleted successfully.`, response);
        this.fetchJobOptions();
      },
      error: (error) => {
        console.error(`Error declining request with ID ${jobId}: `, error);
      }
    });
  }
  
  newJob!:string;

  addNewJob(): void{
    if(!this.newJob){
      console.error("Job Name Is Required");
      return;
    }

    const jobDto = {title: this.newJob};

    this.FuncService.addNewJob(jobDto).subscribe({
      next: (response) => {
        console.log('Job Added Succesfully: ', response);
        location.reload();
      },
      error: (error) => {
        console.error('Error adding Job: ', error);
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
