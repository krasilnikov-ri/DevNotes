import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note, NoteService, Priority } from '../../services/note.service';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {  
  viewMode: string;
  //id: number;
  item: Note;
  priorities: Array<string> = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private noteService: NoteService) {
    this.viewMode = this.activatedRoute.snapshot.url[1].path;
  }

  ngOnInit(): void {
    switch (this.viewMode) {
      case "add":
        this.initializePriorities();
        this.addItem();
        break;

      case "edit":
        this.initializePriorities();
        this.initializeItem();
        break;

      case "display":
        this.initializeItem();
        break;
      
      default:
        break;
    }
  }

  private initializeItem() {
    let routeParamId = +this.activatedRoute.snapshot.params['id'];
    
    if (!isNaN(routeParamId)) {
      this.noteService.getNote(routeParamId).subscribe((response: Note) => {
        this.item = response;
      });
    }
    else {
      throw new Error("Заметки с id: {" + this.activatedRoute.snapshot.params['id'] + "} не существует!");      
    } 
  }

  private addItem() {
    this.noteService.addNote().subscribe((response: Note) => {
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

  private initializePriorities() {
    for (let priority in Priority) {
      this.priorities.push(Priority[priority]);
    }
  }
}
