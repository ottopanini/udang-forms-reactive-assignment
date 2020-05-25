import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  states = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required], [this.forbiddenProjectName.bind(this) ]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectState': new FormControl()
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      console.log(this.projectForm.value.projectName);
      console.log(this.projectForm.value.email);
      console.log(this.projectForm.value.projectState);
    }
  }

  private forbiddenProjectName(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (control.value === 'test') {
          resolve({'testIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }
}
