import {PageRequest} from './model';
import {HttpParams} from '@angular/common/http';

export class ApiUtil {

  static buildPageParams = (pageRequest: PageRequest): HttpParams => {
    return  new HttpParams()
      .set('page', (pageRequest.page - 1).toString())
      .set('size', pageRequest.size.toString())
      .set('sort', pageRequest.sort.toString())
      .set('direction', pageRequest.direction.toString());
  }
}
