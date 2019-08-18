import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { API_URL } from '../env';
import { Btn } from './btn.model';
import { BtnAction } from './btnaction.model';

@Injectable({
	providedIn: 'root'
})
export class BtnsApiService {

	httpOptions = {
		observe: 'response' as 'body'
	};

	constructor(private http: HttpClient) {
	}

	private static _handleError(err: HttpErrorResponse | any) {
		return Observable.throw(err.message || 'Error: Unable to complete request.');
	}

	getBtns(): Observable<Btn[]> {
		return this.http
			.get<Btn[]>(`${API_URL}/btns`)
			.catch(BtnsApiService._handleError);
	}


	saveBtn(btn: Btn): Observable<any> {
		return this.http.post(`${API_URL}/btns`, btn, this.httpOptions);
	}

	deleteBtn(btnId: number): Observable<any> {
		return this.http.delete(`${API_URL}/btns/${btnId}`, this.httpOptions);
	}

	saveBtnAction(btnaction: BtnAction, argvalues: any): Observable<any> {
		let data = {
			btnaction: btnaction,
			argvalues: argvalues
		};

		return this.http.post(`${API_URL}/btnactions`, data, this.httpOptions);
	}

	updateBtnAction(
		btnID: number,
		actionID: number,
		btnaction: BtnAction,
		argvalues: any
	): Observable<any> {
		let data = {
			btnaction: btnaction,
			argvalues: argvalues
		};

		return this.http.put(
			`${API_URL}/btnactions/${btnID}/${actionID}`,
			data,
			this.httpOptions
		);
	}

	deleteBtnAction(
		btnID: number,
		actionID: number
	): Observable<any> {
		return this.http.delete(
			`${API_URL}/btnactions/${btnID}/${actionID}`,
			this.httpOptions
		);
	}

}
