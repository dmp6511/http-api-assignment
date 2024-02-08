// file system module
const fs = require('fs');

// load in the index (client file)
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// handling it
const getIndex = (request, response) => {

    // write the status code
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(index);
    response.end();
}

module.exports = {
    getIndex,
}