## SERVER SIDE

### SPOTIFY CREDENTIALS
If you want to run the server, it's necesary to create a /credentials.js/ file in src/services/spotify folder, that contains an object with "CLIENT_ID", "CLIENT_SECRET", "REDIRECT_URI" and "SCOPES", this is the information that spotify provided to developers

https://developer.spotify.com/dashboard/

### SERVER CREDENTIALS

its necesary to create a enviroment file that contains "HOST" and "PORT" fields, 

.env.development looks like: 
PORT:4000
HOST:'localhost'

DEPENDENCIES: dotenv
ENVIROMENT_VARIABLES_PATH contains the path of the files and initial name of the files of environment:
    .env.producction
    .env.development
    .env.VARIABLES-NAME
package.json runs script indicating the name of the actual enviroment like:
    SET NODE_ENV=development& nodemon src/app
    SET NODE_ENV=production& node src/app
