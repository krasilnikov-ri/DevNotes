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

  private notesSubscriptions: Subscription;

  constructor(private noteService: NoteService) {
    this.notesSubscriptions = this.noteService.getNotes(0, this.pageSize).subscribe(response => {
      this.totalCount = response.totalCount;
      this.dataSource = response.data;
    });
  }

  changePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.notesSubscriptions.add(
      this.noteService.getNotes(this.pageSize * this.pageIndex, this.pageSize).subscribe(response => {
        this.dataSource = response.data;
      })
    );
  }

  ngOnDestroy(): void {
    this.notesSubscriptions.unsubscribe();
    this.notesSubscriptions = null;
  }
}
