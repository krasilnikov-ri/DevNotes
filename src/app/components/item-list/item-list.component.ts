import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NoteService, Note, ListResponse } from '../../services/note.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'item-list-component',
  styleUrls: ['./item-list.component.scss'],
  templateUrl: 'item-list.component.html',
})
export class ItemListComponent implements OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'priority', 'executionDate', 'actions'];

  dataSource: Note[];
  pageSize = 2;
  pageIndex = 0;
  totalCount: number;
  private pageSizeKey = "paginatorPageSize";
  private pageIndexKey = "paginatorPageIndex";

  private notesSubscriptions: Subscription;

  constructor(private noteService: NoteService) {
    this.initPageSize(); // getting values from LocalStorage
    this.initPageIndex(); // or setting by defaults
    this.notesSubscriptions = this.noteService.getNotes(this.pageSize * this.pageIndex, this.pageSize).subscribe(response => {
      this.totalCount = response.totalCount;
      this.dataSource = response.data;
    });
  }

  changePage(event: PageEvent) {
    this.pageSize = localStorage[this.pageSizeKey] = event.pageSize;
    this.pageIndex = localStorage[this.pageIndexKey] = event.pageIndex;
    this.notesSubscriptions.add(
      this.noteService.getNotes(this.pageSize * this.pageIndex, this.pageSize).subscribe(response => {
        this.dataSource = response.data;
      })
    );
  }

  private initPageSize() {
    if (localStorage[this.pageSizeKey] !== undefined) {
      this.pageSize = +localStorage[this.pageSizeKey];
    } else {
      localStorage[this.pageSizeKey] = this.pageSize.toString();
    }
  }

  private initPageIndex() {
    if (localStorage[this.pageIndexKey] !== undefined) {
      this.pageIndex = +localStorage[this.pageIndexKey];
    } else {
      localStorage[this.pageIndexKey] = this.pageIndex.toString();
    }
  }

  ngOnDestroy(): void {
    this.notesSubscriptions.unsubscribe();
    this.notesSubscriptions = null;
  }
}
