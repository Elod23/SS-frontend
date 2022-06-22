import { Router } from "express";
import request from "request";

const routes = Router();

routes.post("/shipengine/:uri", (req, res) => {
  const { uri } = req.params;
  const { headers } = req;
  const { body } = req;

  return request.post(
    {
      url: decodeURI(uri),
      json: body,
      headers,
    },
    (err, body) => {
      if (!err) {
        console.log(body);
        res.send(body);
      } else {
        res.sendStatus(500);
      }
    }
  );
});

console.log('Registered route /shipengine/:uri');

export default routes;
