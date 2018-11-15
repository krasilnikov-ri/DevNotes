import { Component, OnDestroy } from '@angular/core';
import { NoteService, Note } from '../../services/note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'item-list-component',
  styleUrls: ['./item-list.component.scss'],
  templateUrl: 'item-list.component.html',
})
export class ItemListComponent implements OnDestroy {  
  displayedColumns: string[] = ['id', 'name', 'priority', 'executionDate', 'actions'];

  dataSource: Note[];

  private notesSubscription: Subscription;

  constructor(private noteService: NoteService) {
    this.notesSubscription = this.noteService.getNotes().subscribe(response => {
      this.dataSource = response;
    });
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
    this.notesSubscription = null;
  }
}
