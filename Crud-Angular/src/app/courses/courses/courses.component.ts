import { Component } from '@angular/core';
import { Course } from '../model/course';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesService } from '../services/courses.service';
import { Observable, of } from 'rxjs';
import { catchError, delay, first, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from "../../shared/pipes/category.pipe";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-courses',
    standalone: true,
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    imports: [
        AppMaterialModule,
        CommonModule,
        CategoryPipe
    ]
})

export class CoursesComponent {

  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ){
    this.courses$ = this.coursesService.list()
    .pipe(
      first(),
      delay(5000),
      catchError(error => {
        this.onError('Erro ao Carregar Cursos.');
        return of([])
      }),
      tap(courses => console.log(courses))
    );
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit():void{}

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
