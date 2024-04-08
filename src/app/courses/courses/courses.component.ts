import { Component } from '@angular/core';
import { Course } from '../model/course';
import { AppMaterialModule } from '../../shared/app-material/app-material.module';


@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})

export class CoursesComponent {

  courses: Course[] = [
    {_id: '1', name: 'Angular', category: 'Front End'}
  ];
  displayedColumns = ['name', 'category'];

  constructor(){
    //this.courses = [];
  }

  ngOnInit():void{
    
  }

}
