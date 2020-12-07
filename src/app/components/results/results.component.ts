import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'src/app/services/git-hub.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
	avatar = this.getUser()['avatar_url'];
	link_user = this.getUser()['html_url'];
	name = this.getUser()['name'];
	login = this.getUser()['login'];
	company = this.getUser()['company'] || 'Compañia';
	location = this.getUser()['location'] || 'Ubicacion';
	star = this.getUser()['star'] || 0;
	public_repos = this.getUser()['public_repos'] || 0;
	followers = this.getUser()['followers'] || 0;
	username = '';
	repositoriesList: {
		name: any;
		description: any;
		star: any;
		html_url: any;
	}[] = [];

	constructor(
		private service: GitHubService,
		private actRouter: ActivatedRoute
	) {
		this.username = this.actRouter.snapshot.params.username;
	}
	ngOnInit(): void {
		this.getRepos();
	}
	getUser() {
		let user: any = JSON.parse(localStorage.getItem('user') || '');
		return user;
	}
	getRepos() {
		this.service.getData(this.username, '/repos').subscribe(
			(repos) => {
				this.repositoriesList = this.createObjectRepo(repos).sort(
					(a, b) => {
						return b.star - a.star;
					}
				);
			},
			(error) => {
				console.error(error);
			}
		);
	}

	createObjectRepo(
		repository: {
			name: any;
			description: any;
			stargazers_count: any;
			html_url: any;
		}[]
	) {
		let repositories: {
			name: any;
			description: any;
			star: any;
			html_url: any;
		}[] = [];
		repository.forEach(
			(repo: {
				name: any;
				description: any;
				stargazers_count: any;
				html_url: any;
			}) => {
				let repositorieObject = {
					name: repo.name,
					description: repo.description,
					star: repo.stargazers_count,
					html_url: repo.html_url,
				};
				repositories.push(repositorieObject);
			}
		);
		return repositories;
	}
}
