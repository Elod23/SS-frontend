
import app from './index';
const portConfig = process.env.PORT;
console.log(`Https server running on port ${portConfig}`);
app.httpsServer.listen(portConfig);
console.log(`Http server running on port 8080`);
app.httpServer.listen('8080');

