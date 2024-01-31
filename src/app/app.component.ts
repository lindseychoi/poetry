import { Component, OnInit } from '@angular/core';
import { PoetryService } from '../service/poetry.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchTypes } from './data/poetry.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'poetry';
  requestPoetryForm!: FormGroup;
  searchTypes = Object.values(SearchTypes);

  constructor(private _service: PoetryService) {}

  ngOnInit() {
    this.requestPoetryForm = new FormGroup({
      byTitleOrAuthor: new FormControl('', Validators.required),
      inputRequest: new FormControl('', Validators.required)
    })
  }
  
  async getPoetry() {
    let type;

    if (this.requestPoetryForm.value.byTitleOrAuthor === 'Search by title') {
      type = 'title'
    } else {
      type = 'author'
    };

    const poetryParams = [type, this.requestPoetryForm.value.inputRequest];

    console.log('hitting get poetry in app component')
    // the subscribe used in this way is deprecated; I would normally track errors through the NgRx store or research more modern ways of error handling with the Http client if time allowed.
    const poem = this._service.getPoetry(poetryParams).subscribe(
      (res) => {
        if (res.status == 200) {
          console.log(res.body);
        }
      }, (err) => {
        console.log("Unable to process your request, please check the input you provided and try again!", err);
      });

    // const awaitPoem = await firstValueFrom(poem);
    console.log('after', poem);
  }
}
