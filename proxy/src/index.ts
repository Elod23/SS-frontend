import express, { Express } from 'express';
import routes from './routes';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import http, { Server } from 'http';

var key = fs.readFileSync(__dirname + '/../../cert.key', 'utf-8');
var cert = fs.readFileSync(__dirname + '/../../cert.crt', 'utf-8');
var options = {
  key: key,
  cert: cert
};

class App {
  public app: Express;
  public httpServer: Server;
  public httpsServer: Server;

  constructor() {
    this.app = express();
    

    this.middlewares();
    this.routes();
    this.httpServer = http.createServer(this.app);
    this.httpsServer = https.createServer(options, this.app);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}


export default new App();