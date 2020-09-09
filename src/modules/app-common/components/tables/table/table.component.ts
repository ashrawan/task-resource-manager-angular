import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ColumnSortableDirective, SortDirection, SortEvent} from '../column-sortable.directive';
import {Column, GridRowOption, OpDataEmit} from '../table-model';
import {AbstractDataConfigurer} from '../../../generic-services/abstract-data-configurer';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {GenericFilterRequest, PageRequest} from '../../../services/model';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    @Input() gridTitle = 'Data Table';
    @Input() pageSize = 10;
    @Input() triggerRefresh: Subject<void> = new Subject<void>();
    @Input() dataGridConfigurer!: AbstractDataConfigurer<any>;

    @Output() rowSelected: EventEmitter<OpDataEmit> = new EventEmitter<OpDataEmit>();

    searchColumnKey = '';
    searchColumnPlaceholder = '';

    columns: Column[];
    rowOptions: GridRowOption[];

    loading: boolean;
    hasError: boolean;
    gridData: Array<any>;
    totalElements: number;

    currentPage = 1;
    searchTerm: string;
    sortColumn = '';
    sortDirection: SortDirection = 'asc';

    @ViewChildren(ColumnSortableDirective) headers!: QueryList<ColumnSortableDirective>;

    searchField: FormControl;
    coolForm: FormGroup;

    constructor(private changeDetectorRef: ChangeDetectorRef, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.columns = this.dataGridConfigurer.getColumns();
        this.rowOptions = this.dataGridConfigurer.getRowOptions();
        this.onGridDataInit();
        const column: Column = this.columns.find(value => {
            if (value.defaultSearch) {
                return value;
            }
        });
        this.searchColumnKey = column.name;
        this.searchColumnPlaceholder = 'Search by ' + column.label;
        this.triggerRefresh.subscribe(value => {
            console.log('refreshing table');
            this.onFilter(this.generateFilterRequest());
        });
    }

    private currPageFilter(): PageRequest {
        console.log('current page ', this.currentPage);
        const pageRequest: PageRequest = {
            page: this.currentPage,
            size: this.pageSize,
            sort: this.sortColumn,
            direction: this.sortDirection
        };
        return pageRequest;
    }

    private onGridDataInit(): void {
        console.log('Grid Init triggered');
        this.dataGridConfigurer.getGridData(this.currPageFilter()).subscribe(res => {
            console.log('response received data and total count');
            this.gridData = res.response;
            this.hasError = false;
            this.totalElements = res.totalElements;
        }, error => {
            console.log('error ', error);
            this.hasError = true;
        });
    }

    private onFilter(genericFilterRequest: GenericFilterRequest<any>): void {
        console.log('Data Filter triggered ', genericFilterRequest);
        this.dataGridConfigurer.filterGridData(this.currPageFilter(), genericFilterRequest)
            .subscribe(genericFilteredRes => {
                console.log('filtered response received - data and total count');
                this.gridData = genericFilteredRes.response;
                this.hasError = false;
                this.totalElements = genericFilteredRes.totalElements;
            }, error => {
                console.log('error ', error);
                this.hasError = true;
            });
    }

    onPageChange(): void {
        this.onFilter(this.generateFilterRequest());
    }

    onSearchInput($event): void {
        console.log('input search ', $event);
        this.currentPage = 1;
        this.onFilter(this.generateFilterRequest());
    }

    private generateFilterRequest(): GenericFilterRequest<any> {
        const genericFilterRequest: GenericFilterRequest<any> = {
            dataFilter: {
                [this.searchColumnKey]: this.searchTerm,
            },
        };
        return genericFilterRequest;
    }

    onSort({column, direction}: SortEvent): void {
        console.log('sort triggered', direction);
        this.sortColumn = column;
        this.sortDirection = direction;
        this.onFilter(this.generateFilterRequest());
    }

    onOptionClicked(clickedData: any, option: GridRowOption): void {
        this.rowSelected.emit({data: clickedData, optionName: option.name});
        if (option.enableRefreshOnEmit) {
            this.onFilter(this.generateFilterRequest());
        }
    }

}
