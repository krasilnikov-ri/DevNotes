import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note, NoteService, Priority } from '../../services/note.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
    viewMode: string;
    id: number;
    item: Note;
    priorities: Array<string> = [];
    formChanged = false;

    private routeSubscriptions: Subscription = new Subscription();
    private notesActionSubscriptions: Subscription = new Subscription();

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private noteService: NoteService) {
        this.routeSubscriptions.add(
            activatedRoute.params.subscribe(params => {
                this.id = +params['id']; // parseInt(params['id'])
            })
        );

        this.routeSubscriptions.add(
            activatedRoute.url.subscribe(segments => {
                this.viewMode = segments[1].path;
            })
        );
    }

    ngOnInit(): void {
        switch (this.viewMode) {
            case 'add':
                this.initializePriorities();
                this.addItem();
                break;
            case 'edit':
                this.initializePriorities();
                this.initializeItem();
                break;
            case 'display':
                this.initializeItem();
                break;
            case 'delete':
                this.deleteItem(this.id);
                this.router.navigate(['notes']);
                break;
            default:
                break;
        }
    }

    private initializeItem() {
        if (!isNaN(this.id)) {
            this.notesActionSubscriptions.add(
                this.noteService.getNote(this.id).subscribe(response => {
                    this.item = response;
                })
            );
        } else {
            throw new Error('Заметки с id: {' + this.activatedRoute.snapshot.params['id'] + '} не существует!');
        }
    }

    private addItem() {
        this.noteService.addNote().subscribe(response => {
            this.item = response;
        });
    }

    private deleteItem(id: number) {
        this.notesActionSubscriptions.add(
            this.noteService.deleteNote(id).subscribe(deleted => {
                if (deleted) {
                    alert('Заметка успешно удалена!');
                } else {
                    alert('Не удалось удалить заметку с id:' + id);
                }
            })
        );
    }

    submit(event) {
        for (let i = 0; i < event.target.length; ++i) {
            const controlName = event.target[i].name;
            if (this.item.hasOwnProperty(controlName)) {
                this.item[controlName] = event.target[i].value;
            }
        }

        this.notesActionSubscriptions.add(
            this.noteService.saveNote(this.item).subscribe(response => {
                if (response.success) {
                    alert('Заметка успешно сохранена!');
                }
            })
        );

        return false;
    }

    private initializePriorities() {
        for (const priority in Priority) {
            this.priorities.push(Priority[priority]);
        }
    }

    ngOnDestroy(): void {
        this.routeSubscriptions.unsubscribe();
        this.routeSubscriptions = null;

        this.notesActionSubscriptions.unsubscribe();
        this.notesActionSubscriptions = null;
    }
}
