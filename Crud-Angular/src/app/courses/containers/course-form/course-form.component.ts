import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AppMaterialModule } from '../../../shared/app-material/app-material.module';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

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
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      _id: [''],
      name: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
      ]],
      category: ['', [Validators.required]],
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

  ngOnInit() {
    const course: Course = this.route.snapshot.data['course']
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  onCancel() {
    this.location.back();
  }

  private onSucces() {
    this.snackBar.open('Curso salvo!', '', { duration: 1000 });
    this.onCancel();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar Curso', '', { duration: 5000 });
  }

  getErrorMessage(fildName: string) {
    const field = this.form.get(fildName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório'
    }

    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo exedido de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido';
  }
}
