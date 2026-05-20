import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomData } from './custom-data.model';

@Component({
  selector: 'app-custom-data-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="custom-data-form">
      <h2>Dodaj nowy obiekt</h2>
      <form #form="ngForm" (ngSubmit)="submit()" novalidate>
        <div class="form-row">
          <label for="id">ID</label>
          <input id="id" name="id" type="text" [(ngModel)]="model.id" required minlength="1" pattern="^[0-9]+$" #idCtrl="ngModel" />
          <div class="error" *ngIf="idCtrl.invalid && (idCtrl.dirty || idCtrl.touched)">
            <small *ngIf="idCtrl.errors?.['required']">ID jest wymagane.</small>
             <small *ngIf="idCtrl.errors?.['pattern']">ID musi zawierać wyłącznie cyfry.</small>
          </div>
        </div>

        <div class="form-row">
          <label for="amount">Kwota</label>
            <input id="amount" name="amount" type="number" [(ngModel)]="model.amount" required min="0" step="any" #amountCtrl="ngModel" />
          <div class="error" *ngIf="amountCtrl.invalid && (amountCtrl.dirty || amountCtrl.touched)">
            <small *ngIf="amountCtrl.errors?.['min']">Kwota musi być większa niż 0.</small>
             <small *ngIf="amountCtrl.errors?.['required']">Kwota jest wymagana.</small>
          </div>
        </div>

        <div class="form-row">
          <label for="date">Data</label>
          <input id="date" name="date" type="date" [(ngModel)]="model.date" required #dateCtrl="ngModel" />
          <div class="error" *ngIf="(dateCtrl.invalid && (dateCtrl.dirty || dateCtrl.touched)) || dateInvalid()">
            <small *ngIf="dateCtrl.errors?.['required']">Data jest wymagana.</small>
            <small *ngIf="dateInvalid()">Data nie może być datą przyszłą.</small>
          </div>
        </div>

        <div class="form-row">
          <label for="description">Opis</label>
          <input id="description" name="description" [(ngModel)]="model.description" maxlength="200" required #descCtrl="ngModel" />
          <div class="error" *ngIf="descCtrl.invalid && (descCtrl.dirty || descCtrl.touched)">
            <small *ngIf="descCtrl.errors?.['required']">Opis jest wymagany.</small>
            <small *ngIf="descCtrl.errors?.['maxlength']">Opis może mieć maksymalnie 200 znaków.</small>
          </div>
        </div>

        <button type="submit" [disabled]="!isFormValid(form)">Dodaj</button>
      </form>
    </div>
  `,
  styles: [
    `
      .custom-data-form {
        margin-bottom: 16px;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      .form-row {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
      }

      label {
        font-weight: 600;
        margin-bottom: 4px;
      }

      input {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }

      button {
        padding: 8px 14px;
        border: none;
        background-color: #1976d2;
        color: white;
        cursor: pointer;
        border-radius: 4px;
      }

      button:hover {
        background-color: #115293;
      }
    `
  ]
})
export class CustomDataFormComponent {
  @Output() addItem = new EventEmitter<CustomData>();
  @ViewChild('form') form?: NgForm;

  model = {
    id: '',
    amount: 0,
    date: '',
    description: ''
  };

  // Validators implemented:
  // 1) `id` - required, minlength 1
  // 2) `amount` - numeric, min 1 (positive)
  // 3) `date` - required, must not be a future date (custom)
  // 4) `description` - required, maxlength 200

  isFormValid(form?: NgForm): boolean {
    if (!form) return false;
    if (form.invalid) return false;
    if (this.dateInvalid()) return false;
    return true;
  }

  dateInvalid(): boolean {
    if (!this.model.date) return true;
    const selected = new Date(this.model.date);
    const today = new Date();
    selected.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    return selected.getTime() > today.getTime();
  }

  submit(): void {
    // final validation guard
    if (!this.form || !this.isFormValid(this.form)) return;

    this.addItem.emit({
      id: this.model.id,
      amount: Number(this.model.amount),
      date: new Date(this.model.date),
      description: this.model.description
    });

    this.model = {
      id: '',
      amount: 0,
      date: '',
      description: ''
    };
  }
}
