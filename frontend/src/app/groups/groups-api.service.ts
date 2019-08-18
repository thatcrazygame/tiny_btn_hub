import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { API_URL } from '../env';
import { Group } from './group.model'

@Injectable({
	providedIn: 'root'
})
export class GroupsApiService {

	httpOptions = {
		observe: 'response' as 'body'
	};

	constructor(private http: HttpClient) { }

	private static _handleError(err: HttpErrorResponse | any) {
		return Observable.throw(err.message || 'Error: Unable to complete request.');
	}

	getGroups(): Observable<Group[]> {
		return this.http
			.get<Group[]>(`${API_URL}/groups`)
			.catch(GroupsApiService._handleError);
	}

	saveGroup(group: Group): Observable<any> {
		return this.http.post(`${API_URL}/groups`, group, this.httpOptions);
	}

	deleteGroup(groupId: number): Observable<any> {
		return this.http.delete(`${API_URL}/groups/${groupId}`, this.httpOptions);
	}

	updateGroupDevices(
		groupId: number,
		devices: any
	): Observable<any> {
		return this.http.put(
			`${API_URL}/groups/${groupId}/devices`,
			devices,
			this.httpOptions
		);
	}
}
