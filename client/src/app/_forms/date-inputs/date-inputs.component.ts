import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BsDatepickerActions } from 'ngx-bootstrap/datepicker/reducer/bs-datepicker.actions';

@Component({
  selector: 'app-date-inputs',
  templateUrl: './date-inputs.component.html',
  styleUrls: ['./date-inputs.component.css']
})
export class DateInputsComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() maxDate: Date;
  bsConfig: Partial<BsDatepickerConfig>;


  constructor(@Self() public ngControl: NgControl) { 
    this.ngControl.valueAccessor=this;
    this.bsConfig ={
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY'
    }
  }
  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
}
