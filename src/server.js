const http = require('http');
const url = require('url');
// const query = require('querystring');

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
  index: responseHandler.getIndex,
};

const onRequest = (request, response) => {
  console.log(request);
  // parse the url
  const parsedUrl = url.parse(request.url);

  const acceptedTypes = request.headers.accept.split(',');

  // check if it matches any of the predetermined page names
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedTypes);
  } else {
    urlStruct.index(request, response, acceptedTypes);
  }
};

// create the server
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.01:${port}`);
});
