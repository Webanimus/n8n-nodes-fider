import {
	IAllExecuteFunctions,
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	NodeApiError,
} from 'n8n-workflow';

import { FiderCredentials } from './types';

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
