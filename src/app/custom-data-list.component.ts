import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomData } from './custom-data.model';
import { CustomDataService } from './custom-data.service';
import { CustomDataFormComponent } from './custom-data-form.component';

@Component({
  selector: 'app-custom-data-list',
  templateUrl: './custom-data-list.component.html',
  styleUrls: ['./custom-data-list.component.css'],
  standalone: true,
  imports: [CommonModule, CustomDataFormComponent]
})
export class CustomDataListComponent implements OnInit {
  items: CustomData[] = [];
  showForm = false;

  constructor(private dataService: CustomDataService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  onAdd(item: CustomData): void {
    this.dataService.add(item);
    this.loadItems();
    this.showForm = false;
  }

  loadItems(): void {
    this.items = this.dataService.getAll();
  }

  remove(id: string): void {
    this.dataService.remove(id);
    this.loadItems();
  }
}
