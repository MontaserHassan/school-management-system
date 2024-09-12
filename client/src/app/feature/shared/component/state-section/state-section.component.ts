import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { SectionStateStatus } from '../../enums/section-state-status.enum';

@Component({
  selector: 'app-state-section',
  templateUrl: './state-section.component.html',
  styleUrls: ['./state-section.component.scss']
})
export class StateSectionComponent implements OnInit {
  @Input() state!: SectionStateStatus;
  @Input() loadingLabel: string = 'Loading';
  @Input() errorStateLabel!: string;
  @Input() emptyStateMainLabel: string='No records has been added yet';
  @Input() emptyStateSubLabel!: string
  @Input() emptyStateImagePath!: string;

  @Output() reload = new EventEmitter();
  @Output() clear = new EventEmitter();

  SectionStateStatus = SectionStateStatus; // For template usage

  constructor(private comRef: ChangeDetectorRef) {}

  ngOnInit(): void {}

  ngOnChanges({ state }: SimpleChanges): void {
    if (state && state.currentValue !== state.previousValue) {
      this.comRef.detectChanges();
    }
  }

  onReload(): void {
    this.reload.emit(null);
  }

  onClearButtonClicked(): void{
    this.clear.emit(null);
  }

}
