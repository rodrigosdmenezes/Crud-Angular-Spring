import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

 // Importe o ReactiveFormsModule
@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    AppMaterialModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})

export class CourseFormComponent {

  form: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      category:['']
    });
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe({
        next: (result: any) => {
          this.onSucces();
        },
        error: (error: any) => {
          this.onError();
        }
      });
  }
  onCancel(){
    this.location.back();
  }

  private onSucces(){
    this.snackBar.open('Curso salvo!', '', { duration: 1000 });
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar Curso', '', { duration: 5000 });
  }

}
