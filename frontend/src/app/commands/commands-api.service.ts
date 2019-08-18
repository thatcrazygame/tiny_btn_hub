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


        constructor(private http: HttpClient) { }

    	private static _handleError(err: HttpErrorResponse | any) {
    		return Observable.throw(err.message || 'Error: Unable to complete request.');
    	}

        getCommands(): Observable<Command[]> {
    		return this.http
    			.get<Command[]>(`${API_URL}/commands`)
    			.catch(CommandsApiService._handleError);
    	}

    	saveCommand(command: Command): Observable<any> {
    		const httpOptions = {
    			headers: new HttpHeaders({
    				'authorization': `Bearer ${Auth0.getAccessToken()}`
    			})
    		};
    		return this.http.post(`${API_URL}/commands`, command, httpOptions);
    	}

    	deleteCommand(commandId: number) {
    		const httpOptions = {
    			headers: new HttpHeaders({
    				'authorization': `Bearer ${Auth0.getAccessToken()}`
    			})
    		};
    		return this.http.delete(`${API_URL}/commands/${commandId}`, httpOptions);
    	}


        saveCommandArg(commandId: number, arg_data: Arg): Observable<any> {
            const httpOptions = {
                headers: new HttpHeaders({
                    'authorization': `Bearer ${Auth0.getAccessToken()}`
                })
            };
            return this.http.post(
                `${API_URL}/commands/${commandId}/args`,
                arg_data,
                httpOptions
            );
        }

        deleteCommandArg(argId: number) {
            const httpOptions = {
    			headers: new HttpHeaders({
    				'authorization': `Bearer ${Auth0.getAccessToken()}`
    			})
    		};
    		return this.http.delete(`${API_URL}/commands/args/${argId}`, httpOptions);
        }
}
