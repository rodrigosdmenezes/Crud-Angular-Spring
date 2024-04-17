import { Component } from '@angular/core';
import { Course } from '../../model/course';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../services/courses.service';
import { Observable, of } from 'rxjs';
import { catchError, delay, first, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from "../../../shared/pipes/category.pipe";
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesListComponent } from "../../components/courses-list/courses-list.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
  imports: [
    AppMaterialModule,
    CommonModule,
    CategoryPipe,
    CoursesListComponent
  ]
})

export class CoursesComponent {

  courses$: Observable<Course[]> | null = null;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.refresh();
  }

  refresh() {
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

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void { }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onRemove($course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'tem certeza que deseja remover o curso?',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.coursesService.remove($course._id).subscribe(
        () => {
          this.snackBar.open('Curso removido com sucesso', 'X', {
            duration: 1000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
    });
  }

}
