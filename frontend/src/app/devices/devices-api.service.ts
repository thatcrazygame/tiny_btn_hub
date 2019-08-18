import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { API_URL } from '../env';
import * as Auth0 from 'auth0-web';
import { Device } from './device.model'
import { DeviceType } from './devicetype.model'

@Injectable({
	providedIn: 'root'
})
export class DevicesApiService {

	constructor(private http: HttpClient) { }

	private static _handleError(err: HttpErrorResponse | any) {
		return Observable.throw(err.message || 'Error: Unable to complete request.');
	}

	// ******** Devices ******** //

	getDevices(): Observable<Device[]> {
		return this.http
			.get<Device[]>(`${API_URL}/devices`)
			.catch(DevicesApiService._handleError);
	}

	saveDevice(device: Device): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'authorization': `Bearer ${Auth0.getAccessToken()}`
			})
		};
		return this.http.post(`${API_URL}/devices`, device, httpOptions);
	}

	deleteDevice(deviceId: number) {
		const httpOptions = {
			headers: new HttpHeaders({
				'authorization': `Bearer ${Auth0.getAccessToken()}`
			})
		};
		return this.http.delete(`${API_URL}/devices/${deviceId}`, httpOptions);
	}

	// ******** DeviceTypes ******** //

	getDeviceTypes(): Observable<DeviceType[]> {
		return this.http
			.get<DeviceType[]>(`${API_URL}/devices/types`)
			.catch(DevicesApiService._handleError);
	}

	saveDeviceType(devicetype: DeviceType): Observable<any> {
		const httpOptions = {
			headers: new HttpHeaders({
				'authorization': `Bearer ${Auth0.getAccessToken()}`
			})
		};
		return this.http.post(`${API_URL}/devices/types`, devicetype, httpOptions);
	}

	deleteDeviceType(deviceTypeId: number) {
		const httpOptions = {
			headers: new HttpHeaders({
				'authorization': `Bearer ${Auth0.getAccessToken()}`
			})
		};
		return this.http.delete(`${API_URL}/devices/types/${deviceTypeId}`, httpOptions);
	}
}
