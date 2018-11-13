import { NgModule } from '@angular/core';
import {MatTableModule, MatButtonModule, } from '@angular/material';

@NgModule({
  imports: [MatTableModule, MatButtonModule],
  exports: [MatTableModule, MatButtonModule],
})
export class MaterialModule { }