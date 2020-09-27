import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecordRtcService} from '../../../../../services/record-rtc.service';

@Component({
  selector: 'app-my-task-audio-submission',
  templateUrl: './my-task-audio-submission.component.html',
  styleUrls: ['./my-task-audio-submission.component.scss']
})
export class MyTaskAudioSubmissionComponent implements OnInit{

  @Input() fileInitialName = 'my-audio';
  @Output() audioOnUpload: EventEmitter<any> = new EventEmitter<any>();
  @Input() resetAudio: boolean;

  fileName: string = this.fileInitialName;

  constructor(public recordRTC: RecordRtcService) {
  }

  ngOnInit(): void {
    this.resetAudio = true;
  }

  startVoiceRecord(): void {
    this.recordRTC.toggleRecord();
    this.resetAudio = false;
  }

  submitAudio(): void {
    const waveFileFromBlob: File = new File([this.recordRTC.blob], this.fileName + '.wav', {
      type: 'video/webm'
    });
    this.audioOnUpload.emit(waveFileFromBlob);
  }

}
