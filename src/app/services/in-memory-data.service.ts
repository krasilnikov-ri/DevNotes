import { InMemoryDbService } from 'angular-in-memory-web-api';

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

export class Note implements INote {
    constructor(id: number, name: string, priority: Priority, executionDate: Date) {
        this.id = id;
        this.name = name;        
        this.priority = priority;
        this.executionDate = executionDate;
    }

    id: number;
    name: string;    
    priority: Priority;
    executionDate: Date;
}

export interface INote {
    id: number;
    name: string;    
    priority: Priority;
    executionDate: Date;
}

const enum Priority {
    High = "Высокий",
    Normal = "Нормальный",
    Low = "Низкий",
}