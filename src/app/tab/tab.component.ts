import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {
  @Input()
  title: string

  active = false

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>()

  closeTab() {
    this.close.emit(true)
  }
}
