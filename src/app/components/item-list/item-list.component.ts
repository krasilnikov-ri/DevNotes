import { Component } from '@angular/core';
import { NoteService, Note } from '../../services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'item-list-component',
  styleUrls: ['./item-list.component.scss'],
  templateUrl: 'item-list.component.html',
})
export class ItemListComponent {
  displayedColumns: string[] = ['id', 'name', 'priority', 'executionDate', 'actions'];

  dataSource: Note[];

  constructor(private router: Router, private noteService: NoteService) {
    this.noteService.getNotes().subscribe(response => {
      this.dataSource = response;
    });
  }
}
