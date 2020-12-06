import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GithubService } from '../../services/github.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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
				if (this.router.url.endsWith('details')) {
					this.router.navigate(['details']);
				}
				this.router.navigate(['details']);
			},
			(error) => {
				this.router.navigate(['notFound']);
			}
		);
	}
	redirectHome() {
		this.router.navigate(['home']);
	}
}
