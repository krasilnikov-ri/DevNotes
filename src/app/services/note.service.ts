import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
//import { InMemoryDataService, INote } from './in-memory-data.service';

@Injectable()
export class NoteService {
    constructor(private http: Http) {}

    getNotes(): Observable<any> {
        return this.http.get("/api/notes");
    }

    /**
     Также сервис поддерживает поиск по полям объекта в памяти.
     Для этого достаточно передать параметры в строке запроса,
     например "/app/users/?name=lis",
     чтобы найти объект со значением свойства name равное lis.
     */
}