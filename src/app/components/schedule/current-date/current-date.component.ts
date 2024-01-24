import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-current-date',
  templateUrl: './current-date.component.html',
  styleUrls: ['./current-date.component.css']
})
export class CurrentDateComponent {
  constructor(private translate: TranslateService){
    translate.setDefaultLang('en');
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const monthAbbreviation = this.getMonthAbbreviation(currentDate.getMonth());
    const weekStarts = this.weekStarts();
    const Week = this.week();

    // Display the current date (Month Day)
    const currentDateString = `${monthAbbreviation} ${currentDate.getDate()}`;

    // Display the date of the week's beginning (Month Day)
    const weekStartDate = new Date(currentDate);
    weekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
    const weekStartDateString = `${monthAbbreviation} ${weekStartDate.getDate()}`;

    // Display the week number
    const currentWeekNumber = this.getWeekNumber(currentDate);

    return `${currentDateString} (${weekStarts} ${weekStartDateString}, ${Week} ${currentWeekNumber})`;
  }
  
  private getMonthAbbreviation(month: number): string {
    const monthAbbreviation = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return this.translate.instant(`months.${monthAbbreviation[month]}`);
  }
  private weekStarts(){
    return this.translate.instant(`WeekS`);
  }
  private week(){
    return this.translate.instant(`Week`);

  }
  private getWeekNumber(date: Date): number {
    const currentDate = new Date(date.getTime());
    currentDate.setHours(0, 0, 0, 0);
    currentDate.setDate(currentDate.getDate() + 4 - (currentDate.getDay() || 7));

    const yearStart = new Date(currentDate.getFullYear(), 0, 1);
    
    // Explicitly cast to number
    const weekNumber = Math.ceil((((currentDate.getTime() - yearStart.getTime()) / 86400000) + 1) / 7) as number;

    return weekNumber;
  }
}
