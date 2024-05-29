import { INodeProperties } from 'n8n-workflow';

export const fiderNodeOperation: INodeProperties[] = [
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
				description: 'Create a post',
				action: 'Create a post',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a post',
				action: 'Delete a post',
			},
			{
				name: 'Edit',
				value: 'edit',
				description: 'Edit a post',
				action: 'Edit a post',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get post',
				action: 'Get post',
			},
			{
				name: 'Vote',
				value: 'vote',
				description: 'Vote on a post',
				action: 'Vote on a post',
			},
		],
		default: 'create',
	},
];

export const fiderNodeFields: INodeProperties[] = [
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create', 'edit'],
				resource: ['post'],
			},
		},
		default: '',
		description: 'Title of the post',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create', 'edit'],
				resource: ['post'],
			},
		},
		default: '',
		description: 'Description of the post',
	},
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['get', 'edit', 'delete', 'vote'],
				resource: ['post'],
			},
		},
		default: 0,
		description: 'ID of the post',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		displayOptions: {
			show: {
				operation: ['edit'],
				resource: ['post'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'New title of the post',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'New description of the post',
			},
		],
		description: 'Fields to update for the post',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create', 'get', 'delete', 'edit', 'vote'],
				resource: ['post'],
			},
		},
		default: '',
		placeholder: 'https://example.com',
		description: 'Target URL to visit',
	},
	{
		displayName: 'Flattened Output',
		name: 'flattenedOutput',
		type: 'boolean',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['post'],
			},
		},
		default: true,
		description: 'Whether to flatten the output data',
	},
	{
		displayName: 'Vote Type',
		name: 'voteType',
		type: 'options',
		displayOptions: {
			show: {
				operation: ['vote'],
				resource: ['post'],
			},
		},
		options: [
			{
				name: 'Upvote',
				value: 'upvote',
				description: 'Upvote the post',
			},
			{
				name: 'Downvote',
				value: 'downvote',
				description: 'Downvote the post',
			},
		],
		default: 'upvote',
		description: 'Type of vote',
	},
	{
		displayName: 'Detached',
		name: 'detached',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['post'],
				operation: ['edit'],
			},
		},
		default: false,
		description: 'Whether to detach the post',
	},
];


