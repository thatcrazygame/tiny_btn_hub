import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { AUDIENCE, AUTH0_DOMAIN, APP_CLIENT_ID, CALLBACK_URL } from './env'
import * as Auth0 from 'auth0-web';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { TokenInterceptor } from './auth/token.interceptor';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() {
		Auth0.configure({
			domain: `${AUTH0_DOMAIN}`,
			audience: `${AUDIENCE}`,
			clientID: `${APP_CLIENT_ID}`,
			redirectUri: `${CALLBACK_URL}`,
			scope: 'openid profile manage:btns'
		});
	}
}
