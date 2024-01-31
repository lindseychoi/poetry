import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root',
})
export class PoetryService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getPoetry(params: string[]) {
        console.log('list', params);
        console.log('firing this off: ', `${this.baseUrl}/title/Ozymandias/lines.json`);
        return this.http.get(`${this.baseUrl}/${params[0]}/${params[1]}`, {observe: 'response'})
    }
}