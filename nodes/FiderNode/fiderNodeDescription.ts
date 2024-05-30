import { INodeProperties } from 'n8n-workflow';

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
				resource: ['post', 'comment'],
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
				resource: ['post', 'comment', 'user', 'sample'],
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
	// Comment Fields
	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['create', 'get'],
				resource: ['comment'],
			},
		},
		default: 0,
		description: 'ID of the post',
	},
	{
		displayName: 'Comment ID',
		name: 'commentId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['edit', 'delete'],
				resource: ['comment'],
			},
		},
		default: 0,
		description: 'ID of the comment',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create', 'edit'],
				resource: ['comment'],
			},
		},
		default: '',
		description: 'Content of the comment',
	},
	// User Fields
	{
		displayName: 'User Name',
		name: 'userName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['user'],
			},
		},
		default: '',
		description: 'Name of the user',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
				resource: ['user'],
			},
		},
		default: '',
		placeholder: 'name@gmail.com',
		description: 'Email of the user',
	},
	// Sample Fields
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sample'],
			},
		},
		default: '',
		description: 'The subject of the email to be sent',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sample'],
			},
		},
		default: '',
		description: 'The content of the email to be sent',
	},
];
