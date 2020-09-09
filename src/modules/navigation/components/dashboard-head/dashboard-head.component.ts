import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-head',
  templateUrl: './dashboard-head.component.html',
  styleUrls: ['./dashboard-head.component.scss']
})
export class DashboardHeadComponent implements OnInit {

  @Input() title!: string;
  @Input() hideBreadcrumbs = false;

  constructor() {

   }

  ngOnInit() {
   }

}
