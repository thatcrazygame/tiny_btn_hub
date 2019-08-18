import { Injectable } from '@angular/core';
import * as Auth0 from 'auth0-web';
import { ROLES_URL } from '../env'

@Injectable({ providedIn: 'root' })
export class AuthService {
	public getToken(): string {
		return Auth0.getAccessToken();
	}

	public isAuthenticated(): boolean {
		return Auth0.isAuthenticated();
	}

	public isAdmin() {
		if (!Auth0.isAuthenticated()) return false;

		const roles = Auth0.getProfile()[`${ROLES_URL}`];
		return roles.includes('admin');
	}
}
