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
  panelOpenState = false;
  requestPoetryForm!: FormGroup;
  // We specify and write custom type interfaces and enums in the data folder of the application and then import them as necessary
  searchTypes = Object.values(SearchTypes);
  results!: any;

  // declare the service file in the constructor so we can use it
  constructor(private _service: PoetryService) {}

  // Initialize the reactive form on load with the form control names and validators required
  ngOnInit() {
    this.requestPoetryForm = new FormGroup({
      byTitleOrAuthor: new FormControl('', Validators.required),
      inputRequest: new FormControl('', Validators.required)
    })
  }

  getPoetry() {
    let type;

    // First, let's decide if we're searching by author or title and assign a variable to the endpoint we want to use
    // This is retrieved from the reactive form value 
    // If there were more than two possible values, we would need to use a switch case instead of an if statement
    if (this.requestPoetryForm.value.byTitleOrAuthor === 'Search by title') {
      type = 'title'
    } else {
      type = 'author'
    };

    // Then, add that endpoint and the value the user has typed into the input box into an array to send to the service for the get request
    const poetryParams = [type, this.requestPoetryForm.value.inputRequest];

    // The subscribe used in this way is deprecated; I would normally track errors through the NgRx store or research more modern ways of error handling with the Http client if time allowed.
    // The cleaner way to do this is to make this function an async and then await the first value from the API; for error handling and time's sake we'll use it this time
    const poem = this._service.getPoetry(poetryParams).subscribe(
      (res) => {
        if (res.status == 200) {
          console.log(res.body);
          this.results = res.body;
        }
      }, (err) => {
        alert("Unable to process your request, please check the input you provided and try again!");
        console.log('The error is: ', err);
      });
  }
}
