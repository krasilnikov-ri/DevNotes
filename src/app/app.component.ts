import { Component, OnInit } from '@angular/core';
import { NoteService } from './note.service';
import { Note } from './in-memory-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  
  title = 'Dev-Notes';
  items: Array<Note>;

  constructor(private noteService: NoteService){}

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(response => {
      this.items = response.json();
    });
  }
}
