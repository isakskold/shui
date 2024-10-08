# shui

## User authentication flow

### User Submission:

The user fills out a form and clicks the "Submit" button to post a message.

### Frontend Action:

The frontend captures the user's message and retrieves the access token from local storage.

### API Request:

The frontend sends a POST request to the API endpoint (/message) including:
The message content.
The access token in the Authorization header.
The API key in the x-api-key header.

### JWT Authorizer Triggered:

The API Gateway invokes the JWT authorizer for the incoming request.

### Token Validation:

The authorizer extracts the token from the Authorization header.
It verifies the token using a secret key stored in AWS Secrets Manager.

### If the token is valid:

It retrieves the user's information from the token (e.g., username).
Generates a policy allowing access to the resource.

### If the token is invalid:

The request is denied, and an error response is returned.

### Message Processing:

If authorized, the API Gateway forwards the request to the Lambda function responsible for posting messages.

### The Lambda function processes the message:

Validates the message content.
Stores the message in the database (e.g., DynamoDB).

### Response:

Upon successful storage, the Lambda function returns a success response to the API Gateway.
The API Gateway forwards this response back to the frontend.

### Frontend Update:

The frontend receives the success response and updates the UI to reflect the newly posted message.
