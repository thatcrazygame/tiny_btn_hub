import { Component, OnInit } from '@angular/core';
import { BtnsApiService } from "../btns-api.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-new-btn',
	templateUrl: './new-btn.component.html',
	styleUrls: ['./new-btn.component.css']
})
export class NewBtnComponent implements OnInit {

	btn = {
		id: 0,
		name: '',
		counter: 0,
	};

	constructor(private btnsApi: BtnsApiService, private router: Router) { }


	updateID(event: any) {
		this.btn.id = event.target.value;
	}

	updateName(event: any) {
		this.btn.name = event.target.value;
	}

	saveBtn() {
		this.btnsApi
			.saveBtn(this.btn)
			.subscribe(
				() => this.router.navigate(['/btns']),
				error => alert(error.message)
			);
	}

	ngOnInit() {
	}

}
