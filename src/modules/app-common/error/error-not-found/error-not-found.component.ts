import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-error-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-not-found.component.html',
  styleUrls: ['./error-not-found.component.scss']
})
export class ErrorNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
