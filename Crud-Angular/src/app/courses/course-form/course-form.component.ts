import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';
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

  constructor(private formbuilder: FormBuilder) {
    this.form = this.formbuilder.group({
      name: [null],
      category:[null]
    });
  }

  onSubmit(){
    
  }

  onCancel(){

  }

}

