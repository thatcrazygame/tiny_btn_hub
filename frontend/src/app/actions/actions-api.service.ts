import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { API_URL } from '../env';
import * as Auth0 from 'auth0-web';
import { Action } from './action.model'


@Injectable({
  providedIn: 'root'
})
export class ActionsApiService {

    constructor(private http: HttpClient) { }

	private static _handleError(err: HttpErrorResponse | any) {
		return Observable.throw(err.message || 'Error: Unable to complete request.');
	}
    
    getActions(): Observable<Action[]> {
		return this.http
			.get<Action[]>(`${API_URL}/actions`)
			.catch(ActionsApiService._handleError);
	}

	saveAction(action: Action): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'authorization': `Bearer ${Auth0.getAccessToken()}`
			})
		};
		return this.http.post(`${API_URL}/actions`, action, httpOptions);
	}

	deleteAction(actionId: number) {
		const httpOptions = {
			headers: new HttpHeaders({
				'authorization': `Bearer ${Auth0.getAccessToken()}`
			})
		};
		return this.http.delete(`${API_URL}/actions/${actionId}`, httpOptions);
	}

}
