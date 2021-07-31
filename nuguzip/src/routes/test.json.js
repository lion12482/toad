
import { v4 as uuidv4 } from 'uuid';

const fetch = require('node-fetch');


export function get(req, res, next) {
  var url = 'http://lion124.iptime.org:8000/' + req.query['date'];
  fetch(url).then(response=>(
    response.json()
  )).then(ret=>{
    res.end(JSON.stringify(ret));
  });

}

