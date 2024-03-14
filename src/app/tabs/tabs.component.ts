import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';
import {NgForOf} from '@angular/common';
import {TabComponent} from '../tab/tab.component';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngAfterContentInit() {
    this.selectTab(this.tabs?.last)
    this.tabs?.changes.subscribe(() => {
      // Every time the tabs change, the last tab is selected. The tabs change when a new tab is added or a tab is deleted.
      this.selectTab(this.tabs?.last)
    })
  }

  selectTab(tab: TabComponent) {
    if (!tab) {
      return
    }
    this.tabs.forEach(tab => tab.active = false)
    tab.active = true
    this.cd.markForCheck()
  }

  closeTab(tabToClose: TabComponent) {
    tabToClose.closeTab()
  }
}
