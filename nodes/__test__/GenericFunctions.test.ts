import { createNewPost, deletePost, editPost, getPosts, votePost, } from '../FiderNode/GenericFunctions';
import { IDataObject, IExecuteFunctions } from 'n8n-workflow';

describe('GenericFunctions', () => {
	const context: IExecuteFunctions = {
		// Moquez les méthodes et propriétés nécessaires ici
		helpers: {
			httpRequestWithAuthentication: jest.fn().mockImplementation(() => {
				// Implémentation simulée de la requête HTTP
				return Promise.resolve({
					body: { id: 1, title: 'Test', description: 'Test Description' },
				});
			}),
		},
		getNodeParameter: jest.fn().mockImplementation((paramName: string, index: number) => {
			const parameters: IDataObject = {
				myString: 'Test',
			};
			return parameters[paramName];
		}),
		getNode: jest.fn().mockReturnValue({
			name: 'testNode',
		}),
		continueOnFail: jest.fn().mockReturnValue(false),
		getInputData: jest.fn().mockReturnValue([{}]),
		getRestApiUrl: jest.fn().mockReturnValue('http://localhost'),
	} as unknown as IExecuteFunctions;

	it('should create a new post', async () => {
		const newPostData = { title: 'Test Title', description: 'Test Description' };
		const response = await createNewPost.call(context, newPostData.title, newPostData.description);
		expect(response).toHaveProperty('id');
	});

	it('should throw an error for invalid post data', async () => {
		const invalidPostData = { title: '', description: '' };
		await expect(createNewPost.call(context, invalidPostData.title, invalidPostData.description)).rejects.toThrow();
	});

	it('should get posts', async () => {
		const posts = await getPosts.call(context);
		expect(posts).toBeInstanceOf(Array);
	});

	it('should edit a post', async () => {
		const postId = 1;
		const updatedData = { title: 'Updated Title' };
		const response = await editPost.call(context, postId, updatedData);
		expect(response).toHaveProperty('id');
	});

	it('should throw an error for invalid edit data', async () => {
		const postId = 1;
		const updatedData = { title: '' };
		await expect(editPost.call(context, postId, updatedData)).rejects.toThrow();
	});

	it('should vote on a post', async () => {
		const postId = 1;
		await expect(votePost.call(context, postId)).resolves.toBeUndefined();
	});

	it('should delete a post', async () => {
		const postId = 1;
		await expect(deletePost.call(context, postId)).resolves.toBeUndefined();
	});

	it('should throw an error when trying to delete a non-existent post', async () => {
		const postId = -1;
		await expect(deletePost.call(context, postId)).rejects.toThrow();
	});
});
