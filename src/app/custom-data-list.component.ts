import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomData } from './custom-data.model';
import { CustomDataService } from './custom-data.service';

@Component({
  selector: 'app-custom-data-list',
  templateUrl: './custom-data-list.component.html',
  styleUrls: ['./custom-data-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CustomDataListComponent implements OnInit {
  items: CustomData[] = [];

  constructor(private dataService: CustomDataService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items = this.dataService.getAll();
  }

  remove(id: string): void {
    this.dataService.remove(id);
    this.loadItems();
  }
}
