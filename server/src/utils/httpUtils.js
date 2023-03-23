const creds = require('../services/spotify/credentials')
const base64 = require('base-64');

module.exports.setHeader = (key, value) => {
    return (req) => {
        req.set(key,value)
        return req
    }
}

module.exports.encode_cred = base64.encode(`${creds.CLIENT_ID}:${creds.CLIENT_SECRET}`);
module.exports.setBasicAuthorizationHeader = this.setHeader('Authorization', 'Basic ' +  this.encode_cred)
module.exports.setBearerAuthorizationHeader = (access_token) => this.setHeader('Authorization', 'Bearer ' +  access_token)
module.exports.setJsonContentType = 'application/json'
module.exports.setFormContentType = 'application/x-www-form-urlencoded'


