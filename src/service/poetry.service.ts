import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root',
})
export class PoetryService {
    private baseUrl = environment.apiUrl;
    
    constructor(private http: HttpClient) {}

    // For this service call, we are getting poetry from the poetry DB. The baseUrl is recorded in the environment files portion of the app
    // The environment file to include in the build for deployment will be specified by the CI pipeline file (such as a Jenkins file)
    // The endpoint information is being passed in through the params
    // The observe at the end is for error handling
    getPoetry(params: string[]) {
        return this.http.get(`${this.baseUrl}/${params[0]}/${params[1]}`, {observe: 'response'})
    }
}