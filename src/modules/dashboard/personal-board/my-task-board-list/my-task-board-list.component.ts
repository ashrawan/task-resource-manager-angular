import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractDataConfigurer} from '../../../app-common/generic-services/abstract-data-configurer';
import {Task} from '../../../app-common/services/model';
import {MyTaskBoardConfigurerService} from '../configurer/my-task-board-configurer.service';
import {OpDataEmit} from '../../../app-common/components/tables/table-model';

@Component({
  selector: 'app-my-task-board-list',
  templateUrl: './my-task-board-list.component.html',
  styleUrls: ['./my-task-board-list.component.scss']
})
export class MyTaskBoardListComponent implements OnInit {

  @Output() taskSelected: EventEmitter<Task> = new EventEmitter<Task>();

  myTaskDataGridConfigurer!: AbstractDataConfigurer<Task>;

  constructor(private myTaskBoardConfigurerService: MyTaskBoardConfigurerService) {
    this.myTaskDataGridConfigurer = myTaskBoardConfigurerService;
  }

  ngOnInit(): void {
  }

  onTaskSelected(opDataEmit: OpDataEmit): void {
    this.taskSelected.emit(opDataEmit.data);
  }

}
