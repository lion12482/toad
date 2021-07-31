import { reviews } from '../_data';
import { v4 as uuidv4 } from 'uuid';


const fs = require('fs');

export function get(req, res, next) {
  if(req.query.ix){
    var qr = req.query;
    var rtv = [];
    reviews.forEach(rv => {
      if(rv.lat >= qr.iy & rv.lat <= qr.fy & rv.lng >= qr.ix & rv.lng <= qr.fx){
        rtv.push(rv);
      }
    });
    res.end(JSON.stringify(rtv));
  }else {
    res.end(JSON.stringify(reviews));
  }

}

export function post(req, res, next) {
  var data = req.body;
  const id = uuidv4();
  data['id'] = id;
  reviews.push(data);
  console.log(reviews.length, req.body);
  fs.writeFile('./store/_data.json', JSON.stringify(reviews), 'utf8', (err)=>{ console.log(err); });
  res.end('');
} 


