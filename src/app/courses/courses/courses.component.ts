import { Component } from '@angular/core';
import { Course } from '../model/course';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesService } from '../services/courses.service';
import { Observable, of } from 'rxjs';
import { catchError, delay, first, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    AppMaterialModule,
    CommonModule 
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(private coursesService: CoursesService){
    this.courses$ = this.coursesService.list()
    .pipe(
      first(),
      delay(5000),
      catchError(error => {
        console.log(error);
        return of([])
      }),
      tap(courses => console.log(courses))
    );
  }

  ngOnInit():void{
    
  }

}
