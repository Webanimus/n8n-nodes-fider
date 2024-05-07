"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FiderCredentialsApi = void 0;
class FiderCredentialsApi {
	constructor() {
		this.name = 'fiderCredentialsApi';
		this.displayName = 'Fider Credentials API';
		this.properties = [
			{
				displayName: 'User Name',
				name: 'username',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
			},
		];
		this.authenticate = {
			type: 'generic',
			properties: {
				auth: {
					username: '={{ $credentials.username }}',
					password: '={{ $credentials.password }}',
				},
				qs: {
					n8n: 'rocks',
				},
			},
		};
		this.test = {
			request: {
				baseURL: 'https://localhost.com/',
				url: 'api/v1',
			},
		};
	}
}
exports.FiderCredentialsApi = FiderCredentialsApi;
//# sourceMappingURL=FiderCredentialsApi.credentials.js.map
