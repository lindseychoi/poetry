import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root',
})
export class PoetryService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getPoetry() {
        console.log('firing this off: ', `${this.baseUrl}/title/Ozymandias/lines.json`);
        return this.http.get(`${this.baseUrl}/title/The Life we have is very great./lines.json`, {observe: 'response'})
    }
}