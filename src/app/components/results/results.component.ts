import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
	avatar = this.getImages()['avatar_url'];
	login = this.getImages()['login'];
	username = JSON.parse(localStorage.getItem('username'));

	constructor() {}
	ngOnInit(): void {}
	getImages() {
		let user = JSON.parse(localStorage.getItem('user'));
		return user;
	}
}
