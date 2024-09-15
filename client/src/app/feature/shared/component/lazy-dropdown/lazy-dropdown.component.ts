import { HttpClient } from '@angular/common/http';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { LazyDropdownService } from '../../services/lazy-dropdown.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-lazy-dropdown',
  templateUrl: './lazy-dropdown.component.html',
  styleUrls: ['./lazy-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LazyDropdownComponent),
      multi: true
    }
  ]
})
export class LazyDropdownComponent {
  @Input() lookup!: any;
  @Input() lookUpExtraParams!: any;
  @Input() placeholder: string = "Select an option";
  @Input() multiply: boolean = false;
  dropdownOptions: any[] = [];
  selectedOption: any;
  isDataLoaded: boolean = false;

  private lookupCache: { [key: string]: any[] } = {};

  constructor(private lazyDropdownService: LazyDropdownService) { }

  writeValue(value: any): void {
    this.selectedOption = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange: any = () => { };
  private onTouched: any = () => { };

  onDropdownOpen() {
    if (!this.isDataLoaded) {
      this.loadOptions();
    }
  }


  onOptionSelect(event: any): void {
    this.selectedOption = event.value;
    this.onChange(this.selectedOption);
    this.onTouched();
  }


  loadOptions(event: any = { first: 0, rows: 10 }) {

    if (typeof this.lookup === "string") {
      if (this.lookupCache[this.lookup]) {
        this.dropdownOptions = this.lookupCache[this.lookup];
        this.isDataLoaded = true;
      } else {
        const { first, rows } = event;
        this.lazyDropdownService.getDropdownData({ type: this.lookup, params: { start: first, limit: rows, ...this.lookUpExtraParams } }).subscribe((data) => {
          this.dropdownOptions = data.map(item => ({
            label: item.value,
            value: item._id,
          }));

          this.lookupCache[this.lookup] = this.dropdownOptions; 
          this.isDataLoaded = true;
        })
      }
    }
    else{
      this.dropdownOptions = this.lookup
      this.isDataLoaded = true;
    }
  }
}