import {
	INodeType,
	INodeExecutionData
} from 'n8n-workflow';

export class Fider implements INodeType {
	description: {
		displayName: 'Fider',
		name: 'fider',
		group: ['input'],
		version: 1,
		description: 'Node to interact with Fider API',
		defaults: {
			name: 'Fider',
			color: '#772244',
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
				displayName: 'Endpoint',
				name: 'endpoint',
				type: 'string',
				default: '',
				description: 'The endpoint of the Fider instance (e.g., https://fider.io)',
				required: true,
			},
			// Add more properties here as needed
		],
	};
}
