import {Component, OnInit} from '@angular/core';
import {FileUploadModalComponent} from './file-upload-modal/file-upload-modal.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-custom-file-upload',
  templateUrl: './custom-file-upload.component.html',
  styleUrls: ['./custom-file-upload.component.scss']
})
export class CustomFileUploadComponent implements OnInit {

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
  }

  openModalWithComponent(): void {
    this.bsModalRef = this.modalService.show(FileUploadModalComponent);
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
