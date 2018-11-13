import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { NoteService } from './note.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
