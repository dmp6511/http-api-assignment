const http = require('http');
const url = require('url');
const query = require('querystring');

// access handlers
const responseHandler = require('./responses.js');

// access port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// create url struct
const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCSS,
  '/success': responseHandler.success,
  '/badrequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  index: responseHandler.getIndex,
  notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
  console.log(request);
  // parse the url
  const parsedUrl = url.parse(request.url);

  // grabbing the queries
  const params = query.parse(parsedUrl.query);

  // check if it matches any of the predetermined page names
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// create the server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.01:${port}`);
});
