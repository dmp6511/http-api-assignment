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
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// status messages
// success
const success = (request, response) => {
  const responseJSON = {
    message: 'this is a successful response',
  };

  respondJSON(request, response, 200, responseJSON);
};

// // bad request, 400 if missing 'valid' query and 200 if it has it
const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'this was a bad request',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'missing valid query';

    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};

// unauthorized (401 status code if missing 'loggedIn' query, and 200 if it has it)
const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'This request has required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'missing valid query';
    responseJSON.id = 'badRequest';

    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};
// forbidden (403 status code)
const forbidden = (request, response) => {
  const responseJSON = {
    message: 'this is a forbidden request',
  };

  return respondJSON(request, response, 403, responseJSON);
};

// internal (500 status code)
const internal = (request, response) => {
  const responseJSON = {
    message: 'this is a internal request',
  };

  return respondJSON(request, response, 500, responseJSON);
};

// notImplemented (501 status code)
const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'this request has not been implemented',
  };

  return respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'the page you are looking for could not be found',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getIndex,
  success,
  getCSS,
  badRequest,
  forbidden,
  internal,
  notImplemented,
  unauthorized,
  notFound,
};
