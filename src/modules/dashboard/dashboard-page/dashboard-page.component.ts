import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashTaskConfigurerService} from './configurer/dash-task-configurer.service';
import {SelectInputConfigurer} from '../../app-common/generic-services/select-input-configurer';
import {InputSelectOption} from '../../app-common/components/inputs/input.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  dashTaskDataGridConfigurer!: DashTaskConfigurerService;
  submissionStatus: InputSelectOption[];
  selectedSubStatus = '';
  triggerTaskRefresh: Subject<void> = new Subject<void>();

  constructor(private dashTaskConfigurerService: DashTaskConfigurerService, private selectInputConfigurer: SelectInputConfigurer) {
    this.dashTaskDataGridConfigurer = dashTaskConfigurerService;
    this.initializeData();
  }

  ngOnInit(): void {
  }

  initializeData(): void {
    this.selectInputConfigurer.loadSelectData('Select_Task_Submission_Status').subscribe(value => {
      this.submissionStatus = value;
    });
  }

  onSelectChange(): void {
    console.log('sel change ', this.selectedSubStatus);
    this.dashTaskDataGridConfigurer.submissionStatus = this.selectedSubStatus;
    this.triggerTaskRefresh.next();
  }

  ngOnDestroy(): void {
    this.triggerTaskRefresh.unsubscribe();
  }

}
