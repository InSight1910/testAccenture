import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from 'src/app/services/github.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	constructor(private service: GithubService, private router: Router) {}

	ngOnInit(): void {
		localStorage.clear();
	}
	onSubmit(search: string) {
		let username = search;
		this.service.getUser(username).subscribe(
			(user) => {
				localStorage.setItem('user', JSON.stringify(user));
				localStorage.setItem('username', JSON.stringify(username));
				this.router.navigate(['details']);
			},
			(error) => {
				this.router.navigate(['notFound']);
			}
		);
	}
}
