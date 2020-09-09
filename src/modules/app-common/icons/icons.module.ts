import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faBars,
  faBookOpen,
  faChartArea,
  faChartBar,
  faChartPie,
  faChevronDown,
  faChevronUp,
  faColumns,
  faSearch,
  faTable,
  faTachometerAlt,
  faUser,
  faTrash,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

const fontAwesomeSolidIcons = {
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faBars,
  faBookOpen,
  faChartArea,
  faChartBar,
  faChartPie,
  faChevronDown,
  faChevronUp,
  faColumns,
  faSearch,
  faTable,
  faTachometerAlt,
  faUser,
  faTrash,
  faDownload
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(
      fontAwesomeSolidIcons,
    );
  }
}
