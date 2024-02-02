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
  label = '';
  results!: any;
  extraParams = false;
  doNotRenderCards = false;

  // declare the service file in the constructor so we can use it
  constructor(private _service: PoetryService) {}

  // Initialize the reactive form on load with the form control names and validators required
  ngOnInit() {
    this.requestPoetryForm = new FormGroup({
      byTitleOrAuthor: new FormControl('', Validators.required),
      inputRequest: new FormControl('', Validators.required),
      additionalInfo: new FormControl('')
    })
  }

  switchInputLabel(searchType: string) {
    if (searchType === 'Search by author') {
      this.label = 'Author Name';
      this.extraParams = false;
    } else if (searchType === 'Search by title') {
      this.label = 'Title Name';
      this.extraParams = false;
    } else if (searchType === 'Search by author and title') {
      this.label = 'Author Name';
      this.extraParams = true;
    }
  }

  getPoetry() {
    const specificSearchParam = this.requestPoetryForm.value.byTitleOrAuthor;
    const searchValue1 = this.requestPoetryForm.value.inputRequest;
    const searchValue2 = this.requestPoetryForm.value.additionalInfo;
    let formattedForExtraParams;
    let type;

    // First, let's decide if we're searching by author or title and assign a variable to the endpoint we want to use
    // This is retrieved from the reactive form value 
    // need to add in the third option in case the search is by title and author
    if (specificSearchParam === 'Search by title') {
      type = 'title';
      formattedForExtraParams = searchValue1;
    } else if (specificSearchParam === 'Search by author') {
      type = 'author';
      formattedForExtraParams = searchValue1;
    } else if (searchValue2 !== '' && this.extraParams == true) {
      type = 'author,title';
      formattedForExtraParams = `${searchValue1};${searchValue2}`;
    } 

    // Then, add that endpoint and the value the user has typed into the input box into an array to send to the service for the get request
    const poetryParams = [type, formattedForExtraParams];

    // The subscribe used in this way is deprecated; I would normally track errors through the NgRx store or research more modern ways of error handling with the Http client if time allowed.
    // The cleaner way to do this is to make this function an async and then await the first value from the API; for error handling and time's sake we'll use it this time
    this._service.getPoetry(poetryParams).subscribe(
      (res) => {
        if (res.status == 200) {
          console.log(res.body);
          this.doNotRenderCards = false;
          this.results = res.body;
          if(this.results.status === '405') {
            this.doNotRenderCards = true;
            alert('You have left an input field blank, please fix this before searching for your content!');
          }
        }
      }, (err) => {
        alert("Unable to process your request, please check the input you provided and try again! Have you selected a search type and entered a title or author to look up?");
        console.log('The error is: ', err);
      });
  }
}
