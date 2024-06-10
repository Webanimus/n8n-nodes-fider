import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import * as GenericFunctions from './GenericFunctions';
import { fiderNodeFields } from './fiderNodeDescription';

export class FiderNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Fider',
		name: 'fiderNode',
		icon: 'file:fider.svg', // Remplacer par une icône SVG
		group: ['transform'],
		version: 1,
		description: 'Interact with Fider API',
		defaults: {
			name: 'fider',
		},
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'fiderApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Post',
						value: 'post',
					},
					{
						name: 'Comment',
						value: 'comment',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Sample',
						value: 'sample',
					},
				],
				default: 'post',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['post'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create',
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete',
					},
					{
						name: 'Edit',
						value: 'edit',
						action: 'Edit',
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get',
					},
					{
						name: 'Vote',
						value: 'vote',
						action: 'Vote',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['comment'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create',
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete',
					},
					{
						name: 'Edit',
						value: 'edit',
						action: 'Edit',
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['user'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						action: 'Create',
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['sample'],
					},
				},
				options: [
					{
						name: 'Send',
						value: 'send',
						action: 'Send',
					},
				],
				default: 'send',
			},
			...fiderNodeFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;

			try {
				if (resource === 'post') {
					if (operation === 'create') {
						const title = this.getNodeParameter('title', i) as string;
						const description = this.getNodeParameter('description', i) as string;
						const responseData = await GenericFunctions.createNewPost.call(this, title, description);
						returnData.push({ json: responseData });
					}
					if (operation === 'get') {
						const responseData = await GenericFunctions.getPosts.call(this);
						returnData.push({ json: responseData });
					}
					if (operation === 'edit') {
						const postId = this.getNodeParameter('postId', i) as number;
						const updatedData = this.getNodeParameter('updateFields', i) as IDataObject;
						const responseData = await GenericFunctions.editPost.call(this, postId, updatedData);
						returnData.push({ json: responseData });
					}
					if (operation === 'delete') {
						const postId = this.getNodeParameter('postId', i) as number;
						await GenericFunctions.deletePost.call(this, postId);
						returnData.push({ json: { success: true } });
					}
					if (operation === 'vote') {
						const postId = this.getNodeParameter('postId', i) as number;
						await GenericFunctions.votePost.call(this, postId);
						returnData.push({ json: { success: true } });
					}
				}
				if (resource === 'comment') {
					if (operation === 'create') {
						const postId = this.getNodeParameter('postId', i) as number;
						const content = this.getNodeParameter('content', i) as string;
						const responseData = await GenericFunctions.addComment.call(this, postId, content);
						returnData.push({ json: responseData });
					}
					if (operation === 'get') {
						const postID = this.getNodeParameter('postId', i) as number;
						const responseData = await GenericFunctions.getComments.call(this, postID);
						returnData.push({ json: responseData });
					}
					if (operation === 'edit') {
						const postId = this.getNodeParameter('postId', i) as number;
						const commentId = this.getNodeParameter('postId', i) as number;
						const updatedData = this.getNodeParameter('updateFields', i) as IDataObject;
						const responseData = await GenericFunctions.editComment.call(this, postId, commentId, updatedData);
						returnData.push({ json: responseData });
					}
					if (operation === 'delete') {
						const postId = this.getNodeParameter('postId', i) as number;
						const commentId = this.getNodeParameter('postId', i) as number;
						await GenericFunctions.deleteComment.call(this, postId, commentId);
						returnData.push({ json: { success: true } });
					}
				}
				if (resource === 'user') {
					if (operation === 'create') {
						const name = this.getNodeParameter('userName', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const responseData = await GenericFunctions.createUser.call(this, name, email);
						returnData.push({ json: responseData });
					}
					if (operation === 'get') {
						const responseData = await GenericFunctions.getUsers.call(this);
						returnData.push({ json: responseData });
					}
				}
				if (resource === 'sample') {
					const subject = this.getNodeParameter('subject', i) as string;
					const message = this.getNodeParameter('message', i) as string;
					const responseData = await GenericFunctions.sendASample.call(this, subject, message);
					returnData.push({ json: responseData });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw new NodeOperationError(this.getNode(), error);
			}
		}
		return [returnData];
	}
}
