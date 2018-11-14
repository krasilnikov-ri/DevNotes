import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note, NoteService, Priority } from '../../services/note.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  id: number;
  item: Note;
  priorities: Array<string> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private noteService: NoteService) {
    for (let priority in Priority) {
      this.priorities.push(Priority[priority]);      
    }

    this.id = +activatedRoute.snapshot.params['id'];

    this.noteService.getNote(this.id).subscribe((response: Note) => {
      this.item = response;
    });  
  }

  submit(event) {
    for (let i = 0; i < event.target.length; ++i) {
      let controlName = event.target[i].name;
      if (this.item.hasOwnProperty(controlName)) {
        this.item[controlName] = event.target[i].value;
      }
    }
    
    this.noteService.saveNote(this.item);

    return false;
  }
}
