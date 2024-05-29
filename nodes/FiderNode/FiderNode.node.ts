import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

import { createNewPost, deletePost, editPost, getPosts, votePost } from './GenericFunctions';

export class FiderNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Fider',
		name: 'fiderNode',
		icon: 'file:fider.svg',  // Remplacer par une icône SVG
		group: ['transform'],
		version: 1,
		description: 'Interact with Fider API',
		defaults: {
			name: 'fider',
		},
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
				noDataExpression: true,  // Ajouté
				options: [
					{
						name: 'Post',
						value: 'post',
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
						action: 'Create a post',
					},
					{
						name: 'Delete',
						value: 'delete',
						action: 'Delete a post',
					},
					{
						name: 'Edit',
						value: 'edit',
						action: 'Edit a post',
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get a post',
					},
					{
						name: 'Vote',
						value: 'vote',
						action: 'Vote on a post',
					},
				],
				default: 'create',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create', 'edit'],
					},
				},
				default: '',
				description: 'Title of the post',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['create', 'edit'],
					},
				},
				default: '',
				description: 'Description of the post',
			},
			{
				displayName: 'Post ID',
				name: 'postId',
				type: 'number',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['get', 'edit', 'delete', 'vote'],
					},
				},
				default: '',
				description: 'ID of the post',
			},
			{
				displayName: 'Vote Type',
				name: 'voteType',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['post'],
						operation: ['vote'],
					},
				},
				options: [
					{
						name: 'Upvote',
						value: 'upvote',
					},
					{
						name: 'Downvote',
						value: 'downvote',
					},
				],
				default: 'upvote',
			},
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
						const responseData = await createNewPost.call(this, title, description);
						returnData.push({ json: responseData });
					}
					if (operation === 'get') {
						const responseData = await getPosts.call(this);
						returnData.push({ json: responseData });
					}
					if (operation === 'edit') {
						const postId = this.getNodeParameter('postId', i) as number;
						const updatedData = this.getNodeParameter('updateFields', i) as IDataObject;
						const responseData = await editPost.call(this, postId, updatedData);
						returnData.push({ json: responseData });
					}
					if (operation === 'delete') {
						const postId = this.getNodeParameter('postId', i) as number;
						await deletePost.call(this, postId);
						returnData.push({ json: { success: true } });
					}
					if (operation === 'vote') {
						const postId = this.getNodeParameter('postId', i) as number;
						await votePost.call(this, postId);
						returnData.push({ json: { success: true } });
					}
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
