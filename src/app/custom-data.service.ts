import { Injectable } from '@angular/core';
import { CustomData, CustomDataRepository } from './custom-data.model';

@Injectable({
  providedIn: 'root'
})
export class CustomDataService implements CustomDataRepository {
  private items: CustomData[] = [
    {
      id: '1',
      amount: 100,
      date: new Date('2026-01-10'),
      description: 'Pierwszy obiekt domyślny'
    },
    {
      id: '2',
      amount: 200,
      date: new Date('2026-02-15'),
      description: 'Drugi obiekt domyślny'
    },
    {
      id: '3',
      amount: 300,
      date: new Date('2026-03-20'),
      description: 'Trzeci obiekt domyślny'
    },
    {
      id: '4',
      amount: 400,
      date: new Date('2026-04-25'),
      description: 'Czwarty obiekt domyślny'
    },
    {
      id: '5',
      amount: 500,
      date: new Date('2026-05-30'),
      description: 'Piąty obiekt domyślny'
    }
  ];

  getAll(): CustomData[] {
    return [...this.items];
  }

  add(item: CustomData): void {
    this.items.push(item);
  }

  remove(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }
}
