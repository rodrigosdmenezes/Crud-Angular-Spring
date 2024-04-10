import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private formbuilder: FormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formbuilder.group({
      name: [null],
      category:[null]
    });
  }

  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(next: result => console.log(message: result), error: error =>{
      this.snackBar.open('Erro ao salvar Curso')
    });
  }

  onCancel(){

  }

}

