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
				name: 'Create Comment',
				value: 'createComment',
				description: 'Create a comment',
				action: 'Create a comment',
			},
			{
				name: 'Create User',
				value: 'createUser',
				description: 'Create a user',
				action: 'Create a user',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a post',
				action: 'Delete a post',
			},
			{
				name: 'Delete Comment',
				value: 'deleteComment',
				description: 'Delete a comment',
				action: 'Delete a comment',
			},
			{
				name: 'Edit',
				value: 'edit',
				description: 'Edit a post',
				action: 'Edit a post',
			},
			{
				name: 'Edit Comment',
				value: 'editComment',
				description: 'Edit a comment',
				action: 'Edit a comment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get post',
				action: 'Get post',
			},
			{
				name: 'Get Comment',
				value: 'getComment',
				description: 'Get a comment',
				action: 'Get a comment',
			},
			{
				name: 'Get Comments',
				value: 'getComments',
				description: 'Get comments of a post',
				action: 'Get comments of a post',
			},

			{
				name: 'Get Users',
				value: 'getUsers',
				description: 'Get all users',
				action: 'Get all users',
			},
			{
				name: 'Send Sample',
				value: 'sendSample',
				description: 'Send a sample',
				action: 'Send a sample',
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
				operation: ['create', 'createComment', 'createUser', 'get', 'getComment', 'getComments', 'getUsers', 'delete', 'deleteComment', 'edit', 'editComment', 'sendSample', 'vote'],
				resource: ['post', 'comment', 'users', 'sample'],
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
				operation: ['createComment', 'getComments'],
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
				operation: ['getComment', 'editComment', 'deleteComment'],
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
				operation: ['createComment', 'editComment'],
				resource: ['comment'],
			},
		},
		default: '',
		description: 'Content of the comment',
	},
	// User Fields
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				operation: ['createUser'],
				resource: ['user'],
			},
		},
		default: 0,
		description: 'ID of the user',
	},
	{
		displayName: 'User Name',
		name: 'userName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['createUser'],
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
				operation: ['createUser'],
				resource: ['user'],
			},
		},
		default: '',
		placeholder : 'name@gmail.com',
		description: 'Email of the user',
	},
	// Sample Fields
	{
		displayName: 'Sample Data',
		name: 'sampleData',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				operation: ['sendSample'],
				resource: ['sample'],
			},
		},
		default: '',
		description: 'Data to send as a sample',
	},
];
