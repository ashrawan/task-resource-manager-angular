import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Task} from '../../../app-common/services/model';
import {MyTaskBoardConfigurerService} from '../configurer/my-task-board-configurer.service';
import {OpDataEmit} from '../../../app-common/components/tables/table-model';
import {InputSelectOption} from '../../../app-common/components/inputs/input.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-my-task-board-list',
  templateUrl: './my-task-board-list.component.html',
  styleUrls: ['./my-task-board-list.component.scss']
})
export class MyTaskBoardListComponent implements OnInit, OnDestroy {

  @Output() taskSelected: EventEmitter<Task> = new EventEmitter<Task>();

  myTaskDataGridConfigurer!: MyTaskBoardConfigurerService;
  taskByList: InputSelectOption[];
  taskByValue = 'ASSIGNED';
  triggerTaskRefresh: Subject<void> = new Subject<void>();

  constructor(private myTaskBoardConfigurerService: MyTaskBoardConfigurerService) {
    this.myTaskDataGridConfigurer = myTaskBoardConfigurerService;
    this.initializeData();
  }

  ngOnInit(): void {
  }

  initializeData(): void {
    this.taskByList = this.myTaskBoardConfigurerService.selectTaskByList;
  }

  onTaskSelected(opDataEmit: OpDataEmit): void {
    this.taskSelected.emit(opDataEmit.data);
  }

  onSelectChange(): void {
    console.log('sel change ', this.taskByValue);
    this.myTaskDataGridConfigurer.setTaskBy = this.taskByValue;
    this.triggerTaskRefresh.next();
  }

  ngOnDestroy(): void {
    this.triggerTaskRefresh.unsubscribe();
  }

}
