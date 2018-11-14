import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class NoteService {
    private notes: Array<Note> = [
        new Note(1, "Заметка 1", Priority.Normal, new Date(2018, 11, 13)),
        new Note(2, "Заметка 2", Priority.Low, new Date(2018, 11, 14)),
        new Note(3, "Заметка 3", Priority.High, new Date(2018, 11, 16))
    ];

    constructor() {}

    getNotes(): Observable<Note[]> {
        return of(this.notes);
        //return this.http.get("/api/notes");
    }

    getNote(id: number): Observable<Note> {
        const note = this.notes.find(item => item.id === id);
        return of(note);
    }

    saveContent(content: string, id: number) {
        /*let note = this.notes.find(item => item.id === id);
        note.content = content;*/
    }

    /*addNote() {
        let noteToAdd = new Note(666, "Тест", Priority.Normal, new Date());
        let body = JSON.stringify({ noteToAdd });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post("/api/notes", noteToAdd, options);
    }*/

    /**
     Также сервис поддерживает поиск по полям объекта в памяти.
     Для этого достаточно передать параметры в строке запроса,
     например "/app/users/?name=lis",
     чтобы найти объект со значением свойства name равное lis.
     */
}

export class Note implements INote {
    constructor(id: number, name: string, priority: Priority, executionDate: Date) {
        this.id = id;
        this.name = name;
        this.content = "";
        this.priority = priority;
        this.executionDate = executionDate;
    }

    id: number;
    name: string;
    content: string;
    priority: Priority;
    executionDate: Date;
}

export interface INote {
    id: number;
    name: string;
    content: string;
    priority: Priority;
    executionDate: Date;
}

export const enum Priority {
    High = "Высокий",
    Normal = "Нормальный",
    Low = "Низкий",
}