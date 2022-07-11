
import app from './index';
const portConfig = process.env.PORT;
console.log(`Https server running on port ${portConfig}`);
app.httpServer.listen(portConfig);

