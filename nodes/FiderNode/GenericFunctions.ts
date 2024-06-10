import { OptionsWithUri } from 'request';
import {
	IHookFunctions,
	ILoadOptionsFunctions,
	IWebhookFunctions,
} from 'n8n-core';

import {
	IDataObject,
	IExecuteFunctions,
	INode,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

import { FiderCredentials} from './types';

const baseUrl = 'http://localhost';

export async function apiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions | IWebhookFunctions,
	method: string,
	resource: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	uri?: string,
	option: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('fiderApi') as FiderCredentials;


	if (!credentials.url || !credentials.apiToken) {
		throw new NodeOperationError(this.getNode() as INode, 'Credentials are not set!');
	}

	let options: OptionsWithUri = {
		method,
		qs,
		body,
		uri: uri || `${credentials.url}${resource}`,
		json: true,
	};

	options = Object.assign({}, options, option);

	// Check if the constructed URI is valid
	try {
		new URL(options.uri!);
	} catch (error) {
		throw new NodeOperationError(this.getNode() as INode, `Invalid URI: ${options.uri}`);
	}

	try {
		// Set the authorization header
		options.headers = {
			Authorization: `Bearer ${credentials.apiToken}`,
		};

		// If the method is GET, remove the body property
		if (method === 'GET') {
			delete options.body;
		}

		// Perform the HTTP request
		const response = await this.helpers.request!(options);

		// Handle the response
		if (response.error) {
			throw new NodeApiError(this.getNode() as INode, response);
		}

		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode() as INode, error);
	}
}

export async function createNewPost(
	this: IExecuteFunctions,
	title: string,
	description: string,
): Promise<IDataObject> {
	try {
		const endpoint = `${baseUrl}/api/v1/posts/`;
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
		const endpoint = `${baseUrl}/api/v1/posts/${postId}`;
		const postData = { ...await apiRequest.call(this, 'GET', endpoint), ...updatedData };
		const response = await apiRequest.call(this, 'PUT', endpoint, postData);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export async function votePost(this: IExecuteFunctions, postId: number): Promise<void> {
	try {
		const endpoint = `${baseUrl}/api/v1/posts/${postId}/votes`;
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
		const endpoint = `${baseUrl}/api/v1/posts/${postId}/comments`;
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
		const endpoint = `${baseUrl}/api/v1/posts/${postId}/comments`;
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
		const endpoint = `${baseUrl}/api/v1/posts/${postId}/comments/${commentId}`;
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
		const endpoint = `${baseUrl}/api/v1/posts/${postId}/comments/${commentId}`;
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
		const endpoint = `${baseUrl}/api/v1/posts/${postId}/comments/${commentId}`;
		await apiRequest.call(this, 'DELETE', endpoint);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to get all users
export async function getUsers(this: IExecuteFunctions): Promise<IDataObject> {
	try {
		const endpoint = `${baseUrl}/api/v1/users`;
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
		const endpoint = `${baseUrl}/api/v1/users`;
		const data = { name, email };
		const response = await apiRequest.call(this, 'POST', endpoint, data);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

// Function to send a sample invitation
export async function sendASample(this: IExecuteFunctions, subject: string, message: string): Promise<IDataObject> {
	try {
		const endpoint = `${baseUrl}/api/v1/invitations/sample`;
		const data = { subject, message};
		const response = await apiRequest.call(this, 'POST', endpoint, data);
		return response;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}
