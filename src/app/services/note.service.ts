import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class NoteService {
    private notes: Array<Note> = [
        new Note(1, "Заметка 1", Priority.Normal, new Date(2018, 10, 13)),
        new Note(2, "Заметка 2", Priority.Low, new Date(2018, 10, 14)),
        new Note(3, "Заметка 3", Priority.High, new Date(2018, 10, 16))
    ];

    constructor() {}

    getCount(): Observable<number> {
        return of(this.notes.length);
    }

    getNotes(start: number, count: number): Observable<ListResponse> {
        const data = start === undefined || count === undefined
            ? this.notes
            : this.notes.slice(start, start + count);
        return of(new ListResponse(data, this.notes.length));
    }

    getNote(id: number): Observable<Note> {
        const note = this.notes.find(item => item.id === id);
        return of(note);
    }

    saveNote(item: Note): Observable<Note> {
        let note = this.notes.find(found => found.id === item.id);
        note = item;
        return of(note);
    }

    addNote(): Observable<Note> {
        let id = 0;
        this.notes.forEach(item => {
            if (item.id >= id) {
                id = item.id + 1;
            }
        });
        const blank = new Note(id, "Новая заметка", Priority.Normal, new Date());
        this.notes.push(blank);
        return of(blank);
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

export class ListResponse {
    data: Note[];
    totalCount: number;

    constructor(data: Note[], totalCount: number) {
        this.data = data;
        this.totalCount = totalCount;
    }
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

export enum Priority {
    High = "Высокий",
    Normal = "Нормальный",
    Low = "Низкий",
}