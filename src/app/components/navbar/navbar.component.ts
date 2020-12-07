import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GitHubService } from '../../services/git-hub.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	constructor(private service: GitHubService, private router: Router) {}

	ngOnInit(): void {
		localStorage.clear();
	}
	onSubmit(search: string) {
		this.service.getData(search, '').subscribe(
			(user) => {
				localStorage.setItem('user', JSON.stringify(user));
				this.router.navigate([`details/${search}`]);
			},
			(error) => {
				this.router.navigate(['notFound']);
			}
		);
	}
	redirectHome() {
		this.router.navigate(['']);
	}
}
