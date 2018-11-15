import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';

const appRoutes: Routes = [
  { path: 'notes', component: ItemListComponent },
  { path: 'notes/add', component: ItemComponent },
  { path: 'notes/edit/:id', component: ItemComponent },
  { path: 'notes/display/:id', component: ItemComponent },
  { path: '', redirectTo: 'notes', pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
