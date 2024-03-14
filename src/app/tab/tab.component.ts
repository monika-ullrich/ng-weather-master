import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent {
  @Input()
  title: string

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>()

  _active = false

  constructor(private cd: ChangeDetectorRef) {
  }

  closeTab() {
    this.close.emit(true)
  }

  set active(active: boolean) {
    this._active = active
    this.cd.detectChanges()
  }

  get active() {
    return this._active
  }

}
