import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormFieldModel, InputFile} from '../../../inputs/input.model';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @Input() field: FormFieldModel;
  @Input() form: FormGroup;

  inputFile: InputFile = null;

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    const inputFile: InputFile = (this.field.input as InputFile);
    this.inputFile = inputFile;
  }

  onFileChange(event): void {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.controls[this.field.name].patchValue(reader.result);
        // this.form.patchValue({
        //   file: reader.result
        // });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  get isValid(): boolean {
    return this.form.controls[this.field.name].valid;
  }

  get isTouched(): boolean {
    return this.form.controls[this.field.name].touched;
  }

}
