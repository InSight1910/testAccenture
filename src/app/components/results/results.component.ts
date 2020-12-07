import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'src/app/services/git-hub.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
	avatar: string = '';
	link_user: string = '';
	name: string = '';
	login: string = '';
	company: string = '';
	location: string = '';
	star: string = '';
	public_repos: string = '';
	followers: string = '';
	username = '';
	repositoriesList: {
		name: any;
		description: any;
		star: any;
		html_url: any;
	}[] = [];

	constructor(
		private service: GitHubService,
		private router: Router,
		private actRouter: ActivatedRoute
	) {}
	ngOnInit(): void {
		this.actRouter.paramMap.subscribe((params: ParamMap) => {
			this.username = params.get('username') || '';
			this.getUser();
			this.getRepos();
		});
	}
	getUser() {
		let user1;
		this.service.getData(this.username, '').subscribe(
			(user) => {
				user1 = this.createObjectUser(user)[0];
				this.avatar = user1['avatar_url'];
				this.link_user = user1['html_url'];
				this.name = user1['name'];
				this.login = user1['login'];
				this.company = user1['company'] || 'Compañia';
				this.location = user1['location'] || 'Ubicacion';
				this.star = user1['star'] || 0;
				this.public_repos = user1['public_repos'] || 0;
				this.followers = user1['followers'] || 0;
			},
			(error) => {
				this.router.navigate(['notFound']);
			}
		);
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
	createObjectUser(user: {
		avatar_url: any;
		html_url: any;
		name: any;
		login: any;
		company: any;
		location: any;
		star: any;
		public_repos: any;
		followers: any;
	}) {
		let User = [];
		let UserObject = {
			avatar_url: user.avatar_url,
			html_url: user.html_url,
			name: user.name,
			login: user.login,
			company: user.company,
			location: user.location,
			star: user.star,
			public_repos: user.public_repos,
			followers: user.followers,
		};
		User.push(UserObject);
		return User;
	}
}
