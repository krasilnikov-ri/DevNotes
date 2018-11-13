import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Note, Priority } from './note.service';

export class InMemoryDataService implements InMemoryDbService {
    createDb(): {} {
        return {
            notes: [
                new Note(1, "Заметка 1", Priority.Normal, new Date(2018, 11, 13)),
                new Note(2, "Заметка 2", Priority.Low, new Date(2018, 11, 14)),
                new Note(3, "Заметка 3", Priority.High, new Date(2018, 11, 16))
            ]
        };
    }
}