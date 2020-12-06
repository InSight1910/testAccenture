import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class GithubService {
	constructor(private http: HttpClient) {}
	url = 'https://api.github.com/users/';
	getUser(username: string): Observable<any> {
		+username;
		return this.http.get<any>(`${this.url}${username}`);
	}
	getRepos(username: string): Observable<any> {
		return this.http.get<any>(`${this.url}${username}/repos`);
	}
}
