import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';
import {NgForOf} from "@angular/common";
import {TabComponent} from "../tab/tab.component";

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    this.tabs?.changes.subscribe(() => {
      // Every time the tabs change, the last tab is selected. The tabs change when a new tab is added or a tab is deleted.
      setTimeout(() => this.selectTab(this.tabs?.last), 0)
    })

    // Initially select the last tab if there are any tabs.
    setTimeout(() => this.selectTab(this.tabs?.last), 0)
  }

  selectTab(tab: TabComponent) {
    if (!tab) {
      return
    }
    this.tabs.forEach(tab => tab.active = false)
    tab.active = true
  }

  closeTab(tabToClose: TabComponent) {
    tabToClose.closeTab()
  }
}
