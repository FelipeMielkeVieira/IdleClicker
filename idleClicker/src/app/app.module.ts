import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { Mundo1Component } from './mundo1/mundo1.component';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '', component: Mundo1Component
  }
]

@NgModule({
  declarations: [
    AppComponent,
    Mundo1Component,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule { }
