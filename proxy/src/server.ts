
import app from './index';
const portConfig = process.env.PORT;
console.log(`App running on port ${portConfig}`);
app.listen(portConfig);

