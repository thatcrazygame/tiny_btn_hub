import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { API_URL } from '../env';
import * as Auth0 from 'auth0-web';
import { Command } from './command.model'
import { Arg } from './arg.model'

@Injectable({
	providedIn: 'root'
})
export class CommandsApiService {

	httpOptions = {
		observe: 'response' as 'body'
	};

	constructor(private http: HttpClient) { }

	private static _handleError(err: HttpErrorResponse | any) {
		return Observable.throw(err.message || 'Error: Unable to complete request.');
	}

	getCommands(): Observable<Command[]> {
		return this.http
			.get<Command[]>(`${API_URL}/commands`)
			.catch(CommandsApiService._handleError);
	}

	getCommandCount(): Observable<any> {
		return this.http
			.get(`${API_URL}/commands/count`, this.httpOptions)
			.catch(CommandsApiService._handleError);
	}

	saveCommand(command: Command): Observable<any> {
		return this.http.post(`${API_URL}/commands`, command, this.httpOptions);
	}

	deleteCommand(commandId: number) {
		return this.http.delete(`${API_URL}/commands/${commandId}`, this.httpOptions);
	}


	saveCommandArg(commandId: number, arg_data: Arg): Observable<any> {
		return this.http.post(
			`${API_URL}/commands/${commandId}/args`,
			arg_data,
			this.httpOptions
		);
	}

	deleteCommandArg(argId: number): Observable<any> {
		return this.http.delete(`${API_URL}/commands/args/${argId}`, this.httpOptions);
	}
}
