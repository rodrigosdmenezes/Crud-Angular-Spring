import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [],
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

}

