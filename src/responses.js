// file system module
const fs = require('fs');

// load in the index (client file)
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// response function
const respond = (request, response, content, type) => {
  // write a 200 status code
  response.writeHead(200, { 'Content-Type': type });
  response.write(content);
  response.end();
};

// JSON object sending function
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });

  // stringify it
  response.write(JSON.stringify(object));
  response.end();
};

// getting the index
const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

// getting the css page
const getCSS = (request, response) => {
  response.writeHead(200, {'Content-Type': 'text/css'});
  response.write(css);
  response.end();
}

// status messages

// success
const success = (request, response) => {
  const responseJSON = {
    message: 'this is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

// // bad request, 400 if missing 'valid' query and 200 if it has it
const badRequest = (request, response) => {
  const respondJSON = {
    message: 'this was a bad request',
  };

  respondJSON(request, response, 400, responseJSON);
};

// unauthorized (401 status code if missing 'loggedIn' query, and 200 if it has it)

// forbidden (403 status code)

// internal (500 status code)

// notImplemented (501 status code)

module.exports = {
  getIndex,
  success,
  getCSS,
  badRequest,
};
