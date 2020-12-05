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

	ngOnInit(): void {}
	onSubmit(search: string) {
		localStorage.clear();
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
