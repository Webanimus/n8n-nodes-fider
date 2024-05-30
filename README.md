# n8n-nodes-fider

![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)


This is an n8n custom node for interacting with the Fider API. It allows you to create, read, update, delete posts and comments, as well as manage users on a Fider instance.

## Prerequisites

You need the following installed on your development machine:

1. Navigate to your n8n installation directory.
2. Install the node module:
```bash
npm install @webanimus/n8n-nodes-fider
```
3. Restart n8n:
```bash
n8n start
```


## Configuration
1. In n8n, go to **Settings** -> **API Credentials**.
2. Add new credentials and select Fider API.
3. Enter your Fider API token and base URL.


## Node Operations



### Post Operations



#### Create Post
-	**Title**: Title of the post.
- **Description**: Description of the post.



#### Get Posts
- No additional parameters.



#### Edit Post
- **Post ID**: ID of the post.
-	**Update Fields**:
	- Title: New title of the post.
	- Description: New description of the post.



#### Delete Post
-	**Post ID**: ID of the post.



#### Vote Post
-	**Post ID**: ID of the post.
-	**Vote Type**: Upvote or downvote.


### Comment Operations



#### Create Comment
-	**Post ID**: ID of the post to comment on.
-	**Text**: Text of the comment.

#### Get comments
- **Post ID**: ID of the post to retrieve comments from.



#### Edit Post
- **Comment ID**: ID of the comment.
-	**Text**: New text of the comment.

#### Delete Post
-	**Post ID**: ID of the post.
-	**Comment ID**: ID of the comment.




### User Operations



#### Create User
-	**Name**: Name of the user.
-	**Email**: Email address of the user.

#### Get Users
-	No additional parameters.




### Sample Operation



#### Send a sample
-	**Subject**: The subject of the email to be sent.
-	**Message**: The content of the email to be sent.



## Ressources

-	[Fider Credentials docs](https://fider.io/docs/api#authentication)

## License

[MIT](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
