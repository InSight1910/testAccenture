import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/app/services/github.service';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
	avatar = this.getUser()['avatar_url'];
	name = this.getUser()['name'];
	login = this.getUser()['login'];
	company = this.getUser()['company'];
	location = this.getUser()['location'];
	star = this.getUser()['star'] || 0;
	repos = this.getUser()['public_repos'] || 0;
	followers = this.getUser()['followers'] || 0;
	repss: { name: any; description: any; star: any }[] = [];

	constructor(private service: GithubService) {}
	ngOnInit(): void {
		this.getRepos();
	}
	getUser() {
		let user: any = JSON.parse(localStorage.getItem('user') || '');
		return user;
	}
	getRepos() {
		let username = JSON.parse(localStorage.getItem('username') || '');
		this.service.getRepos(username).subscribe(
			(repos) => {
				this.repss = this.createObjectRepo(repos);
			},
			(error) => {
				console.error(error);
			}
		);
	}

	createObjectRepo(
		repo: { name: any; description: any; stargazers_count: any }[]
	) {
		let repos: { name: any; description: any; star: any }[] = [];
		repo.forEach(
			(rep: { name: any; description: any; stargazers_count: any }) => {
				let repositorieObject = {
					name: rep.name,
					description: rep.description,
					star: rep.stargazers_count,
				};
				repos.push(repositorieObject);
			}
		);
		return repos;
	}
}
