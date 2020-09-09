import {Observable} from 'rxjs';
import {GenericFilterRequest, GenericResponse, PageRequest} from '../services/model';
import {Column, GridRowOption} from '../components/tables/table-model';

export abstract class AbstractDataConfigurer<T> {

  protected constructor() {
  }

  abstract getColumns(): Column[];

  abstract getRowOptions(): GridRowOption[];

  abstract getGridData(pageRequest: PageRequest): Observable<GenericResponse<Array<T>>>;

  abstract filterGridData(pageRequest: PageRequest, genericFilterRequest: GenericFilterRequest<T>): Observable<GenericResponse<T[]>>;

}
