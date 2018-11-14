import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note, NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  id: number;
  item: Note;
  constructor(private activatedRoute: ActivatedRoute, private noteService: NoteService) {
    this.id = parseInt(activatedRoute.snapshot.params['id']);
  }

  ngOnInit() {
    this.noteService.getNote(this.id).subscribe(response => {
      this.item = response;
    });
  }

  focusout(event, id) {
    this.noteService.saveContent(event.target.value, id);
  }
}
