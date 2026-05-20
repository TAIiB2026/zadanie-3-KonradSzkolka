import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomDataListComponent } from './custom-data-list.component';

const routes: Routes = [
  { path: 'custom-data', component: CustomDataListComponent },
  { path: '', redirectTo: 'custom-data', pathMatch: 'full' },
  { path: '**', redirectTo: 'custom-data' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
