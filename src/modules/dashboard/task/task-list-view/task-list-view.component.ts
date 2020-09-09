import {Component, OnInit} from '@angular/core';
import {AbstractDataConfigurer} from '../../../app-common/generic-services/abstract-data-configurer';
import {Task} from '../../../app-common/services/model';
import {TaskConfigurerService} from '../configurer/task-configurer.service';

@Component({
  selector: 'app-task-list-view',
  templateUrl: './task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss']
})
export class TaskListViewComponent implements OnInit {

  taskDataGridConfigurer!: AbstractDataConfigurer<Task>;

  constructor(private taskConfigurerService: TaskConfigurerService) {
    this.taskDataGridConfigurer = taskConfigurerService;
  }

  ngOnInit(): void {
  }

}
