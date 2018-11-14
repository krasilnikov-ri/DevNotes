import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemComponent } from './components/item/item.component';

const routes: Routes = [
  {path: 'notes', component: ItemListComponent},  
  {path: 'note/:id', component: ItemComponent},
  {path: '', redirectTo: 'notes', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
