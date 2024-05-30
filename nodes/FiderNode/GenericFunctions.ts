import {
	IAllExecuteFunctions,
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	NodeApiError,
} from 'n8n-workflow';

import { FiderCredentials} from './types';

export async function apiRequest(
	this: IAllExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	extraOptions: Partial<IHttpRequestOptions> = {},
): Promise<IDataObject> {
	const credentials = (await this.getCredentials('fiderApi')) as FiderCredentials;
	const options: IHttpRequestOptions = {
		...extraOptions,
		method,
		body,
		qs: {
			...qs,
			token: credentials.token,
		},
		baseURL: credentials.url,
		url: endpoint,
		json: true,
	};

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(
			this,
			'fiderApi',
			options,
		);
		if (typeof response === 'object' && response !== null) {
			return response as IDataObject;
		} else {
			throw new Error('Unexpected response format');
		}
	} catch (error) {
		const errorDetails = {
			...error,
			config: error?.cause?.config,
			request: error?.cause?.request
				? {
					path: error?.cause?.request?.path,
					headers: error?.cause?.request?.headers,
					data: error?.cause?.request?.data,
				}
				: null,
			response: error?.cause?.response
				? {
					data: error?.cause?.response?.data,
					status: error?.cause?.response?.status,
				}
				: null,
		};
		throw new NodeApiError(this.getNode(), errorDetails);
	}
}

export async function createNewPost(
	this: IExecuteFunctions,
	title: string,
	description: string,
): Promise<IDataObject> {
	try {
		const endpoint = '/api/v1/posts/';
		const data = { title, description };
		const response = await apiRequest.call(this, 'POST', endpoint, data);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export async function getPosts(this: IExecuteFunctions): Promise<IDataObject> {
	try {
		const endpoint = '/api/v1/posts/';
		const response = await apiRequest.call(this, 'GET', endpoint);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export async function editPost(
	this: IExecuteFunctions,
	postId: number,
	updatedData: IDataObject,
): Promise<IDataObject> {
	try {
		const endpoint = `/api/v1/posts/${postId}`;
		const postData = { ...await apiRequest.call(this, 'GET', endpoint), ...updatedData };
		const response = await apiRequest.call(this, 'PUT', endpoint, postData);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export async function votePost(this: IExecuteFunctions, postId: number): Promise<void> {
	try {
		const endpoint = `/api/v1/posts/${postId}/votes`;
		await apiRequest.call(this, 'POST', endpoint);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export async function deletePost(this: IExecuteFunctions, postId: number): Promise<void> {
	try {
		const endpoint = `/api/v1/posts/${postId}`;
		await apiRequest.call(this, 'DELETE', endpoint);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to add a comment to a post
export async function addComment(
	this: IExecuteFunctions,
	postId: number,
	content: string,
): Promise<IDataObject> {
	try {
		const endpoint = `/api/v1/posts/${postId}/comments`;
		const data = { content };
		const response = await apiRequest.call(this, 'POST', endpoint, data);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to get all comments for a post
export async function getComments(
	this: IExecuteFunctions,
	postId: number,
): Promise<IDataObject> {
	try {
		const endpoint = `/api/v1/posts/${postId}/comments`;
		const response = await apiRequest.call(this, 'GET', endpoint);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to get a single comment
export async function getComment(
	this: IExecuteFunctions,
	postId: number,
	commentId: number,
): Promise<IDataObject> {
	try {
		const endpoint = `/api/v1/posts/${postId}/comments/${commentId}`;
		const response = await apiRequest.call(this, 'GET', endpoint);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to edit a comment
export async function editComment(
	this: IExecuteFunctions,
	postId: number,
	commentId: number,
	updatedData: IDataObject,
): Promise<IDataObject> {
	try {
		const endpoint = `/api/v1/posts/${postId}/comments/${commentId}`;
		const commentData = { ...await apiRequest.call(this, 'GET', endpoint), ...updatedData };
		const response = await apiRequest.call(this, 'PUT', endpoint, commentData);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to delete a comment
export async function deleteComment(
	this: IExecuteFunctions,
	postId: number,
	commentId: number,
): Promise<void> {
	try {
		const endpoint = `/api/v1/posts/${postId}/comments/${commentId}`;
		await apiRequest.call(this, 'DELETE', endpoint);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to get all users
export async function getUsers(this: IExecuteFunctions): Promise<IDataObject> {
	try {
		const endpoint = '/api/v1/users';
		const response = await apiRequest.call(this, 'GET', endpoint);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to create a new user
export async function createUser(
	this: IExecuteFunctions,
	name: string,
	email: string,
): Promise<IDataObject> {
	try {
		const endpoint = '/api/v1/users';
		const data = { name, email };
		const response = await apiRequest.call(this, 'POST', endpoint, data);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to send a sample invitation
export async function sendASample(this: IExecuteFunctions): Promise<void> {
	try {
		const endpoint = '/api/v1/invitations/sample';
		await apiRequest.call(this, 'POST', endpoint);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
