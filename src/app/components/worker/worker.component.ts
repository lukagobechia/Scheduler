import { Component } from '@angular/core';
import { FuncService } from 'src/app/services/func.service';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent {
  constructor(private FuncService: FuncService){}

  logOut(){
    this.FuncService.logOut();
  }
}
