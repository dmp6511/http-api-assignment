const http = require('http');
const url = require('url');

// access handlers
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const { parse } = require('path');

// access port
const port = proces.env.PORT || process.env.NODE_PORT || 3000;


// create url struct
const urlStruct = {
    '/': htmlHandler.getIndex,
};


const onRequest = (request, response) => {
    console.log(request);

    // parse the url
    const parsedUrl = url.parse(request.url);


    // check if it matches any of the predetermined page names
    if (urlStruct[parsedUrl.pathname]) {
        urlStruct[parsedUrl.pathname](request, response)
    } else {

    };

};



// create the server
http.createServer(onRequest).listen(port, () => {
    console.log(`Server Started on 127.0.01:${port}`);
})