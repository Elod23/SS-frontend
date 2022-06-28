import { Router } from "express";
import request from "request";

const routes = Router();

routes.post("/shipengine/:uri", (req, res) => {
  const { uri } = req.params;
  const { headers } = req;
  const { body } = req;
  const decoded = decodeURIComponent(uri);
  console.log('decoded request', decoded);
  console.log(headers, uri, body);
  return request.post(
    {
      url: decoded,
      json: body,
      headers: {
        'API-Key': headers['api-key'],
        'Host': 'api.shipengine.com',
        'Content-Type': 'application/json'
      },
    },
    (err, resp) => {
      if (!err) {
        console.log(resp.body);
        res.send(resp.body);
      } else {
        res.sendStatus(500);
      }
    }
  );
});

console.log('Registered route /shipengine/:uri');

export default routes;
