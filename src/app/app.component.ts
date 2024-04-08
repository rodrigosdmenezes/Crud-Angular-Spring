import { Component } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MatToolbarModule, 
    RouterOutlet,
    HttpClientModule
  ]
})
export class AppComponent {
  title = 'crud-angular';
}
