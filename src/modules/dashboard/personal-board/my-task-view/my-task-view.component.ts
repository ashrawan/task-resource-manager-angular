import {Component, Input, OnInit} from '@angular/core';
import {ResourceInfo, Task} from '../../../app-common/services/model';
import {CoreConstant} from '../../../app-common/core-constant';
import {ResourceService} from '../../../app-common/services/apis/resource.service';

@Component({
  selector: 'app-my-task-view',
  templateUrl: './my-task-view.component.html',
  styleUrls: ['./my-task-view.component.scss']
})
export class MyTaskViewComponent implements OnInit {

  API_ROUTES = CoreConstant.APP_ROUTES;
  API_RESOURCE_DOWNLOAD = CoreConstant.API_RESOURCE_DOWNLOAD;

  @Input() task: Task;

  constructor(private resourceService: ResourceService) {
  }

  ngOnInit(): void {
  }

  downloadResource(resourceInfo: ResourceInfo, openInTab: boolean = false): void {
    this.resourceService.download(resourceInfo.id).subscribe(response => {
      console.log('file from server ', response);
      const dataType = response.type;
      const binaryData = [];
      binaryData.push(response);
      if (openInTab) {
        const fileURL = URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        window.open(fileURL, '_blank');
      } else {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (resourceInfo.resourceName) {
          downloadLink.setAttribute('download', resourceInfo.resourceName);
        }
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    });

  }

}
