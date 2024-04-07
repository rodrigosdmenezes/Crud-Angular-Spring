import { Component } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'courses' },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  }
];

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [MatToolbarModule, RouterOutlet]
})
export class AppComponent {
  title = 'crud-angular';
}
