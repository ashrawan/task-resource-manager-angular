export interface Column {
  name: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'object';
  sortable?: boolean;
  filterable?: boolean;
  objectBind?: ColumnBindObject;
  defaultSearch?: boolean;
  hide?: boolean;
}

export  interface ColumnBindObject {
  nameBind: string;
  type: 'string' | 'fixedLink' | 'object';
  bindValue?: any;
  linkType: 'internal' | 'external' | 'api';
  apiLinkValue?: string;
  apiLinkBind?: string;
  fixedLinkValue?: string;
  apiFixedLinkBind?: string;
  disable?: boolean;
}

export interface GridRowOption {
  name: string;
  label: string;
  enableRefreshOnEmit?: boolean;
  icon?: string;
  class?: string;
  type: 'button' | 'link' | 'template' | 'modal' | 'emit';
  link?: string;
  appendCname?: string;
}

export interface OpDataEmit {
  data: any;
  optionName: string;
}
