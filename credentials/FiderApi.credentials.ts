import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class FiderApi implements ICredentialType {
	name = 'fiderApi';
	displayName = 'Fider API';
	documentationUrl = 'https://fider.io/docs/api#authentication';
	properties: INodeProperties[] = [
		{
			displayName: 'ApiToken',
			name: 'apiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Name : 'Authorizations',
				Authorization: '=Bearer {{$credentials.authToken}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/api/v1/posts',
		},
	};
}
