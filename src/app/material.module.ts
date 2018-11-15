import { NgModule } from '@angular/core';
import {MatTableModule, MatButtonModule, MatPaginatorModule, } from '@angular/material';

@NgModule({
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule],
  exports: [MatTableModule, MatButtonModule, MatPaginatorModule]
})
export class MaterialModule { }
