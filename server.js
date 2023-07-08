const express = require('express');
const morgan = require('morgan');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.all('/campsites', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next(); // Pass control of the application routing to the next relevant routing method after this one
});

app.get('/campsites', (req, res) => {
    res.end('Will send all the campsites to you');
});

app.post('/campsites', (req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`); // req.body contains the parsed data from the client
});

app.put('/campsites', (req, res) => {
    res.statusCode = 403; // Operation not supported
    res.end('PUT operation not supported on /campsites');
});

app.delete('/campsites', (req, res) => {
    res.end('Deleting all campsites');
});

app.get('/campsites/:camsiteId', (req, res) => {
    res.end(`Will send details of the campsite: ${req.params.camsiteId} to you`);
});

app.post('/campsites/:camsiteId', (req, res) => {
    res.statusCode = 403; // Operation not supported
    res.end(`POST operation not supported on /campsites/${req.params.camsiteId}`);
});

app.put('/campsites/:campsiteId', (req, res) => {
    res.write(`Updating the campsite: ${req.params.campsiteId}\n`); // \n is a new line character
    res.end(`Will update the campsite: ${req.body.name} with description: ${req.body.description}`);
});

app.delete('/campsites/:campsiteId', (req, res) => {
    res.end(`Deleting campsite: ${req.params.campsiteId}`);
});

app.use(express.static(__dirname + '/public'));

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

app.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}/`));