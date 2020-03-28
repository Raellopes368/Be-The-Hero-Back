require('dotenv').config();
const server = require('./server');
const { port } = require('./config/server');

server.listen(port, () => console.log(`run http://localhost:${port}`));
