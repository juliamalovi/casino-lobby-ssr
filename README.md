## Casino Lobby with NodeJs, React, Server Side Rendering and DynamoDB

### Instructions:
1. Clone the repository
2. Install dependencies yarn install
3. Add AWS key, secret and region to the .env file from your AWS account
4. Create Games, Category, Themes, Features and Providers tables in DynamoDB
5. If needed add initial data to the database: node server/dynamo-api/dbSeeder.js
6. Run the server yarn dev:build-server, wait for server-build folder to be generated and then run yarn dev:start in separate terminal
7. Or run yarn dev as an alternative, but the first time you might need to re-run it starts the server before it is compiled